import { useEffect, useState } from "react";
import { fetchNotes, createnote } from "./api/notes.api";
export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  async function loadNotes() {
    try {
      const data = await fetchNotes();
      setNotes(data);
      setMessage("");
    } catch (err) {
      setMessage(err.message);
    }
  }

  async function handleAdd() {
    if (!text.trim()) return;
    console.log("handleAdd", text);

    try {
      await createnote(text);
      setText("");
      loadNotes();
    } catch (err) {
      console.log(err);
      setMessage(err.message);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div>
      <h2>Notes React Microfrontend</h2>

      <input
        placeholder="Write a note..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <p>{message}</p>

      <ul>
        {notes.map(note => (
          <li key={note._id}>{note.text}</li>
        ))}
      </ul>
    </div>
  );
}
