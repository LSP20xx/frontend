import { userTypes } from "../types/user.types";
const { GET_USER, ADD_USER, SET_USER_IMAGE } = userTypes;

const initialState = {
    user: null,
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                user: action.item,
            }
        case ADD_USER:
            return {
                ...state,
                user: action.item,
            }
        case SET_USER_IMAGE:
            return {
                ...state,
                user: {
                    ...state.user,
                    image: action.item,
                }
            }
        default:
            return state;
    }
}

export default userReducer;