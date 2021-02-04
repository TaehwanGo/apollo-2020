import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:4000/', // graphql api 프로젝트에서 만든 서버 주소
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      // 지금 이렇게 작성하는게 graphQL 서버(backend) 구조와 매우 비슷 함
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        // likeMovie 함수를 만들었음
        // console.log(`apollo.js:likeMovie:isLiked:${isLiked}, id:${id}`); // isLiked만 왜 undefined 이지? <- Movie.js에서 mutation(query)문을 작성할때 안념겨 줬기 때문
        cache.writeData({
          id: `Movie:${id}`,
          data: {
            isLiked: !isLiked,
          },
        });
      },
    },
  },
});

export default client;
