import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import Alert from "@mui/material/Alert";

const HomePage = (props) => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['discover'],
    queryFn: getMovies,
  })

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
    <>
      <Alert severity="info" sx={{ mb: 2 }}>
        Welcome to my Assignment 1 
      </Alert>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />
    </>
  );

};
export default HomePage;
