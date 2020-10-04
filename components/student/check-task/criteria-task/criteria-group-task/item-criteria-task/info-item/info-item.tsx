import React, { useState } from 'react';
import { Input, Typography, Collapse, Form, Button, Comment, Avatar } from 'antd';
import { CheckState, IComment } from '../../../../../../../interfaces/IWorkDone';
import styles from './info-item.module.css';

type PropsInfoItem = {
  descriptionItem: string;
  stateCheck: CheckState;
  commentsItem: IComment[];
  onChangeComment: (comment: IComment) => void;
};

export default function InfoItem({
  descriptionItem,
  commentsItem,
  stateCheck,
  onChangeComment,
}: PropsInfoItem): JSX.Element {
  const { TextArea } = Input;
  const { Panel } = Collapse;
  const [stateComment, setComment] = useState<string>('');
  const { Text } = Typography;

  const handleSubmit = () => {
    if (!stateComment) {
      return;
    }
    const idComment =
      commentsItem.length !== 0 ? `${commentsItem[commentsItem.length - 1].id}` : '0';

    const newComment: IComment = {
      id: idComment,
      text: stateComment,
      date: new Date().getTime(),
      whoSaidThat: '',
      isAnonimSay: true,
    };
    onChangeComment(newComment);
    setComment('');
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  let disabled: boolean;
  if (
    stateCheck === CheckState.Verified ||
    stateCheck === CheckState.DisputeClosed ||
    stateCheck === CheckState.Dispute
  ) {
    disabled = true;
  } else {
    disabled = false;
  }
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
        datetime={new Date(item.date).toLocaleString()}
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
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" onClick={handleSubmit} type="primary" disabled={disabled}>
              Add Comment
            </Button>
          </Form.Item>
        </Panel>
      </Collapse>
    </div>
  );
}
