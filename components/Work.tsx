import React, { useState, Key, useEffect } from 'react';
import { Select, Avatar, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';

interface PropsWork {
  task: any;
}

const Work: React.FC<PropsWork> = ({ task }) => {
  return <h2>{task}</h2>;
};

export default Work;
