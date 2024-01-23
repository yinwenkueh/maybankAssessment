import { SET_SEARCH_RESULTS, SET_SELECTED_LOCATION } from '../actions/action';

interface AppState {
  searchResults: Array<{
    description: string;
    placeId: string;
    lat: number;
    lng: number;
  }>;
  selectedLocation: {
    description: string;
    lat: number;
    lng: number;
  } | null;
}

const initialState: AppState = {
  searchResults: [],
  selectedLocation: null,
};

type AppAction = SetSearchResultsAction | SetSelectedLocationAction;

export const appReducer = (state = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      if (!state.searchResults?.find((place) => place.placeId === action.payload.placeId)) {
           state.searchResults = state.searchResults ? [action.payload, ...state.searchResults] : [action.payload];
      }
      return {
        ...state,
        searchResults: state.searchResults,
      };
      case SET_SELECTED_LOCATION:
        return {
          ...state,
          selectedLocation: action.payload,
        };
    default:
      return state;
  }
};