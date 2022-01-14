import { CommonReturnType } from '../utils';
import { inject, Ref, ref } from 'vue';
import { StateType } from '@/store';
import { setAuthToken } from '../api';

const API_HOST = process.env.VUE_APP_API_HOST;
const API_URL = process.env.VUE_APP_API_URL;

export type LoginReturnType = {
    token: string;
};

export type User = {
    username: string;
    first_name: string;
    middle_name: string;
    family_name: string;
    abbr: string;
    phone: string;
    email: string;
    partner_id: string;
    roles: string[];
    warehouses: number[];
    uuid: string;
};

export const sendLogout = async (username: string): Promise<CommonReturnType> => {
    const res = await fetch(API_HOST + API_URL + 'logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username
        })
    });

    return await res.json();
};

export const useLogin = () => {
    const isLoading = ref(false);
    //const user: Ref<User | null> = ref(null);
    const error: Ref<string | null> = ref(null);
    //const token: Ref<string | null> = ref(null);

    const login = async (username: string, password: string) => {
        isLoading.value = true;

        const res = await fetch(API_HOST + API_URL + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: username,
                password
            })
        });
        const data = await res.json();

        isLoading.value = false;

        if (!data.error) {
            setAuthToken(data.token);
        } else {
            error.value = data.error;
        }
    };

    return { error, isLoading, login };
};

export function useUser(): User | null | undefined {
    const store: { state: StateType } | undefined = inject('store');
    if (!store?.state.user) {
        //router.push('/logout');
    }

    return store?.state.user;
}
