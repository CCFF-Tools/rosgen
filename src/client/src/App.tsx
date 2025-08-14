import { useEffect, useState } from 'react';
import './App.css';
import type { Cue } from './storage';
import { getCues, createCue, updateCue, deleteCue } from './storage';

function App() {
  const [cues, setCues] = useState<Cue[]>([]);
  const [newText, setNewText] = useState('');

  useEffect(() => {
    setCues(getCues());
  }, []);

  const addCue = () => {
    if (!newText.trim()) return;
    createCue({ id: crypto.randomUUID(), text: newText });
    setCues(getCues());
    setNewText('');
  };

  const editCue = (id: string, text: string) => {
    const cue = cues.find((c) => c.id === id);
    if (!cue) return;
    updateCue({ ...cue, text });
    setCues(getCues());
  };

  const removeCue = (id: string) => {
    deleteCue(id);
    setCues(getCues());
  };

  return (
    <div className="card">
      <h1>Local Cues</h1>
      <div>
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="New cue"
        />
        <button onClick={addCue}>Add</button>
      </div>
      <ul>
        {cues.map((cue) => (
          <li key={cue.id}>
            <input
              value={(cue as { text?: string }).text ?? ''}
              onChange={(e) => editCue(cue.id, e.target.value)}
            />
            <button onClick={() => removeCue(cue.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
