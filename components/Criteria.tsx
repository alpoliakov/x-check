import * as React from 'react';
import { Form, } from 'antd';
import MyCriteriaItem from './CriteriaItem';

 const MyCriteria: React.FC = ({evaluationCriteria}: any) => {
   const onFinish = (values: any) => {
     console.log('Received values of form:', values);
   };

   const handleChange = () => {
     form.setFieldsValue({ requirements: [] });
   };

   const [form] = Form.useForm();

   return (
     <React.Fragment>
       <MyCriteriaItem evaluationCriteria={evaluationCriteria} />
     </React.Fragment>
   );
 };

export default MyCriteria;