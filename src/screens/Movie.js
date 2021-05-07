import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styled from 'styled-components';
import goldenStar from '../../assets/goldenstar.png';
import star from '../../assets/star.png';

const BackDrop = styled.ImageBackground`
  width: 100%;
  height: 250px;
  flex-direction: row;
  align-items: flex-end;
`;
const Poster = styled.Image`
  width: 100px;
  height: 180px;
  margin-right: 8px;
`;
const Title = styled.Text`
  font-size: 20px;
  color: white;
  margin-bottom: 8px;
  margin-left: 8px;
`;
const StarIcon = styled.Image`
  height: 20;
  width: 20;
  margin: 0 4px;
`;
const StarsContainer = styled.View`
  flex-direction: row;
  position: relative;
  left: 150px;
  top: 50px;
`;
const Main = styled.ScrollView`
  position: relative;
  top: 90px;
  padding: 0px 36px 0 32px;
`;

const Info = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const MovieScreen = ({navigation, route}) => {
  const {movie} = route.params;
  const starsRating = Math.round(movie.imdb_rating / 2);
  return (
    <View style={{flex: 1}}>
      <BackDrop source={{uri: movie.backdrop}}>
        <View
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            position: 'relative',
            top: 90,
            marginLeft: 32,
            flexDirection: 'row',
            alignItems: 'flex-end',

            elevation: 19,
          }}>
          <Poster source={{uri: movie.poster}} />
        </View>
        <Title>{`${movie.title}(${movie.imdb_rating})`}</Title>
      </BackDrop>
      <StarsContainer>
        {new Array(5)
          .fill(' ')
          .map((_, i) =>
            i <= starsRating - 1 ? (
              <StarIcon source={goldenStar} />
            ) : (
              <StarIcon source={star} />
            ),
          )}
      </StarsContainer>
      <Main>
        <Info>{`${new Date(movie.released_on).getFullYear()} | ${
          movie.length
        } | ${movie.director}`}</Info>
        <Info>{`cast: ${movie.cast.join(', ')}`}</Info>
        <Info>{movie.overview}</Info>
      </Main>
    </View>
  );
};
