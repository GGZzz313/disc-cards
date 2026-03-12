import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ManagerSession from './pages/ManagerSession';
import PlayerSession from './pages/PlayerSession';
import ConnectionIndicator from './components/shared/ConnectionIndicator';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manager" element={<ManagerSession />} />
        <Route path="/play" element={<PlayerSession />} />
      </Routes>
      <ConnectionIndicator />
    </BrowserRouter>
  );
}
