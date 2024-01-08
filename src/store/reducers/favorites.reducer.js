const { favoritesTypes } = require("../types");
const { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, GET_FAVORITES, IS_FAVORITE} = favoritesTypes;

const initialState = {
    favoritePlaces: [],
    total: 0,
};

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_FAVORITES:
            const isPlaceAlreadyAdded = state.favoritePlaces.some(place => place.id === action.item.id);
            return isPlaceAlreadyAdded ? state : { ...state, favoritePlaces: [...state.favoritePlaces, action.item], total: state.total + 1 };
        case REMOVE_FROM_FAVORITES:
            return {
                ...state,
                favoritePlaces: state.favoritePlaces.filter((place) => place.id !== action.id),
            };
        case GET_FAVORITES:
            return {
                ...state,
                favoritePlaces: state.favoritePlaces,
            };
        case IS_FAVORITE:
            return {
                ...state,
                favoritePlaces: state.favoritePlaces.filter((place) => place.id === action.id),
            };
        default:
            return state;
    }
}

export default favoritesReducer;