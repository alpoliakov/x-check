import React, { useState } from 'react';
import { Input, Collapse, Form, Button, Comment, Avatar } from 'antd';
import { IComment } from '../../../../../../../interfaces/IWorkDone';
import styles from './info-item.module.css';

type PropsInfoItem = {
  descriptionItem: string;
  commentsItem: IComment[];
  onChangeComment: (cheсkingPointID: string, comment: IComment) => void;
};

type PropsEditor = {
  value: string;
  onChange: any;
  onSubmit: any;
};

export default function InfoItem({
  descriptionItem,
  commentsItem,
  onChangeComment,
}: PropsInfoItem): JSX.Element {
  const { TextArea } = Input;
  const { Panel } = Collapse;
  const [stateComment, setComment] = useState<string>('');
  const handleSubmit = () => {
    if (!stateComment) {
      return;
    }
    onChangeComment('onChangeComment', commentsItem[0]);
  };

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    // setComment(e.currentTarget.value);
  };

  const itemsComment = commentsItem.map((item, index) => {
    return (
      <Comment
        author={item.whoSaidThat}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt={item.whoSaidThat}
          />
        }
        content={<p>{item.text}</p>}
        key={index}
      />
    );
  });

  const Editor = ({ value, onChange, onSubmit }: PropsEditor) => (
    <>
      <Form.Item>
        <TextArea placeholder="Input comment" autoSize onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );

  return (
    <>
      <span> {descriptionItem}</span>
      <Collapse ghost>
        <Panel header={<span>Comments</span>} key={0}>
          {itemsComment}
          <Editor
            onChange={onChangeInput}
            onSubmit={handleSubmit}
            // submitting={submitting}
            value={stateComment}
          />
        </Panel>
      </Collapse>
    </>
  );
}
