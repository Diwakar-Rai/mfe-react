const API_BASE = "http://localhost:4000";
function requestToken() {
  return new Promise(resolve => {
    function handler(e) {
      window.removeEventListener("auth:token", handler);
      resolve(e.detail.token);
    }
    window.addEventListener("auth:token", handler);
    window.dispatchEvent(new Event("auth:request-token"));
  });
}

export async function fetchNotes() {
  const token = await requestToken();
  if (!token) throw new Error("Not authentiated");
  const res = await fetch(`${API_BASE}/notes`, {
    headers: { Authorization: token },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }
  return res.json();
}

export async function createnote(text) {
  console.log("create note executed");
  const token = await requestToken();
  console.log("token resolved", token);
  if (!token) throw new Error("Not authenticated");
  const res = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ text }),
  });
  console.log("fetch executed", res);
  if (!res.ok) {
    throw new Error("Failed ");
  }

  return res.json();
}
