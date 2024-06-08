import React from "react";
import { Table } from "antd";
import { GeneralData } from "../../types/SharedTypes";
import "./TableMushrooms.css";

type DataTableProps = {
  data: GeneralData[];
  theme: boolean;
};

const DataTable: React.FC<DataTableProps> = ({ data, theme }) => {
  const columns = [
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: (text: string) => (
        <span style={{ color: theme ? "white" : "black" }}>{text}</span>
      ),
    },
    {
      title: "Hora",
      dataIndex: "time",
      key: "time",
      render: (text: string) => (
        <span style={{ color: theme ? "white" : "black" }}>{text}</span>
      ),
    },
    {
      title: "Humedad",
      dataIndex: "humidity",
      key: "humidity",
      render: (text: string) => (
        <span style={{ color: theme ? "white" : "black" }}>{text}</span>
      ),
    },
    {
      title: "Temperatura",
      dataIndex: "temperature",
      key: "temperature",
      render: (text: string) => (
        <span style={{ color: theme ? "white" : "black" }}>{text}</span>
      ),
    },
    {
      title: "CO2",
      dataIndex: "co2",
      key: "co2",
      render: (text: string) => (
        <span style={{ color: theme ? "white" : "black" }}>{text}</span>
      ),
    },
  ];

  const formattedData = data
    .map((item) => {
      const date = new Date(item.timestamp);
      return {
        ...item,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

  return (
    <Table
      columns={columns}
      dataSource={formattedData}
      rowKey="timestamp"
      pagination={{ pageSize: 20 }}
      style={{
        background: theme ? "rgb(2, 21, 39)" : "#fff",
        color: theme ? "white" : "black",
        border: "2px solid white",
        borderRadius: "8px",
      }}
      className={theme ? "dark-theme" : "light-theme"}
    />
  );
};

export default DataTable;
