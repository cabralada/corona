import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react';
// import style from './../styles/Document.module.css';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
					<div style={{
						maxWidth: 1440,
						padding: '2vh 5vh',
						margin: '0 auto'
					}}>
						<Main />
						<NextScript />
					</div>
        </body>
      </Html>
    )
  }
}

export default MyDocument;