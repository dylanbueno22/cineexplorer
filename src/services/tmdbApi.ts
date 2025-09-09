import type { MovieDetails, MovieResponse, ApiConfig } from '../types/movie';

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

  // Gerar URL completa da imagem
  getImageUrl(path: string | null, size: 'w500' | 'w780' | 'original' = 'w780'): string {
    if (!path) return '';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }

  // Gerar URL do backdrop
  getBackdropUrl(path: string | null, size: 'w780' | 'w1280' | 'original' = 'w1280'): string {
    if (!path) return '';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}

// Instância singleton do serviço
export const tmdbService = new TMDBService();
export default tmdbService;
