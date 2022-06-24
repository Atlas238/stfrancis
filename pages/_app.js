import { AppWrapper } from '../contexts/State'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <AppWrapper>
    <Component { ...pageProps } />
  </AppWrapper>
  )
}

export default MyApp
