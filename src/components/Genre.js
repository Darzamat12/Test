import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';

const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Poster = styled.Image`
  height: 200px;
  width: 100px;
  margin-right: 8px;
`;

const Container = styled.View`
  margin: 16px 0;
`;

export const Genre = ({genre, movies, navigation}) => {
  const genreMovies = movies.filter(el => el.genres.includes(genre));
  return (
    <Container>
      <Title>{genre}</Title>
      <FlatList
        horizontal
        data={genreMovies}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onClick={() => navigation.navigate('Movie', {movie: item})}>
            <Poster source={{uri: item.poster}} />
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};
