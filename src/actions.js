export const requestAccessToken = () => ({
  type: "REQUEST_ACCESS_TOKEN",
});

export const receiveAccessToken = (token) => ({
  type: "RECEIVE_ACCESS_TOKEN",
  token,
});

export const receiveAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
});

//artist

export const requestArtistInfo = () => ({
  type: "REQUEST_ARTIST",
});

export const receiveArtistInfo = (currentArtist) => ({
  type: "RECEIVE_ARTIST",
  currentArtist,
});

export const receiveArtistInfoError = () => ({
  type: "RECEIVE_ARTIST_ERROR",
});
