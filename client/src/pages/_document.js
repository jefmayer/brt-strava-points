import { Html, Head, Main, NextScript } from 'next/document'
import Footer from '@/components/footer'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white text-brt-black">
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  )
}
