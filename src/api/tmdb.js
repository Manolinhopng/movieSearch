import axios from 'axios';

// Get API Key from environment or use a dummy one to fail gracefully
const api_key = import.meta.env.VITE_TMDB_API_KEY || '104b2b34ac0b15392bc6916c5f78c187';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key, 
    language: 'es-ES',
  },
});

export const searchMovies = async (query, page = 1) => {
  const { data } = await tmdb.get('/search/movie', {
    params: { query, page },
  });
  return data;
};

export const getPopularMovies = async (page = 1) => {
  const { data } = await tmdb.get('/movie/popular', {
    params: { page },
  });
  return data;
};

export const getMovieDetail = async (id) => {
  const { data } = await tmdb.get(`/movie/${id}`, {
    params: {
      append_to_response: 'videos,credits'
    }
  });
  return data;
};

export const getGenres = async () => {
  const { data } = await tmdb.get('/genre/movie/list');
  return data;
};

export const discoverMovies = async (params) => {
  const { data } = await tmdb.get('/discover/movie', {
    params,
  });
  return data;
};
