<template>
    <aside class="sidebar">

        <button @click="$emit('openUser')" class="sidebar__profile sidebar__profile_green">
            {{ userLetter }}
        </button>

        <nav class="sidebar__menu">
            <router-link to="delivery" class="sidebar__menu-item" :active-class="activeLinkClass">
                <img src="@/assets/img/icon-assembly.svg" alt="Сборка" class="sidebar__menu-icon" />
                <img src="@/assets/img/icon-assembly_alt.svg" alt="Сборка" class="sidebar__menu-icon" />
                <span>Корзина</span>
            </router-link>
        </nav>
        <a @click="logout()" class="sidebar__exit">
            <img src="@/assets/img/icon-exit.svg" alt="Выход" />
            <img src="@/assets/img/icon-exit_white.svg" alt="Выход" />
        </a>
    </aside>
</template>
<script lang="ts">
import { sendLogout, useUser } from '../login/auth-api';
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Sidebar',
    emits: ['openUser'],
    setup() {
        const user = useUser();
        const router = useRouter();
        const userLetter = computed(() => user?.abbr);

        const logout = async () => {
            if (user) {
                await sendLogout(user.username);
            }
            router.push('/logout');
        };

        return {
            userLetter,
            logout
        };
    },
    data() {
        return {
            activeLinkClass: 'active'
        };
    }
});
</script>

<style lang="scss" scoped>
$accent: #30ba29;
$yellow: #ffdd1f;
$red: #ba0000;

.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 80px;
    padding: 16px 0 33px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    height: 100%;
    background: #ffffff;
    border-right: 1px solid #f0f0f0;
    z-index: 100;
    &__logo {
        margin-bottom: 40px;
        &-img {
            width: 33px;
        }
    }
    &__profile {
        font-weight: bold;
        font-size: 20px;
        font-feature-settings: 'pnum' on, 'lnum' on, 'liga' off, 'kern' off;
        text-decoration: none;
        color: #f9fafb;
        line-height: 39px;
        width: 39px;
        height: 39px;
        margin-bottom: 42px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        border: 0;
        transition: all 0.3s ease;
        cursor: pointer;
        &:hover,
        &:focus {
            background-color: #297525;
        }
        &_green {
            background: $accent;
        }
    }
    &__menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        &:hover {
            .sidebar__menu-item span {
                opacity: 1;
                visibility: visible;
                z-index: 1;
            }
        }
        &-item {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            width: 100%;
            transition: all 0.3s ease;
            &:hover {
                color: #fff;
                background-color: $accent;
                outline: none;
                img {
                    &:nth-child(1) {
                        opacity: 0;
                        visibility: hidden;
                    }
                    &:nth-child(2) {
                        opacity: 1;
                        visibility: visible;
                    }
                }
                span {
                    color: #fff;
                    background-color: $accent;

                    opacity: 1;
                    visibility: visible;
                    z-index: 1;
                }
            }
            img {
                position: absolute;
                top: 50%;
                right: 50%;
                transform: translate(50%, -50%);
                transition: all 0.3s ease;
                &:nth-child(1) {
                }
                &:nth-child(2) {
                    opacity: 0;
                    visibility: hidden;
                }
            }
            span {
                position: absolute;
                box-sizing: content-box;
                height: 50px;
                padding: 0 10px 0 0;
                left: 100%;
                padding: 0 12px;
                font-size: 14.5px;
                line-height: 51px;
                text-transform: uppercase;
                background-color: #f9fafb;
                color: #bfbfbf;

                opacity: 0;
                visibility: hidden;
                z-index: -1;

                transition: all 0.3s ease;
                img {
                    position: absolute;
                    top: 50%;
                    right: 50%;
                    transform: translate(50%, -50%);
                    transition: all 0.3s ease;
                    &:nth-child(1) {
                    }
                    &:nth-child(2) {
                        opacity: 0;
                        visibility: hidden;
                    }
                }
            }
            &:hover,
            &:focus {
                background-color: $accent;
                img {
                    &:nth-child(1) {
                        opacity: 0;
                        visibility: hidden;
                    }
                    &:nth-child(2) {
                        opacity: 1;
                        visibility: visible;
                    }
                }
            }
            &.active {
                color: #fff;
                background-color: $accent;
                outline: none;
                img {
                    &:nth-child(1) {
                        opacity: 0;
                        visibility: hidden;
                    }
                    &:nth-child(2) {
                        opacity: 1;
                        visibility: visible;
                    }
                }
            }
        }
    }
    &__exit {
        position: relative;
        margin-top: auto;
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        transition: all 0.3s ease;
        outline: 0;

        img {
            position: absolute;
            top: 50%;
            right: 50%;
            transform: translate(50%, -50%);
            transition: all 0.3s ease;
            &:nth-child(1) {
            }
            &:nth-child(2) {
                opacity: 0;
                visibility: hidden;
            }
        }

        &:hover,
        &:focus {
            cursor: pointer;
            background-color: $accent;
            img {
                &:nth-child(1) {
                    opacity: 0;
                    visibility: hidden;
                }
                &:nth-child(2) {
                    opacity: 1;
                    visibility: visible;
                }
            }
        }
    }
}
</style>
