import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// import Highlighter from 'react-highlight-words';

// interface IPropsTable {
//   dataRow: [] | undefined;
// }

// const TableData: React.FC<IPropsTable> = ({ dataRow }) => {
//   const [searchText, setSearchText] = React.useState('');
//   const [searchedColumn, setSearchedColumn] = React.useState('');

//   // state = {
//   //   searchText: '',
//   //   searchedColumn: '',
//   // };

//   const getColumnSearchProps = (dataIndex) => {
//     let searchInput = null;
//     return {
//       filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
//         <div style={{ padding: 8 }}>
//           <Input
//             ref={(node) => {
//               searchInput = node;
//             }}
//             placeholder={`Search ${dataIndex}`}
//             value={selectedKeys[0]}
//             onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//             onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             style={{ width: 188, marginBottom: 8, display: 'block' }}
//           />
//           <Space>
//             <Button
//               type="primary"
//               onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//               icon={<SearchOutlined />}
//               size="small"
//               style={{ width: 90 }}
//             >
//               Search
//             </Button>
//             <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
//               Reset
//             </Button>
//           </Space>
//         </div>;
//       },
//       filterIcon: (filtered) => {
//         <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />;
//       },
//       onFilter: (value, record) =>
//         record[dataIndex]
//           ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
//           : '',
//       onFilterDropdownVisibleChange: (visible) => {
//         if (visible) {
//           setTimeout(() => searchInput.select(), 100);
//         }
//       },
//       render: (text) => {
//         searchedColumn === dataIndex ? (
//           <Highlighter
//             highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//             searchWords={searchText}
//             autoEscape
//             textToHighlight={text ? text.toString() : ''}
//           />
//         ) : (
//           text
//         );
//       },
//     };
//   };

//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//     // this.setState({
//     //   searchText: selectedKeys[0],
//     //   searchedColumn: dataIndex,
//     // });
//   };

//   const handleReset = (clearFilters) => {
//     clearFilters();
//     setSearchText('');
//     // this.setState({ searchText: '' });
//   };

//   const column = [
//     {
//       title: 'User',
//       dataIndex: 'user',
//       key: 'user',
//       sorter: (a, b) => a.user < b.user,
//       sortDirections: ['descend', 'ascend'],
//       ...getColumnSearchProps('name'),
//     },
//     {
//       title: 'Task',
//       dataIndex: 'task',
//       key: 'task',
//       sorter: (a, b) => a.task < b.task,
//       ...getColumnSearchProps('task'),
//     },
//     {
//       title: 'Reviewer',
//       dataIndex: 'reviewer',
//       key: 'reviewer',
//       ...getColumnSearchProps('reviewer'),
//     },
//     {
//       title: 'Score',
//       dataIndex: 'score',
//       key: 'score',
//       sorter: (a, b) => a.score < b.score,
//     },
//   ];

//   return <Table dataSource={dataRow} columns={column} />;
// };

class TableData extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = (dataIndex) => ({
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
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const column = [
      {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
        sorter: (a, b) => a.user < b.user,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Task',
        dataIndex: 'task',
        key: 'task',
        sorter: (a, b) => a.task < b.task,
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
        sorter: (a, b) => a.score < b.score,
      },
    ];

    return <Table columns={column} dataSource={this.props.dataRow} />;
  }
}

export default TableData;
