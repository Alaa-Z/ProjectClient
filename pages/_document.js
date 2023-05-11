import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      {/* <Head /> */}
      <Head>
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places&v=3.42`}
            async
          />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
