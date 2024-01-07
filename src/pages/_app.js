import "src/styles/globals.css";
import { GlobalContextProvider } from "../context/GlobalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </GlobalContextProvider>
  );
}
