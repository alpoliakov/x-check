import React from 'react';
import { Input, Collapse, Form, Button, Comment, Avatar } from 'antd';
import { IComment } from '../../../../../../../interfaces/IWorkDone';
import styles from './info-item.module.css';

type PropsInfoItem = {
  descriptionItem: string;
  commentsItem: IComment[];
  onChangeComment: (cheсkingPointID: string, score: number) => void;
};

type PropsEditor = {
  onChangeScore: (cheсkingPointID: string, score: number) => void;
};

export default function InfoItem({
  descriptionItem,
  commentsItem,
  onChangeComment,
}: PropsInfoItem): JSX.Element {
  const { TextArea } = Input;
  const { Panel } = Collapse;

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

  const Editor = (/*{ value }: PropsEditor*/) => (
    <>
      <Form.Item>
        <TextArea placeholder="Input comment" autoSize />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
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
          // onChange={this.handleChange}
          // onSubmit={this.handleSubmit}
          // submitting={submitting}
          // value={value}
          />
        </Panel>
      </Collapse>
    </>
  );
}
