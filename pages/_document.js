import { Html, Head, Main, NextScript } from 'next/document'

// Next File - Only used to place id on HTML parent element
export default function Document() {
    return (
        <Html id="html">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}