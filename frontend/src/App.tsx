import { Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Chat from './screens/Chat';
import Login from './screens/Login';
import Signup from './screens/Signup';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<div>404 not found</div>} />
      <Route path="/" element={<Chat />} />
      <Route element={<RequireAuth />}></Route>
    </Routes>
  );
};

export default App;
