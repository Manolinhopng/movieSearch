import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMovieDetail } from '../api/tmdb';
import { useFavorites } from '../hooks/useFavorites';
import { Star, ArrowLeft, Heart, Calendar, PlaySquare, Clock } from 'lucide-react';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieDetail(id);
        setMovie(data);
      } catch (err) {
        setError('No se pudo cargar la información de la película.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center py-20 text-red-400">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error || 'Película no encontrada'}</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-indigo-400 hover:text-indigo-300">
          Volver atrás
        </button>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` 
    : '';
  
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=Sin+Poster';

  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const isFav = isFavorite(movie.id);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto flex flex-col gap-8 pb-12"
    >
      <button 
        onClick={() => navigate(-1)}
        className="self-start flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Volver</span>
      </button>

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/20 border border-white/10 group">
        <div className="absolute inset-0 z-0 bg-slate-950">
          {backdropUrl && (
            <img 
              src={backdropUrl} 
              alt={movie.title} 
              className="w-full h-full object-cover opacity-30 select-none pointer-events-none"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent md:via-slate-950/80" />
        </div>

        <div className="relative z-10 p-6 md:p-12 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <motion.img 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            src={posterUrl} 
            alt={movie.title} 
            className="w-64 max-w-full rounded-2xl shadow-2xl transform transition-transform group-hover:scale-105 duration-500"
          />

          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-2">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-lg text-indigo-300 italic mb-6 font-medium">"{movie.tagline}"</p>
            )}

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8 text-sm font-medium text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-white">{movie.vote_average?.toFixed(1)}</span>
                <span className="text-slate-500">({movie.vote_count} votos)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{movie.release_date || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{movie.runtime} min</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="px-4 py-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full text-sm font-medium tracking-wide">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => toggleFavorite(movie)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
                  isFav 
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 hover:shadow-rose-500/20' 
                    : 'bg-slate-800 text-white hover:bg-slate-700 hover:shadow-slate-800/50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-400 text-rose-400' : ''}`} />
                {isFav ? 'En Favoritos' : 'Añadir a Favoritos'}
              </button>
              
              {trailer && (
                <a 
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/30 border border-indigo-400/20"
                >
                  <PlaySquare className="w-5 h-5" />
                  Ver Trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
              Sinopsis
            </h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              {movie.overview || 'No hay sinopsis disponible para esta película.'}
            </p>
          </section>

          {/* Cast Preview */}
          {movie.credits?.cast && movie.credits.cast.length > 0 && (
            <section className="bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full inline-block"></span>
                Reparto Principal
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movie.credits.cast.slice(0, 8).map(actor => (
                  <div key={actor.id} className="flex flex-col items-center text-center group">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-[3px] border-slate-800 group-hover:border-indigo-400 transition-colors shadow-lg">
                      {actor.profile_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                          alt={actor.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center font-bold text-slate-500 text-xl">
                          {actor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="font-semibold text-slate-200 text-sm">{actor.name}</span>
                    <span className="text-xs text-slate-500">{actor.character}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5">
            <h3 className="font-semibold text-slate-400 uppercase tracking-wider text-sm mb-4">Información Adicional</h3>
            <ul className="space-y-4">
              <li>
                <span className="block text-sm text-slate-500 mb-1">Título Original</span>
                <strong className="text-slate-200">{movie.original_title}</strong>
              </li>
              <li>
                <span className="block text-sm text-slate-500 mb-1">Estado</span>
                <strong className="text-slate-200">{movie.status}</strong>
              </li>
              <li>
                <span className="block text-sm text-slate-500 mb-1">Presupuesto</span>
                <strong className="text-slate-200">
                  {movie.budget ? `$${(movie.budget / 1000000).toFixed(1)}M` : 'Desconocido'}
                </strong>
              </li>
              <li>
                <span className="block text-sm text-slate-500 mb-1">Recaudación</span>
                <strong className="text-slate-200">
                  {movie.revenue ? `$${(movie.revenue / 1000000).toFixed(1)}M` : 'Desconocido'}
                </strong>
              </li>
              {movie.production_companies && movie.production_companies.length > 0 && (
                <li>
                  <span className="block text-sm text-slate-500 mb-2">Productoras</span>
                  <div className="flex flex-wrap gap-2">
                    {movie.production_companies.map(company => (
                      <span key={company.id} className="text-xs px-2 py-1 bg-slate-800 rounded-md text-slate-300">
                        {company.name}
                      </span>
                    ))}
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
