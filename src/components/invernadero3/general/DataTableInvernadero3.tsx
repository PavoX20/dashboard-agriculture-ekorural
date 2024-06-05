import React from 'react';
import { Table } from 'antd';
import { GeneralData } from './types/types';

type DataTableProps = {
  data: GeneralData[];
};

const DataTableInvernadero3: React.FC<DataTableProps> = ({ data }) => {
  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Hora',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Humedad',
      dataIndex: 'humidity',
      key: 'humidity',
    },
    {
      title: 'Temperatura',
      dataIndex: 'temperature',
      key: 'temperature',
    },
    {
      title: 'CO2',
      dataIndex: 'co2',
      key: 'co2',
    },
  ];

  // Convertir y ordenar los datos
  const formattedData = data
    .map((item) => {
      const date = new Date(item.timestamp);
      return {
        ...item,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      };
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return <Table columns={columns} dataSource={formattedData} rowKey="timestamp" pagination={{ pageSize: 20 }} />;
};

export default DataTableInvernadero3;
