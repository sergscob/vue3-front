import store from '../store';
import router from '../router';

const API_HOST = process.env.VUE_APP_API_HOST;
const API_URL = process.env.VUE_APP_API_URL;

function updateOptions(options: RequestInit | undefined) {
    const update = { ...options };
    if (isAuth()) {
        update.headers = {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            Authorization: 'Bearer ' + getAuthToken(),
            //'X-RSV-Locale': store.getters.GET_LOCALE,
            ...update.headers
        };
    }
    return update;
}

export const authFetch = (url: RequestInfo, options: RequestInit | undefined): Promise<Response> => {
    return fetch(API_HOST + API_URL + url, updateOptions(options)).then((res) => {
        if (res.status === 403) {
            if (store) {
                store.state.isDenied = true;
            }
        } else if (res.status === 401) {
            console.log('[ERROR]', 401);
            router.push('logout');
        } else if (res.status >= 500) {
            console.log('[ERROR]', res.status, res.statusText);
        }
        return res;
    });
};

export const isAuth = (): boolean => {
    return !!localStorage.getItem('token');
};

export const clearAuth = (): void => {
    localStorage.removeItem('token');
    console.log('clearAuth');
};

export const setAuthToken = (token: string): void => {
    localStorage.setItem('token', token);
    console.log('setAuth', localStorage.getItem('token'));
};

export const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
};
