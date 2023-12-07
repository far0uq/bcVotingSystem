import { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import SignIn from './Pages/signIn';
import Register from './Pages/register';

function App() {
  const [count, setCount] = useState(0);

  return (
  <>
    <Routes>
    <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      </Routes>
      </>
  );
}

export default App;
