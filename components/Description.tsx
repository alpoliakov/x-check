import React from 'react';
import { Descriptions, Input, Button, Space } from 'antd';


interface DescriptionProps {
  data: [];
  taskReview: boolean;
}

class Description extends React.Component {
  constructor(props: DescriptionProps) {
    super(props);
  }

  state = {
    searchText: '',
    searchedColumn: '',
  };

  
  render() {
      

    return (
        <Descriptions title="Task review Info" column={{xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1}}> 
        <Descriptions.Item label="Reviewer">III</Descriptions.Item>
        <Descriptions.Item label="Task">SB</Descriptions.Item>
        <Descriptions.Item label="Score">320</Descriptions.Item>
        <Descriptions.Item label="Requirements">view details</Descriptions.Item>
        <Descriptions.Item label="GroupName">x1</Descriptions.Item>
        <Descriptions.Item label="ItemName">11</Descriptions.Item>
        
      </Descriptions>


    )
}
}

export default Description;
