import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  requestArtistInfo,
  receiveArtistInfo,
  receiveArtistInfoError,
} from "../../actions";
import { BsPlayFill } from "react-icons/bs";
import { fetchArtistProfile } from "../../helpers/api-helpers";

const ArtistRoute = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token);
  const { id } = useParams();

  // re-try once token
  useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(requestArtistInfo());
    fetchArtistProfile(accessToken, id)
      .then((data) => {
        dispatch(receiveArtistInfo(data));
      })
      .catch((err) => {
        dispatch(receiveArtistInfoError(err));
      });
  }, [accessToken]);

  const currentArtist = useSelector((state) => state.artists.currentArtist);

  const artistName = currentArtist ? currentArtist.profile.name : undefined;

  const genres = currentArtist
    ? currentArtist.profile.genres.slice(0, 2)
    : undefined;

  const numFollowers = currentArtist
    ? new Intl.NumberFormat("en", { notation: "compact" }).format(
        currentArtist.profile.followers.total
      )
    : undefined;

  let imageUrl;
  if (currentArtist && currentArtist.profile.images.length > 0) {
    imageUrl = currentArtist.profile.images[0].url;
  } else {
    imageUrl = undefined;
  }

  return currentArtist ? (
    <Wrapper>
      <Image src={imageUrl} />
      <Name>{artistName}</Name>
      <Followers>
        <FollowSpan>{numFollowers} </FollowSpan>
        {numFollowers == 1 ? "follower" : "followers"}
      </Followers>
      <TopTracks>top tracks</TopTracks>
      <PlayDiv>
        <Play>
          <BsPlayFill height={20} />
        </Play>
        <Play>
          <BsPlayFill height={20} />
        </Play>
        <Play>
          <BsPlayFill height={20} />
        </Play>
      </PlayDiv>
      <Tags>tags</Tags>
      <GenreDiv>
        <Genres>{genres[0]}</Genres>
        <Genres> {genres[1]}</Genres>
      </GenreDiv>
    </Wrapper>
  ) : (
    <p>Please wait...</p>
  );
};

const Wrapper = styled.div`
  text-align: center;
  background: black;
  color: white;
  width: 100vw;
  margin: auto;
  height: 100vh;
`;

const Name = styled.h1`
  font-size: 48px;
  font-weight: 700;
  text-shadow: 4px 8px 25px rgb(0, 0, 0, 1);

  text-shadow: 0px 4px 4px rgb(0, 0, 0, 0.5);

  text-shadow: 1px 2px 2px rgb(0, 0, 0, 0.75);
  position: fixed;
  width: 600px;
  margin-top: -80px;
  margin-left: calc(50vw - 300px);
`;

const Followers = styled.div`
  margin-top: 80px;
  font-weight: 600;
`;

const FollowSpan = styled.span`
  color: rgb(255, 79, 216, 1);
  font-weight: lighter;
`;

const TopTracks = styled.div`
  margin-top: 30px;
  font-weight: 600;
  font-size: 21px;
`;

const PlayDiv = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  margin: auto;
`;

const Play = styled.div`
  box-sizing: border-box;
  height: 42px;
  width: 42px;
  margin: 12px;
  background: rgba(75, 75, 75, 0.4);
  border-radius: 30px;
  font-size: 30px;
  padding: 7px;
`;

const Tags = styled.div`
  margin-top: 10px;
  font-weight: 600;
  font-size: 21px;
`;
const GenreDiv = styled.div`
  width: 400px;
  margin: auto;
  display: flex;
`;
const Genres = styled.div`
  /* GrayFade */
  width: 200px;
  padding: 10px;
  margin: 30px 20px;
  background: rgba(75, 75, 75, 0.4);
  border-radius: 4px;
`;

const Image = styled.img`
  margin-top: 30px;
  width: 175px;
  height: 175px;
  object-fit: cover;
  border-radius: 190.5px;
`;

export default ArtistRoute;
