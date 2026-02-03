import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NotesApp from "./App";
let root = null;
export function mount(container) {
  if (!root) {
    root = createRoot(container);
  }
  root.render(
    <StrictMode>
      <NotesApp />
    </StrictMode>,
  );
}

export function unmount() {
  if (root) {
    root.unmount();
    root = null;
  }
}
