import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.scss";
import { AdminAuthProvider } from "./context/index.jsx";
import { CartProvider } from "./context/Cart.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminAuthProvider>
      <CartProvider>
      <App />
      </CartProvider>
    </AdminAuthProvider>
  </StrictMode>
);
