import React, { useState } from 'react';
import MainLayout from '../../../components/MainLayout';
import { Button, Typography } from 'antd';
import ReadmePage from './readme';
import { Converter } from 'showdown';

interface PropsManager {}

const ManagerPage = () => {
  const { Title, Link, Text } = Typography;
  const [viewReadme, setViewReadme] = useState(false);
  const [dataReadme, setDataReadme] = useState('');

  const requestReadme = async (e: any) => {
    e.preventDefault();
    const urlLoad =
      'https://raw.githubusercontent.com/rolling-scopes-school/checklist/master/README.md';
    const url =
      'https://api.github.com/repos/rolling-scopes-school/songbird/contents/README.md?ref=master';
    const testUrl =
      'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/songbird.md';
    const converter = new Converter({ metadata: true });
    const response = await fetch(testUrl);
    const data = await response.text();

    // const dataBlob = await response.blob();
    // const data = await response.json();
    // const content = converter.makeHtml(data);
    // const meta = converter.getMetadata();
    // @ts-ignore
    setDataReadme<any>(data.slice(data.indexOf('## Критерии оценки:'), data.indexOf('## Штрафы')));
    // console.log(data);
  };

  return (
    <MainLayout title={'main: manager'}>
      <Title level={1}>Course Manager Page</Title>
      <main className={'main__box'}>
        <div className="nav__main">
          <div>
            <Title level={2}>Manager</Title>
            <div>
              <Button type="primary" htmlType="button" onClick={requestReadme}>
                Import readme
              </Button>
            </div>
          </div>
        </div>
        <div className="workspace">
          <h1>Working Space</h1>
          <ReadmePage dataReadme={dataReadme} />
        </div>
      </main>
    </MainLayout>
  );
};

export default ManagerPage;
