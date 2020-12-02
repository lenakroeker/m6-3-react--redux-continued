const initialState = {
  currentArtist: null,
  status: "idle",
};

export default function artistReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ARTIST": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ARTIST": {
      console.log(action);
      return {
        ...state,
        currentArtist: {
          profile: action.currentArtist,
        },
        status: "idle",
      };
    }
    case "RECEIVE_ARTIST_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    default: {
      return state;
    }
  }
}
