import { reactive } from 'vue';
import { User } from '@/modules/login/auth-api';

export type StateType = { user: User | null; isDenied: boolean };

const state: StateType = reactive({
    user: null,
    isDenied: false
});

const userString = localStorage.getItem('user');
if (userString) {
    const user: User = JSON.parse(userString);
    state.user = user;
}

export default { state: state };
