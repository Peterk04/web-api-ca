import React from "react";
import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import { getSimilarMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const SimilarMoviesPage = (props) => {
    const { id } = useParams();
    const { data: data, error, isPending, isError } = useQuery({
        queryKey: ['similar', { id }],
        queryFn: getSimilarMovies,
    });

    if (isPending) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    const movies = data.results;

    // Redundant, but necessary to avoid app crashing.
    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    const addToFavorites = (movieId) => true

    return (
        <PageTemplate
            title="Similar Movies"
            movies={movies}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie} />
            }}
        />
    );

};
export default SimilarMoviesPage;
