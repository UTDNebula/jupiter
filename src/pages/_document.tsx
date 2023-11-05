import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang="en">
      <Head prefix="og: http://ogp.me/ns#">
        <meta
          name="description"
          content="A student organization portal to connect organizations on campus with interested students at UTD."
        />
        <meta name="theme-color" content="#573DFF" />

        <meta property="og:title" content="Jupiter" />
        <meta
          property="og:description"
          content="A student organization portal to connect organizations on campus with interested students at UTD."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://jupiter.utdnebula.com/logoIcon.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Nebula Labs Icon." />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:domain" content="jupiter.utdnebula.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
