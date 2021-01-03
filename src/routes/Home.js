import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Movie from '../components/Movie';

// GraphQL Query 작성 방법
const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

// styled-component를 사용하는 이유
// https://analogcoding.tistory.com/181
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`; // 이거의 단점 : 오타 발생확률 높음 : align-items: center;에서 items를 item으로 작성했음 : extension 설치 후 해결

const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  font-size: 35px;
`;

// const Loading = styled.div`
//   font-size: 18px;
//   opacity: 0.5;
//   font-weight: 500;
//   margin-top: 10px;
// `;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`;

const Home = () => {
  // apollo 덕분에 @apollo/react-hooks에서 useQuery라는 것을 얻을 수 있음
  // useQuery는 ajax(fetch or axios)를 사용해서 내가 만든 graphQL서버(localhost:4000)으로 query를 보내면서 hooks를 이용해서
  // Home 함수를 한번 실행하고 그리고 response를 받아서 state가 변화되면 hooks에 의해 다시 Home을 실행해서 데이터를 사용 할 수 있게 함
  const { data } = useQuery(GET_MOVIES); // apollo에서 만든 useQuery라는 hooks(custom함수)를 다운받고 이렇게 쉽게 사용가능
  //   console.log('loading:', loading, 'error:', error, 'data:', data);
  // if (loading) {
  //     return 'loading...';
  // }
  // if (data && data.movies) {
  //     return data.movies.map((movie) => <h1>{movie.id}</h1>);
  // }

  // react로 view를 꾸미는 것은 굉장히 파괴적인 것 같다. 태그에 맞는 네이밍을 할때 더 신경을 써야겠다.
  return (
    <Container>
      <Header>
        <Title>Apollo 2020</Title>
        <SubTitle>I'm studying GraphQL</SubTitle>
      </Header>
      <Movies>
        {data?.movies?.map((m) => (
          <Movie key={m.id} id={m.id} bg={m.medium_cover_image} />
        ))}
      </Movies>
    </Container>
  );
};

export default Home;
