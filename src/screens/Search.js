import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components';
import search from '../../assets/search.png';

const Container = styled.View`
  flex: 1;
  padding-top: 60px;
`;

const Poster = styled.Image`
  height: 300px;
  width: 200px;
  margin-bottom: 16px;
`;
const Input = styled.TextInput`
  height: 50px;
  border-width: 1px;
  border-radius: 20px;
  width: 50%;
  padding-left: 8px;
`;
const PosterContainer = styled.TouchableOpacity`
  border-width: 1px;
  padding: 10px 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-color: #656565;
  margin-left: 8px;
`;

export const SearchScreen = ({navigation}) => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    setMovies(null);
    setSearchValue('');
  }, [isFocused]);

  const handleSearch = () => {
    if (!searchValue) return;
    setLoading(true);
    axios
      .get(`https://wookie.codesubmit.io/movies?q=${searchValue}`, {
        headers: {
          'Authorization': ' Bearer Wookie2019',
        },
      })
      .then(response => {
        setLoading(false);
        setSearchValue('');
        if (response.data.movies.length === 1) {
          navigation.navigate('Movie', {movie: response.data.movies[0]});
          return;
        }
        setMovies(response.data.movies);
      });
  };
  return (
    <Container>
      <View
        style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 24}}>
        <Input
          placeholder="Search movie"
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <PosterContainer onPress={() => handleSearch()}>
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={search}
          />
        </PosterContainer>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : movies?.length === 0 ? (
        <Text style={{fontSize: 32, alignSelf: 'center'}}>No movies found</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={item => item.id}
          style={{alignSelf: 'center'}}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Movie', {movie: item})}>
              <Poster source={{uri: item.poster}} />
            </TouchableOpacity>
          )}
        />
      )}
    </Container>
  );
};
