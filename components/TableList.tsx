import React from 'react';
import { Table } from 'antd';

interface IPropsTable {
  data: Array<Record<string, unknown>>;
  column: Array<Record<string, unknown>>;
}

const TableList: React.FC<IPropsTable> = ({ data, column }) => {
  return <Table dataSource={data} columns={column} />;
};

export default TableList;
