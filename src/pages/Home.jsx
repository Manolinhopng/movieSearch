import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { discoverMovies, searchMovies, getGenres } from '../api/tmdb';
import { useDebounce } from '../hooks/useDebounce';
import { useFavorites } from '../hooks/useFavorites';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [genresList, setGenresList] = useState([]);
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    getGenres().then(res => setGenresList(res.genres || [])).catch(console.error);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let res;
        if (debouncedQuery.trim() !== '') {
          // Si hay búsqueda por texto, usamos search. Los filtros aplican menos en el endpoint de search nativo,
          // pero al menos buscamos el query
          res = await searchMovies(debouncedQuery, page);
        } else {
          // Si no hay query, usamos discover
          const params = {
            page,
            sort_by: sortBy,
            primary_release_year: year || undefined,
            with_genres: genre || undefined,
            include_adult: false
          };
          res = await discoverMovies(params);
        }
        setMovies(res.results || []);
        setTotalPages(res.total_pages || 1);
      } catch (err) {
        setError('Error al cargar las películas. Por favor, verifica tu conexión o API Key.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedQuery, year, genre, sortBy, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, year, genre, sortBy]);

  const handlePrevPage = () => setPage(p => Math.max(1, p - 1));
  const handleNextPage = () => setPage(p => Math.min(totalPages, p + 1));

  return (
    <div className="flex flex-col gap-8 pb-12">
      <section className="relative z-10">
        <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] rounded-full -z-10" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white drop-shadow-md">
          Descubre <span className="text-indigo-400">películas</span>
        </h1>
        <SearchBar 
          query={query} setQuery={setQuery}
          year={year} setYear={setYear}
          genre={genre} setGenre={setGenre}
          sortBy={sortBy} setSortBy={setSortBy}
          genresList={genresList}
        />
      </section>

      {error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-center">
          {error}
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center py-20 min-h-[50vh]">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        </div>
      ) : (
        <>
          {movies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500 min-h-[50vh]">
              <div className="text-2xl font-bold mb-2">No se encontraron resultados</div>
              <p>Intenta con otra búsqueda o cambia los filtros</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              <AnimatePresence>
                {movies.map(movie => (
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button 
                onClick={handlePrevPage} 
                disabled={page === 1}
                className="p-3 bg-slate-900 border border-white/5 rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-300" />
              </button>
              <span className="text-slate-400 font-medium">
                Página <span className="text-white">{page}</span> de {totalPages > 500 ? 500 : totalPages}
              </span>
              <button 
                onClick={handleNextPage} 
                disabled={page >= totalPages || page >= 500}
                className="p-3 bg-slate-900 border border-white/5 rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
