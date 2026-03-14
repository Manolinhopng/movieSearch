import { motion } from 'framer-motion';
import { Star, Heart, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie, isFavorite, toggleFavorite }) {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=Sin+Poster';

  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col bg-slate-900 rounded-2xl overflow-hidden shadow-xl shadow-slate-950/50 border border-slate-800 hover:border-indigo-500/50 transition-colors"
    >
      <Link to={`/movie/${movie.id}`} className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={posterUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-lg">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-semibold text-slate-200">{movie.vote_average?.toFixed(1)}</span>
        </div>
      </Link>

      {/* Favorite Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(movie);
        }}
        className="absolute top-4 right-4 p-2 bg-slate-950/60 hover:bg-slate-900 backdrop-blur-md rounded-full border border-white/10 transition-colors z-10"
      >
        <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`} />
      </button>

      <Link to={`/movie/${movie.id}`} className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-bold text-lg leading-tight text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2">
          {movie.title}
        </h3>
        
        <div className="mt-auto flex items-center justify-between text-sm text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 top-[-2px] relative" />
            <span>{releaseYear}</span>
          </div>
          <span className="text-xs px-2 py-1 bg-slate-800 rounded-md text-slate-300 font-medium">Ver detalles</span>
        </div>
      </Link>
    </motion.div>
  );
}
