import React from 'react';
import { Link } from 'react-router-dom'; // <Link to="url"> == <a href="url">
// a태그의 기본 속성은 페이지를 새로 고침하기때문에
// react app이 지니고 있는 상태들도 초기화 되고
// 렌더링된 컴포넌트도 모두 사라지고 새로 렌더링을 하게 됨
// Link component는 HTML5 History API를 사용하여 브라우저의 주소만 바꿀뿐,
// 페이지를 새로 불러오지는 않음
// 출처 : https://velog.io/@bigbrothershin/React-Router

const Movie = ({ id }) => {
  return (
    <div>
      <Link to={`/${id}`}>{id}</Link>
    </div>
  );
};

export default Movie;
