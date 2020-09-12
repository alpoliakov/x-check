import * as React from 'react';
import '../styles/global.css';
import 'antd/dist/antd.css';
import '../components/Admin/admin.css';
import type { AppProps /*, AppContext */ } from 'next/app';
import NextNprogress from 'nextjs-progressbar';

interface ProfileType {
  color: string;
  startPosition: string;
  stopDelayMs: string;
  height: string;
}

const ProgressBar: React.FC<ProfileType> = () => <NextNprogress />;

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ProgressBar color="#29D" startPosition="0.3" stopDelayMs="200" height="3" />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
