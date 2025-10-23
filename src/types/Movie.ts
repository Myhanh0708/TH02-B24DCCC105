// src/types/Movie.ts

export interface MovieSearchResult {
    Title: string;
    Year: string;
    imdbID: string; 
    Type: string;
    Poster: string;
}

export interface MovieDetailData {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Plot: string;
    Poster: string;
    imdbID: string;
    Response: "True" | "False";
    Error?: string;
}

export interface SearchResponse {
    Search?: MovieSearchResult[];
    totalResults?: string;
    Response: "True" | "False";
    Error?: string;
}
