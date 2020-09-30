import * as React from 'react';
import { Form } from 'antd';
import MyCriteriaItem from './CriteriaItem';
import MyCriteriaItemDraft from './CriteriaItemDraft';

const MyCriteria: React.FC<{ evaluationCriteria: any }> = ({ evaluationCriteria }: any) => {
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const handleChange = () => {
    form.setFieldsValue({ requirements: [] });
  };

  const [form] = Form.useForm();
  const MyCriteriaItemPainter = () => {
        if (evaluationCriteria) {
          return <MyCriteriaItemDraft evaluationCriteria={evaluationCriteria} />;
        } else {
          return <MyCriteriaItem />;
         }
        }
        let x = MyCriteriaItemPainter();
  return (
    <React.Fragment>
      {x}

    </React.Fragment>
  );
};

export default MyCriteria;