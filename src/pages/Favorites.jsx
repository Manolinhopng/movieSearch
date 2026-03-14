import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';
import { HeartCrack } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="relative z-10">
        <div className="absolute inset-0 bg-rose-500/10 blur-[100px] rounded-full -z-10" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-white drop-shadow-md">
          Tus <span className="text-rose-400">Favoritos</span>
        </h1>
        <p className="text-slate-400 mb-8">Películas guardadas en tu colección.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 min-h-[50vh] bg-slate-900/30 rounded-3xl border border-white/5 border-dashed">
          <HeartCrack className="w-16 h-16 text-slate-700 mb-4" />
          <div className="text-2xl font-bold mb-2">Aún no hay favoritos</div>
          <p className="mb-6">¡Explora y añade tus películas preferidas!</p>
          <Link 
            to="/"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/20"
          >
            Explorar películas
          </Link>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <AnimatePresence>
            {favorites.map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                isFavorite={isFavorite(movie.id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
