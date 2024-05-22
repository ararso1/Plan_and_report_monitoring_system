import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./GlobalContexts/Auth-Context.jsx";
import TokenRefresher from "./GlobalContexts/TokenRefresher.jsx";
import { ThemeProvider } from "@material-tailwind/react";

// import persistor from "./reduxToolKit/store/persistor.jsx";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import store from "./reduxToolKit/store/store.jsx";
// import { persistor } from "./reduxToolKit/store/store.jsx";
import "./i8n.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <AuthProvider>
        <ThemeProvider>
          <App />
          <TokenRefresher />
        </ThemeProvider>
      </AuthProvider>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
