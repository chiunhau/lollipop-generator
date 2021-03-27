import { Provider as StyletronProvider } from 'styletron-react'
import { DarkTheme, BaseProvider } from 'baseui'
import { styletron } from '../styletron'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={DarkTheme}>
        <Component {...pageProps} />
      </BaseProvider>
    </StyletronProvider>
  )
}

export default MyApp
