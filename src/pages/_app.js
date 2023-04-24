import '@/styles/globals.css'
import { Provider } from "react-redux";
import { wrapper, store } from "../store";
// import 'antd/dist/antd.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
          <Component {...pageProps} />
      </Provider>
    </>
  )
}
