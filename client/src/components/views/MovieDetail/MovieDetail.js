import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../commons/GridCards";
import { Row } from "antd";
import Favorite from "./Sections/Favorite";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`; // 배우 정보
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`; // 영화 정보

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovie(response); // movie api에서 가져온 정보를 state에 넣어줌
      })
      .catch((err) => {
        console.log("----fetch 에러----");
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        console.log("responseForCrew", response);
        setCasts(response.cast);
      });
  }, []);

  const toggleActorView = () => {
    // actorToggle 버튼 클릭이벤트
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/*header*/}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />
      {/*body*/}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem("userId")} />
        </div>
        {/* movie info */}
        <MovieInfo movie={Movie} />
        <br />
        {/* actors grid */}
        <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
          <button onClick={toggleActorView}> Toggle Actor View</button>
        </div>

        {ActorToggle && ( // actorToggle이 참일때만 배우 리스트가 보이도록
          <Row gutter={[60, 16]}>
            {Casts &&
              Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                    // movieId={cast.id}
                    characterName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
