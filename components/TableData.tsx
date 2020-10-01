import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface TableDataProps {
  dataRow: [];
  taskReview: boolean;
}

class TableData extends React.Component {
  constructor(props: TableDataProps) {
    super(props);
  }

  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: string, record: any) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    sorter: (a, b) => {
      switch (dataIndex) {
        case 'score':
          return a[dataIndex] - b[dataIndex];
        default:
          if (a[dataIndex] < b[dataIndex]) {
            return -1;
          }
          if (a[dataIndex] > b[dataIndex]) {
            return 1;
          }
          return 0;
      }
    },
    render: (text: string) => text,
  });

  handleSearch = (selectedKeys: Array<[]>, confirm: any, dataIndex: string): void => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters: any): void => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    let columns: any = [];

    if (this.props.taskReview) {
      columns = [
        {
          title: 'User',
          dataIndex: 'user',
          key: 'user',
          width: '30%',
          ...this.getColumnSearchProps('user'),
        },
        {
          title: 'Task',
          dataIndex: 'task',
          key: 'task',
          ...this.getColumnSearchProps('task'),
        },
        {
          title: 'Reviewer',
          dataIndex: 'reviewer',
          key: 'reviewer',
          ...this.getColumnSearchProps('reviewer'),
        },
        {
          title: 'Score',
          dataIndex: 'score',
          key: 'score',
          ...this.getColumnSearchProps('score'),
        },
      ];
    } else {
      columns = [
        {
          title: 'User',
          dataIndex: 'user',
          key: 'user',
          width: '30%',
          ...this.getColumnSearchProps('user'),
        },
        {
          title: 'Task',
          dataIndex: 'task',
          key: 'task',
          ...this.getColumnSearchProps('task'),
        },
      ];
    }

    return <Table columns={columns} dataSource={this.props.dataRow} />;
  }
}

export default TableData;
