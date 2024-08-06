// _document.js
// eslint-disable-next-line @next/next/no-document-import-in-page
import { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => (
  <Html>
    <Head>
      <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default MyDocument;
