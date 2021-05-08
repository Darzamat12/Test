import axios from 'axios';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {ActivityIndicator} from 'react-native';

import {Genre} from '../components/Genre';

const Title = styled.Text`
  font-size: 48px;
  align-self: center;
  margin-bottom: 24px;
`;

const Container = styled.ScrollView`
  flex: 1;
  padding: 24px 8px;
`;

export const HomeScreen = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get('https://wookie.codesubmit.io/movies', {
        headers: {
          'Authorization': ' Bearer Wookie2019',
        },
      })
      .then(response => {
        setMovies(response.data.movies);
        setLoading(false);
      });
  }, []);

  const genres = [];
  movies.map(el =>
    el.genres.map(genre => !genres.includes(genre) && genres.push(genre)),
  );

  return (
    <Container>
      {loading ? (
        <ActivityIndicator style={{marginTop: 60}} size="large" />
      ) : (
        <>
          <Title>WOOKIE{'\n'} MOVIES</Title>

          {genres.map(el => (
            <Genre navigation={navigation} genre={el} movies={movies} />
          ))}
        </>
      )}
    </Container>
  );
};
