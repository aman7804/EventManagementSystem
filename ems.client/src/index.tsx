import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@emotion/react";
import projectTheme from "App.theme";
import { Provider } from "react-redux";
import store from "store/root/root.store";
import Loader from "components/loader";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <StrictMode>
    <Suspense fallback={<Loader />} >
      <Provider store={store}>
        <ThemeProvider theme={projectTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    </Suspense>
  </StrictMode>,
);