import React from 'react';
import { Link } from 'react-router-dom'; // <Link to="url"> == <a href="url">
import styled from 'styled-components';
// a태그의 기본 속성은 페이지를 새로 고침하기때문에
// react app이 지니고 있는 상태들도 초기화 되고
// 렌더링된 컴포넌트도 모두 사라지고 새로 렌더링을 하게 됨
// Link component는 HTML5 History API를 사용하여 브라우저의 주소만 바꿀뿐,
// 페이지를 새로 불러오지는 않음
// 출처 : https://velog.io/@bigbrothershin/React-Router

const Container = styled.div`
  height: 380px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  /* overflow: hidden; */
  border-radius: 7px;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

const Movie = ({ id, bg, isLiked }) => {
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <button>{isLiked ? 'Unlike' : 'like'}</button>
    </Container>
  );
};

export default Movie;
