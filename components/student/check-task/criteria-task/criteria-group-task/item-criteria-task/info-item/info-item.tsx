import React, { useState } from 'react';
import { Input, Collapse, Form, Button, Comment, Avatar } from 'antd';
import { IComment } from '../../../../../../../interfaces/IWorkDone';
import styles from './info-item.module.css';

type PropsInfoItem = {
  descriptionItem: string;
  commentsItem: IComment[];
  onChangeComment: (comment: IComment) => void;
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
    const newComment: IComment = {
      id: `${commentsItem[commentsItem.length - 1].id}`,
      text: stateComment,
      date: new Date(),
      whoSaidThat: '',
      isAnonimSay: true,
    };
    onChangeComment(newComment);
    setComment('');
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
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
        datetime={item.date.toLocaleString()}
        key={index}
      />
    );
  });

  return (
    <>
      <span> {descriptionItem}</span>
      <Collapse ghost>
        <Panel header={<span>Comments</span>} key={0}>
          {itemsComment}
          <Form.Item>
            <TextArea
              placeholder="Input comment"
              onChange={onChangeInput}
              value={stateComment}
              autoSize
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" onClick={handleSubmit} type="primary">
              Add Comment
            </Button>
          </Form.Item>
        </Panel>
      </Collapse>
    </>
  );
}
