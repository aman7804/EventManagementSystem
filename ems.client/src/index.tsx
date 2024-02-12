import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client"
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@emotion/react";
import projectTheme from "App.theme";
import { Provider } from "react-redux";
import store, {persistStorage} from "store/root/root.store";
import Loader from "components/loader";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import "../node_modules/aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

const root = createRoot(
  document.getElementById("root") as HTMLElement
)

root.render(
  <StrictMode>
    <Suspense fallback={<Loader />} >
      <Provider store={store} >
        <ThemeProvider theme={projectTheme}>
          <PersistGate loading={null} persistor={persistStorage}>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <App />
          </PersistGate>
        </ThemeProvider>
      </Provider>
    </Suspense>
  </StrictMode>
);