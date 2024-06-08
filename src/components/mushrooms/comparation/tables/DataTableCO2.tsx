import React from 'react';
import { Table, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import type { GeneralData } from '../types/types';
import { utils, writeFile } from 'xlsx';
import './TableMushrooms.css';

type DataTableCO2Props = {
  data: GeneralData[];
  theme: boolean;
};

const DataTableCO2: React.FC<DataTableCO2Props> = ({ data, theme }) => {
  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      align: 'center' as const,
      render: (text: string) => <span style={{ color: theme ? 'white' : 'black' }}>{text}</span>,
    },
    {
      title: 'Hora',
      dataIndex: 'time',
      key: 'time',
      align: 'center' as const,
      render: (text: string) => <span style={{ color: theme ? 'white' : 'black' }}>{text}</span>,
    },
    {
      title: 'CO2',
      dataIndex: 'co2',
      key: 'co2',
      align: 'center' as const,
      render: (text: string) => <span style={{ color: theme ? 'white' : 'black' }}>{text}</span>,
    },
  ];

  const formattedData = data.map((item) => {
    const date = new Date(item.timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      co2: item.co2,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleDownload = () => {
    const ws = utils.json_to_sheet(formattedData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'CO2 Data');
    writeFile(wb, 'CO2_Data.xlsx');
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={formattedData}
        rowKey={(record) => `${record.date}-${record.time}`}
        pagination={{ pageSize: 20 }}
        style={{
          background: theme ? 'rgb(2, 21, 39)' : '#fff',
          color: theme ? 'white' : 'black',
          border: '2px solid white',
          borderRadius: '8px'
        }}
        className={theme ? 'dark-theme' : 'light-theme'}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
        >
          Descargar Datos
        </Button>
      </div>
    </div>
  );
};

export default DataTableCO2;
