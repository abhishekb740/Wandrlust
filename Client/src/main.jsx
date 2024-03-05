import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.jsx'
import './index.css';
import store from "./store/index.jsx";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <NextUIProvider>
                <App />
            </NextUIProvider>
        </Provider>
    </BrowserRouter>
)
