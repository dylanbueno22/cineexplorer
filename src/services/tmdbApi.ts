import type { MovieDetails, MovieResponse, ApiConfig } from '../types/movie';
import type { MovieCredits, MovieDetailsExtended, Person } from '../types/movieDetails';
import type { TVSeriesDetails, TVSeriesResponse, TVSeriesCredits } from '../types/tvSeries';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODFlNTk3YjA4NGNiMDk5ZjFhNTUxNjQ4YTUyMTAxNiIsIm5iZiI6MTc1NzI1OTgxMy4wMzAwMDAyLCJzdWIiOiI2OGJkYTgyNTYwYzk5MDAxMjQ5NDczZTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mUWAhRGMoszB1SoNoDBfirNVDNG8jTQbYzqCU7OJ58w';

class TMDBService {
  private baseURL: string;
  private accessToken: string;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.accessToken = ACCESS_TOKEN;
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    // Adicionar parâmetros
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Buscar filmes populares
  async getPopularMovies(page: number = 1): Promise<MovieResponse> {
    return this.makeRequest<MovieResponse>('/movie/popular', {
      page: page.toString(),
    });
  }

  // Buscar filmes em destaque (trending)
  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week', page: number = 1): Promise<MovieResponse> {
    return this.makeRequest<MovieResponse>(`/trending/movie/${timeWindow}`, {
      page: page.toString(),
    });
  }

  // Buscar detalhes de um filme específico
  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.makeRequest<MovieDetails>(`/movie/${movieId}`);
  }

  // Buscar filmes por gênero
  async getMoviesByGenre(genreId: number, page: number = 1): Promise<MovieResponse> {
    return this.makeRequest<MovieResponse>('/discover/movie', {
      with_genres: genreId.toString(),
      page: page.toString(),
      sort_by: 'popularity.desc',
    });
  }

  // Buscar filmes por busca
  async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    return this.makeRequest<MovieResponse>('/search/movie', {
      query,
      page: page.toString(),
    });
  }

  // Buscar configuração da API (para URLs de imagens)
  async getApiConfiguration(): Promise<ApiConfig> {
    return this.makeRequest<ApiConfig>('/configuration');
  }

  // Buscar elenco e direção de um filme
  async getMovieCredits(movieId: number): Promise<MovieCredits> {
    return this.makeRequest<MovieCredits>(`/movie/${movieId}/credits`);
  }

  // Buscar detalhes completos de um filme
  async getMovieDetailsExtended(movieId: number): Promise<MovieDetailsExtended> {
    return this.makeRequest<MovieDetailsExtended>(`/movie/${movieId}`, {
      append_to_response: 'credits,videos,images,reviews'
    });
  }

  // Buscar detalhes de uma pessoa
  async getPersonDetails(personId: number): Promise<Person> {
    return this.makeRequest<Person>(`/person/${personId}`);
  }

  // ===== MÉTODOS PARA SÉRIES DE TV =====

  // Buscar séries populares
  async getPopularTVSeries(page: number = 1): Promise<TVSeriesResponse> {
    return this.makeRequest<TVSeriesResponse>('/tv/popular', {
      page: page.toString(),
    });
  }

  // Buscar séries em destaque (trending)
  async getTrendingTVSeries(timeWindow: 'day' | 'week' = 'week', page: number = 1): Promise<TVSeriesResponse> {
    return this.makeRequest<TVSeriesResponse>(`/trending/tv/${timeWindow}`, {
      page: page.toString(),
    });
  }

  // Buscar detalhes de uma série específica
  async getTVSeriesDetails(tvId: number): Promise<TVSeriesDetails> {
    return this.makeRequest<TVSeriesDetails>(`/tv/${tvId}`);
  }

  // Buscar séries por gênero
  async getTVSeriesByGenre(genreId: number, page: number = 1): Promise<TVSeriesResponse> {
    return this.makeRequest<TVSeriesResponse>('/discover/tv', {
      with_genres: genreId.toString(),
      page: page.toString(),
      sort_by: 'popularity.desc',
    });
  }

  // Buscar séries por busca
  async searchTVSeries(query: string, page: number = 1): Promise<TVSeriesResponse> {
    return this.makeRequest<TVSeriesResponse>('/search/tv', {
      query,
      page: page.toString(),
    });
  }

  // Buscar elenco e direção de uma série
  async getTVSeriesCredits(tvId: number): Promise<TVSeriesCredits> {
    return this.makeRequest<TVSeriesCredits>(`/tv/${tvId}/credits`);
  }

  // Buscar séries mais bem avaliadas
  async getTopRatedTVSeries(page: number = 1): Promise<TVSeriesResponse> {
    return this.makeRequest<TVSeriesResponse>('/tv/top_rated', {
      page: page.toString(),
    });
  }

  // Buscar séries no ar
  async getOnTheAirTVSeries(page: number = 1): Promise<TVSeriesResponse> {
    return this.makeRequest<TVSeriesResponse>('/tv/on_the_air', {
      page: page.toString(),
    });
  }

  // Gerar URL completa da imagem
  getImageUrl(path: string | null, size: 'w500' | 'w780' | 'original' = 'w780'): string | null {
    if (!path || path.trim() === '') return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }

  // Gerar URL do backdrop
  getBackdropUrl(path: string | null, size: 'w780' | 'w1280' | 'original' = 'w1280'): string | null {
    if (!path || path.trim() === '') return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}

// Instância singleton do serviço
export const tmdbService = new TMDBService();
export default tmdbService;
