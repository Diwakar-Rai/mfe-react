const root = document.getElementById("mfe-root");
let currentMFE = null;
let authToken = null;

/**
 * Auth state management
 */

window.addEventListener("auth:login", e => {
  authToken = e.detail.token;
  console.log("Shell stored auth token");
});

window.addEventListener("auth:request-token", () => {
  window.dispatchEvent(
    new CustomEvent("auth:token", {
      detail: { token: authToken },
    }),
  );
});

/**
 * Microfrontend loader
 */

async function loadMFE(url) {
  if (currentMFE?.unmount) {
    currentMFE.unmount();
    root.innerHTML = "";
  }
  const module = await import(url);
  module.mount(root);
  currentMFE = module;
}

/**
 * Navigation
 */

document.getElementById("nav-auth").onclick = () => {
  loadMFE("http://localhost:3000/auth.mfe.js");
};

document.getElementById("nav-notes").onclick = () => {
  loadMFE("http://localhost:3001/notes.mfe.js");
};
