import React, { useEffect } from "react";
import Axios from "axios";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.movieTitle;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  useEffect(() => {
    // 서버에 요청 필요. 데이터 가져올 때 원래 get쓰는데 몇개 안되니까 post로 함
    let variables = {
      userFrom,
      movieId,
      movieTitle,
      moviePost,
      movieRunTime,
    };
    console.log("---서버 연결 중---");

    Axios.post("/api/favorite/favoriteNumber", variables) // 임의로 api 링크 생성, 서버에 요청
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          // success가 true일 때
        } else {
          alert("숫자 정보를 가져오는데에 실패했습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("axios 실패");
      });

    Axios.post("/api/favorite/favorited", variables) // 임의로 api 링크 생성, 서버에 요청
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          // success가 true일 때
        } else {
          alert("좋아요 정보를 가져오는데에 실패했습니다.");
        }
      });
    console.log("----end----");
  }, []);

  return (
    <div>
      <button>Favorite</button>
    </div>
  );
}

export default Favorite;
