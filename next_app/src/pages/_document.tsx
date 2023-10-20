import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/Global/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/Global/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/Global/favicon-16x16.png" />
        <link rel="manifest" href="/assets/Global/site.webmanifest"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="search"></div>
        <div id="cookie"></div>
        <div id="modal"></div>
      </body>
    </Html>
  )
}
