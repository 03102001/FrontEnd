import { USER_LOGIN, USER_LOGOUT } from './constants';

export function userLogin(token, user) {
    return {
        type: USER_LOGIN,
        token,
        user,
    };
}

export function userLogout() {
    localStorage.removeItem('auth');
    return {
        type: USER_LOGOUT,
    };
}