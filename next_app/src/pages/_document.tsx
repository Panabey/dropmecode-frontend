/* eslint-disable @next/next/no-img-element */
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Shantell+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet"></link>
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/Global/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/Global/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/Global/favicon-16x16.png" />
        <link rel="manifest" href="/assets/Global/site.webmanifest"></link>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.yaContextCb=window.yaContextCb||[]
            `
          }}
        ></script>
        <script src="https://yandex.ru/ads/system/context.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="search"></div>
        <div id="cookie"></div>
        <div id="modal"></div>
        {Boolean(JSON.parse(process.env.NEXT_PUBLIC_DISABLE_METRICA || 'null')) === false
          ? <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    
              ym(${process.env.NEXT_PUBLIC_YMETRICA_NUMBER}, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true
              });
            `,
            }}
          />
          : <></>}
        <noscript>
          <div>
            <img src={`https://mc.yandex.ru/watch/${process.env.NEXT_PUBLIC_YMETRICA_NUMBER}`} style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
      </body>
    </Html>
  )
}
