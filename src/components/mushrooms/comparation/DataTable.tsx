import React from 'react';
import { Table } from 'antd';
import type { GeneralData } from './types/types';
import './TableMushrooms.css';

type DataTableProps = {
  data: GeneralData[];
  theme: boolean;
};

const DataTable: React.FC<DataTableProps> = ({ data, theme }) => {
  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <span style={{ color: theme ? 'white' : 'black' }}>{text}</span>,
    },
    {
      title: 'Hora',
      dataIndex: 'time',
      key: 'time',
      render: (text: string) => <span style={{ color: theme ? 'white' : 'black' }}>{text}</span>,
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => <span style={{ color: theme ? 'white' : 'black' }}>{text}</span>,
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
      render: (text: string) => <span style={{ color: theme ? 'white' : 'black' }}>{text}</span>,
    },
  ];

  const formattedData = data.flatMap((item) => {
    const date = new Date(item.timestamp);
    return [
      {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        type: 'Humedad',
        value: item.humidity,
        timestamp: item.timestamp,
      },
      {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        type: 'Temperatura',
        value: item.temperature,
        timestamp: item.timestamp,
      },
      {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        type: 'CO2',
        value: item.co2,
        timestamp: item.timestamp,
      },
    ];
  }).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <Table
      columns={columns}
      dataSource={formattedData}
      rowKey="timestamp"
      pagination={{ pageSize: 20 }}
      style={{
        background: theme ? 'rgb(2, 21, 39)' : '#fff',
        color: theme ? 'white' : 'black',
        border: '2px solid white',
        borderRadius: '8px'
      }}
      className={theme ? 'dark-theme' : 'light-theme'}
    />
  );
};

export default DataTable;
