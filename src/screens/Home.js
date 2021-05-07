import axios from 'axios';
import React, {useState} from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import {Genre} from '../components/Genre';
import styled from 'styled-components';

const Title = styled.Text`
  font-size: 48px;
  align-self: center;
  margin-bottom: 24px;
`;

const Container = styled.ScrollView`
  flex: 1;
  padding: 0 8px;
`;

export const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  axios
    .get('https://wookie.codesubmit.io/movies', {
      headers: {
        'Authorization': ' Bearer Wookie2019',
      },
    })
    .then(response => setMovies(response.data.movies));
  const genres = [];
  movies.map(el =>
    el.genres.map(genre => !genres.includes(genre) && genres.push(genre)),
  );

  return (
    <Container>
      <Title>WOOKIE{'\n'} MOVIES</Title>
      {genres.map(el => (
        <Genre genre={el} movies={movies} />
      ))}
    </Container>
  );
};
