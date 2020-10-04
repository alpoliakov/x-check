import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class extends Document {
  enableGA = process.env.NODE_ENV === 'production';

  render(): any {
    return (
      <html lang="en">
        <Head>
          <link rel="shortcut icon" href="https://rs.school/favicon.ico" />
          {this.enableGA && (
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-55428637-3" />
          )}
          {this.enableGA && <script dangerouslySetInnerHTML={{ __html: gaJsCode }} />}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

const gaJsCode = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-55428637-3');
`;
