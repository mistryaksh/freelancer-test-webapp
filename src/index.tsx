import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
     <React.StrictMode>
          <BrowserRouter>
               <ReduxProvider store={store}>
                    <SnackbarProvider autoHideDuration={2000}>
                         <App />
                    </SnackbarProvider>
               </ReduxProvider>
          </BrowserRouter>
     </React.StrictMode>
);
