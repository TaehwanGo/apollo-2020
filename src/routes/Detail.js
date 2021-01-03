import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

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
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_MOVIE, {
    variables: { id: +id }, // id: parseInt(id)
  });
  console.log(loading, error, data);
  if (loading) {
    return 'loading...';
  }
  if (data && data.movie) {
    return data.movie.title;
  }
};

export default Detail;
