import {
    SET_AUTHENTICATION,
    SET_USERNAME,
    SET_USER_ID,
    SET_AUTH_TOKEN
} from "../storeconstants";

export default {

    [SET_AUTHENTICATION](state, authenticated) {
        state.authenticated = authenticated
    },

    [SET_USERNAME](state, username) {
        state.username = username
    },

    [SET_USER_ID](state, user_id) {
        state.user_id = user_id
    },

    [SET_AUTH_TOKEN](state, auth_token) {
        state.auth_token = auth_token
    },
}