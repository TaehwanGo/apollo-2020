import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// GraphQL Query 작성 방법
const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;
const Home = () => {
  // apollo 덕분에 @apollo/react-hooks에서 useQuery라는 것을 얻을 수 있음
  // useQuery는 ajax(fetch or axios)를 사용해서 내가 만든 graphQL서버(localhost:4000)으로 query를 보내면서 hooks를 이용해서
  // Home 함수를 한번 실행하고 그리고 response를 받아서 state가 변화되면 hooks에 의해 다시 Home을 실행해서 데이터를 사용 할 수 있게 함
  const { loading, error, data } = useQuery(GET_MOVIES); // apollo에서 만든 useQuery라는 hooks(custom함수)를 다운받고 이렇게 쉽게 사용가능
  console.log('loading:', loading, 'error:', error, 'data:', data);
  if (loading) {
    return 'loading...';
  }
  if (data && data.movies) {
    return data.movies.map((movie) => <h1>{movie.id}</h1>);
  }
};

export default Home;
