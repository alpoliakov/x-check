import React, { useState } from 'react';
import { Input, Typography, Collapse, Form, Button, Comment, Avatar } from 'antd';
import { CheckState, IComment } from '../../../../../../../interfaces/IWorkDone';
import { TypeTask } from '../../../../../../../interfaces/ITask';
import { Role } from '../../../../../../../interfaces/IUser';
import styles from './info-item.module.css';

type PropsInfoItem = {
  descriptionItem: string;
  commentsItem: IComment[];
  role: Role;
  typeTask: TypeTask;
  stateCheck: CheckState;
  onChangeComment: (comment: IComment) => void;
};

export default function InfoItem({
  descriptionItem,
  commentsItem,
  role,
  typeTask,
  stateCheck,
  onChangeComment,
}: PropsInfoItem): JSX.Element {
  const { TextArea } = Input;
  const { Panel } = Collapse;
  const [stateComment, setComment] = useState<string>('');
  const { Text, Title } = Typography;

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
    <div className={styles.info}>
      <Text>{descriptionItem}</Text>
      <Collapse ghost>
        <Panel header={<Text type="secondary">Comment</Text>} key={0}>
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
    </div>
  );
}
