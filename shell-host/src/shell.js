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

async function loadAuth() {
  if (currentMFE?.unmount) {
    currentMFE.unmount();
    root.innerHTML = "";
  }

  const module = await import("auth/mfe-entry");

  const remote = module.default; // <-- THIS is the key

  remote.mount(root);
  currentMFE = remote;
}

async function loadNotes() {
  if (currentMFE?.unmount) {
    currentMFE.unmount();
    root.innerHTML = "";
  }

  const module = await import("notes/mfe-entry");
  const remote = module.default || module;

  remote.mount(root);
  currentMFE = remote;
}

document.getElementById("nav-auth").onclick = loadAuth;
document.getElementById("nav-notes").onclick = loadNotes;
