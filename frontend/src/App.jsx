import { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import SignIn from './Pages/signIn';
import Register from './Pages/register';
import AdminPanel from './Pages/AdminPanel';
import VoterPanel from './Pages/VoterPanel';

function App() {
  const [count, setCount] = useState(0);

  return (
  <>
    <Routes>
    <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-panel" element={<AdminPanel />} />
      <Route path="/voter-panel" element={<VoterPanel />} />
      </Routes>
      </>
  );
}

export default App;
