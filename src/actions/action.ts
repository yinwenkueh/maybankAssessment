export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_SELECTED_LOCATION = 'SET_SELECTED_LOCATION';

interface SetSearchResultsAction {
  type: typeof SET_SEARCH_RESULTS;
  payload: {
    description: string;
    placeId: string;
    lat: number;
    lng: number;
  };
}

interface SetSelectedLocationAction {
  type: typeof SET_SELECTED_LOCATION;
  payload: {
    description: string;
    placeId: string;
    lat: number;
    lng: number;
  };
}

export const setSearchResults = (data: { description: string; placeId: string , lat: number , lng: number}): SetSearchResultsAction => ({
  type: SET_SEARCH_RESULTS,
  payload: data,
});

export const setSelectedLocation = (data: { description: string; placeId: string , lat: number , lng: number}): SetSelectedLocationAction => ({
  type: SET_SELECTED_LOCATION,
  payload: data,
});
