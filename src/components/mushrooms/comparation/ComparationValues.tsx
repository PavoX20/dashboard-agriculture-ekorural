import React, { useEffect, useState } from "react";
import { Checkbox, Divider, DatePicker, message } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import MultiDayCO2Chart from "./plots/MultiDayCO2Chart";
import type { DailyData } from "./fetchData/data.mjs";
import { data } from "./fetchData/data.mjs";
import MultiDayHumidityChart from "./plots/MultiDayHumedityChart";
import MultiDayTemperatureChart from "./plots/MultiDayTemperatureChart";
import DataTableTemperature from "./tables/DataTableTemperature";
import DataTableHumidity from "./tables/DataTableHumidity";
import DataTableCO2 from "./tables/DataTableCO2";
import { CheckboxValueType } from "../../types/sharedTypes";
import "./ComparationValues.css";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Temperatura", "Humedad", "CO2"];

const disabledDate = (current: Dayjs): boolean => {
  // Disable today and all days after today
  return !current.isBefore(dayjs().startOf("day"));
};

const ComparationValues: React.FC<{ theme: boolean }> = ({ theme }) => {
  const [dataValues, setData] = useState<DailyData[]>(data);
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);

  const onChange = (list: CheckboxValueType[]) => {
    if (list.length > 1) {
      const latestSelection = list.find((item) => !checkedList.includes(item));
      if (latestSelection != null) setCheckedList([latestSelection]);
    } else {
      setCheckedList(list);
    }
  };

  const onChangeDate: DatePickerProps<Dayjs[]>["onChange"] = (dates) => {
    const newDates = Array.isArray(dates) ? dates : [dates];
    if (newDates.length > 2) {
      message.error(<h3>Solo se puede seleccionar hasta 2 fechas.</h3>, 5);
      setSelectedDates(newDates.slice(0, 2));
    } else {
      setSelectedDates(newDates);
    }
  };

  useEffect(() => {
    if (selectedDates.length > 2) {
      setData(data);
    } else if (selectedDates.length > 0) {
      const filteredData = data.filter((item) => {
        const itemDate = dayjs(item.date);
        return selectedDates.some((date) => date.isSame(itemDate, "day"));
      });
      setData(filteredData);
    } else {
      setData(data);
    }
  }, [selectedDates]);

  const flattenedData = dataValues.flatMap((dailyData) =>
    dailyData.data.map((dataPoint) => ({
      timestamp: new Date(dataPoint.timestamp).toISOString(), // Convertir a string en formato ISO
      date: new Date(dataPoint.timestamp).toLocaleDateString(),
      time: new Date(dataPoint.timestamp).toLocaleTimeString(),
      humidity: dataPoint.humidity,
      temperature: dataPoint.temperature,
      co2: dataPoint.co2,
    }))
  );

  return (
    <>
      <div className={`container-fluid container-body ${theme ? "dark-theme" : "light-theme"}`}>
        <div className="row row-body">
          <div className="col-12">
            <h3 style={{ color: theme ? "white" : "inherit" }}>Comparación de datos</h3>
          </div>
          <div className="col-12">
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
              className="checkbox-group"
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
                className={theme ? "ant-picker-dark" : "ant-picker-light"}
              />
            )}
          </div>

          <div className="col-12" style={{ height: "500px" }}>
            {selectedDates.length > 0 && checkedList.includes("CO2") && (
              <MultiDayCO2Chart data={dataValues} title="CO2" theme={theme ? "dark" : "light"} />
            )}
            {selectedDates.length > 0 && checkedList.includes("Humedad") && (
              <MultiDayHumidityChart
                data={dataValues}
                title="Humedad"
                theme={theme ? "dark" : "light"}
              />
            )}
            {selectedDates.length > 0 &&
              checkedList.includes("Temperatura") && (
                <MultiDayTemperatureChart
                  data={dataValues}
                  title="Temperatura"
                  theme={theme ? "dark" : "light"}
                />
              )}
          </div>

          <div className="col-12">
            <Divider />
            {selectedDates.length > 0 && checkedList.includes("Temperatura") && (
              <DataTableTemperature data={flattenedData} theme={theme} />
            )}
            {selectedDates.length > 0 && checkedList.includes("Humedad") && (
              <DataTableHumidity data={flattenedData} theme={theme} />
            )}
            {selectedDates.length > 0 && checkedList.includes("CO2") && (
              <DataTableCO2 data={flattenedData} theme={theme} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ComparationValues;
