import './styles/globals.css';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import { FloatingWhatsApp, FloatingCall } from './components/FloatingButtons';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Home />
      <FloatingWhatsApp />
      <FloatingCall />
    </>
  );
}
