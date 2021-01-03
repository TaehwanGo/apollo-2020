import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

// query에 variable(args or params) 가 없으면
// 특별하게 뭔가 적을 필요가 없음
// const GET_MOVIES = gql`
//   {
//     movies {
//       id
//       medium_cover_image
//     }
//   }
// `;
// 처럼
// 근데 querydp variable이 있다면(id같은) 그 query의 이름을 적어야 함
// Apollo, React, GraphQL, React Apollo를 위한 것을 알려주는
// query getMovie()는 Apollo를 위한 것이고 - 타입 확인 용인 것 같다
// 그 안에 있는 movie(id){}는 내 서버로 가는 query
// query getMovie에서 query는 고정(query or mutation but in this case, it's query)
// getMovie라는 이름은 맘대로 지어도 됨, 단지 함수인 것을 알리기 위함
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`; // 쿼리 요청할때 id까지 받아와야 apollo가 home에 있는 리스트에 있는 아이템과 같은 아이템이라는 것을 인지함

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Detail = () => {
  const { id } = useParams();
  //   console.log('id:', +id);
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id }, // id: parseInt(id) or +id
  });
  //   console.log('loading:', loading, 'data:', data);
  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? 'Loading...'
            : `${data.movie.title} ${data.movie.isLiked ? '❤' : '😥'}`}
        </Title>
        <Subtitle>
          {data?.movie?.language} · {data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
      </Column>
      <Poster
        // bg={data && data.movie ? data.movie.medium_cover_image : ''}
        bg={data?.movie?.medium_cover_image}
      ></Poster>
      {/* {data && data.suggestions && data.suggestions.map()} //code challenge */}
    </Container>
  );
};

export default Detail;
