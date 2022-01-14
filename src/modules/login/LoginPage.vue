<template>
    <div class="container py-5 py-lg-7">
        <div class="row">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto">
                <h3 class="mb-5 text-center" style="margin-bottom: 1rem !important">{{ $t('auth.signin') }}</h3>
                <Loader v-if="isLoading" />
                <form method="POST" @submit.prevent="callLogin" class="auth__form" v-else>
                    <div class="auth__group">
                        <img src="@/assets/img/icon-user.svg" alt="Логин" class="auth__icon" />
                        <input v-model="state.username" :placeholder="$t('auth.yemail')" class="auth__input" required />
                    </div>
                    <div class="auth__group">
                        <img src="@/assets/img/icon-lock.svg" alt="Пароль" class="auth__icon" />
                        <input v-model="state.password" :placeholder="$t('auth.ypassword')" type="password" class="auth__input" required />
                    </div>
                    <button class="btn auth__btn btn_full">{{ $t('auth.signin_button') }}</button>
                    <div v-if="errorMessage" class="auth__error">
                        <p>{{ errorMessage }}</p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Ref, ref } from '@vue/reactivity';
import { useRouter, useRoute } from 'vue-router';
import { useLogin } from './auth-api';
import { defineComponent, inject } from 'vue';
import { StateType } from '@/store';

export default defineComponent({
    name: 'LoginPage',
    setup() {
        const { error, isLoading, login } = useLogin();
        const state = ref({ username: '', password: '' });
        const errorMessage: Ref<string | null> = ref('');
        const router = useRouter();
        const route = useRoute();

        const store: { state: StateType } | undefined = inject('store');

        const callLogin = async () => {
            await login(state.value.username, state.value.password);
            const redirect = route.query['redirect'];

            if (!error.value) {
                if (typeof redirect === 'string') {
                    router.push(redirect);
                } else {
                    router.push('/');
                }
            }
            errorMessage.value = error.value ?? '';
        };

        return {
            state,
            errorMessage,
            isLoading,
            callLogin
        };
    }
});
</script>

<style lang="scss" scoped>
.auth {
    background-color: #fff;
    width: 100vw;
    height: 100vh;
    &__wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 122px 20px 0;
    }
    &__logo {
        width: auto;
        height: 159px;
        margin-bottom: 57px;
    }
    &__card {
        width: 306px;
        background: #f9fafb;
        border: 1px solid #f0f0f0;
        border-radius: 15px;
        padding: 35px 20px;
    }
    &__title {
        font-size: 18px;
        line-height: 27px;
        margin-bottom: 24px;
        text-align: center;
        text-transform: uppercase;
        color: #000000;
    }
    &__form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    &__group {
        position: relative;
        margin-bottom: 15px;
        width: 100%;
        height: 41px;
    }
    &__error {
        color: #979692;
        text-align: center;
        width: 100%;
        margin-top: 10px;
    }
    &__icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 12px;
    }
    &__input {
        width: 100%;
        height: 100%;
        background: #ffffff;
        border: 1px solid #f0f0f0;
        border-radius: 21px;

        text-align: center;
        font-size: 14.5px;
        line-height: 21px;
        color: #979692;
        &::placeholder {
            font-size: 14.5px;
            line-height: 40px;
            color: #979692;
        }
        &:focus {
            outline: 0;
            border: 1px solid #999999;
        }
    }
    &__btn {
    }
    &__link {
        font-size: 14px;
        line-height: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6f873d;
        text-decoration: none;
        text-transform: uppercase;
    }
}
</style>
