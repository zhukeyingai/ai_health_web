import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./routes/app.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode></React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
