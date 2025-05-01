import './index.css';
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found. Make sure the 'root' div is present in index.html.");
}
const root = createRoot(container);
root.render(<App />);
