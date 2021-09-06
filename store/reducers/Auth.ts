import { LOCAL, SIGNUP, LOGIN, LOGOUT, GET, VIEW } from '../actions/Auth';
const initialState = {
    uid: '',
    data: {},
    userProfile: {},
    isloggedIn: false,
    isloggedout: false,
};

const AuthReducer = (state = initialState, action: Object | any) => {
    switch (action.type) {
        case LOCAL:
            return { ...state, uid: action.uid, isloggedIn: true };
        case SIGNUP:
            return { ...state, uid: action.uid };
        case LOGIN:
            return { ...state, uid: action.uid };
        case LOGOUT:
            return { ...state, uid: action.uid, isloggedout: true };
        case GET:
            return { ...state, data: action.details };
        case VIEW:
            return { ...state, userProfile: action.details };
        default:
            return state;
    }
};

export default AuthReducer;