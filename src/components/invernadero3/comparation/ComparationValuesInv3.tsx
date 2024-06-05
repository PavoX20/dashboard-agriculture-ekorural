import React, { useEffect, useState } from "react";
import { Checkbox, Divider } from "antd";
import type { GetProp } from "antd";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { message } from "antd";
import MultiDayCO2Chart from "./plots/MultiDayCO2Chart";
import type { DailyData } from "./fetchData/data.mjs";
import { data } from "./fetchData/data.mjs";
import MultiDayHumidityChart from "./plots/MultiDayHumedityChart";
import MultiDayTemperatureChart from "./plots/MultiDayTemperatureChart";

type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Temperatura", "Humedad", "CO2"];

const disabledDate = (current: Dayjs): boolean => {
  // Disable today and all days after today
  return !current.isBefore(dayjs().startOf("day"));
};

const ComparationValuesInv3: React.FC = () => {
  const [dataValues, setData] = useState<DailyData[]>(data);
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);

  const onChange = (list: CheckboxValueType[]) => {
    console.log("Newly received list:", list); // Debug: See incoming list
    if (list.length > 1) {
      // Find the newly added item that wasn't already in the checkedList
      const latestSelection = list.find((item) => !checkedList.includes(item));
      if (latestSelection != null) setCheckedList([latestSelection]);
    } else {
      setCheckedList(list);
    }
    console.log("Updated List (only one selected):", list);
  };

  const onChangeDate: DatePickerProps<Dayjs[]>["onChange"] = (dates) => {
    const newDates = Array.isArray(dates) ? dates : [dates];
    if (newDates.length > 2) {
      // If more than two dates are attempted to be selected
      message.error(<h3>Solo se puede seleccionar hasta 2 fechas.</h3>, 5);
      setSelectedDates(newDates.slice(0, 2)); // Optional: Limiting to the first two selected
    } else {
      setSelectedDates(newDates);
    }
  };

  useEffect(() => {
    if (selectedDates.length > 2) {
      console.error("More than two dates detected in state:", selectedDates);

      setData(data);
    }
  }, [selectedDates]);

  return (
    <>
      <div className="container-fluid container-body">
        <div className="row row-body">
          <div className="col-12">
            <h3>Comparación de datos</h3>
          </div>
          <div className="col-12">
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            />
          </div>

          <div className="col-12">
            <Divider />
            {checkedList.length > 0 && (
              <DatePicker
                multiple
                onChange={onChangeDate}
                maxTagCount="responsive"
                disabledDate={disabledDate}
                picker="date"
                value={selectedDates}
              />
            )}
          </div>

          <div className="col-12" style={{ height: "500px" }}>
            {selectedDates.length > 0 && checkedList.includes("CO2") && (
              <MultiDayCO2Chart data={dataValues} title="CO2" theme="light" />
            )}
            {selectedDates.length > 0 && checkedList.includes("Humedad") && (
              <MultiDayHumidityChart
                data={dataValues}
                title="Humedad"
                theme="light"
              />
            )}
            {selectedDates.length > 0 &&
              checkedList.includes("Temperatura") && (
                <MultiDayTemperatureChart
                  data={dataValues}
                  title="Temperatura"
                  theme="light"
                />
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ComparationValuesInv3;
