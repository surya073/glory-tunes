import './styles/globals.css';
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import { FloatingWhatsApp, FloatingCall } from './components/FloatingButtons';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      <SEO
        title="Glory Tunes | Custom Songs for Weddings, Proposals & Tributes"
        description="Turn your story into a song. Personalized custom music for weddings, proposals, anniversaries, tributes, and more."
        path="/"
      />
      <ScrollProgress />
      <Navbar />
      <Home />
      <FloatingWhatsApp />
      <FloatingCall />
    </>
  );
}