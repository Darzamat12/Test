import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
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
            onPress={() => navigation.navigate('Movie', {movie: item})}>
            <SharedElement id={`item.${item.id}.image`}>
              <Poster source={{uri: item.poster}} />
            </SharedElement>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};
