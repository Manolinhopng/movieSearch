import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Film, Heart } from 'lucide-react';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
        <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-sm shadow-indigo-500/5">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
                <Film className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                CineSearch
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link to="/" className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors">
                Inicio
              </Link>
              <Link to="/favorites" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-rose-400 transition-colors">
                <Heart className="w-4 h-4" />
                <span>Favoritos</span>
              </Link>
            </nav>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
