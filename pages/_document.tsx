import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react';
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
						padding: '2vh 4vh 2vh calc(5vh + 5px)',
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