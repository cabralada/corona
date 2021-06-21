import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react';
class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
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
						padding: '2vh calc(5vw + 15px) 2vh calc(10vw + 15px)',
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