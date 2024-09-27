import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "normalize.css"
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from "./store";
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
)
