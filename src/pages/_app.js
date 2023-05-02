import '@/styles/globals.css'
import { Provider } from "react-redux";
import { wrapper, store, persistor } from "../store";
import { PersistGate } from 'redux-persist/integration/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate  persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  )
}
