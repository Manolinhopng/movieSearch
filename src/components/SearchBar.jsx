import { Search, SlidersHorizontal, ArrowDownAZ } from 'lucide-react';

export default function SearchBar({
  query,
  setQuery,
  year,
  setYear,
  genre,
  setGenre,
  sortBy,
  setSortBy,
  genresList,
}) {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-2xl p-4 md:p-6 shadow-xl shadow-slate-950/50 flex flex-col gap-4">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-indigo-400 group-focus-within:text-indigo-300 transition-colors" />
        </div>
        <input
          type="text"
          className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 rounded-xl pl-12 pr-4 py-4 border border-slate-800 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
          placeholder="Busca tus películas favoritas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* Subtle glowing effect behind input */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 xl:group-hover:opacity-10 transition duration-500 blur-sm -z-10"></div>
      </div>

      {/* Filters Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            Año
          </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none appearance-none"
          >
            <option value="">Todos los años</option>
            {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Género
          </label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none appearance-none"
          >
            <option value="">Todos los géneros</option>
            {genresList.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ArrowDownAZ className="w-3.5 h-3.5" />
            Ordenar por
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none appearance-none"
          >
            <option value="popularity.desc">Más Populares</option>
            <option value="vote_average.desc">Más Valoradas</option>
            <option value="primary_release_date.desc">Más Recientes</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
