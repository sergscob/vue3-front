<template>
    <SideModal @close="$emit('close')">
        <template v-slot:modal-header>
            <div class="aside-modal__title">
                <div @click="$emit('close')" class="aside-modal__title-img-wrapper">
                    <img
                        src="@/assets/img/icon-back_black.svg"
                        alt="Карточка пользователя"
                        class="aside-modal__title-img"
                    />
                </div>
                Карточка пользователя
            </div>
        </template>
        <template v-slot:modal-body>
            <div v-if="user" class="aside-modal__tables">
                <div class="table table_user-info">
                    <div class="table__head">
                        <div>Фамилия</div>
                        <div>Имя</div>
                        <div>Отчество</div>
                    </div>
                    <div class="table__body">
                        <form class="table__row">
                            <div>
                                {{ user.family_name }}
                            </div>

                            <div>
                                {{ user.first_name }}
                            </div>

                            <div>
                                {{ user.middle_name }}
                            </div>
                        </form>
                    </div>
                </div>

                <div class="table table_user-info">
                    <div class="table__head">
                        <div>Роли</div>
                        <div>Телефон</div>
                        <div>E-mail</div>
                    </div>
                    <div class="table__body">
                        <div class="table__row">
                            <div class="table__array">
                                <!-- <span v-for="(role, i) in user.roles" v-bind:key="i">{{ getRoleByValue(role)?.title || role }}</span> -->
                            </div>
                            <div>{{ user.phone }}</div>
                            <div>{{ user.email }}</div>
                        </div>
                    </div>
                </div>

                <div class="table table_user-info">
                    <div class="table__head">
                        <div>Partner ID</div>
                    </div>
                    <div class="table__body">
                        <div class="table__row">
                            <div>{{ user.partner_id }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </SideModal>
</template>

<script lang="ts">
import { useUser } from './auth-api';
//import { useRoles } from '@/utils/employees/roles-api';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UserModal',
    emits: ['close'],
    setup(props, context) {
        //const {data: allRoles, getRoleByValue} = useRoles();
        const user = useUser();

        const close = () => {
            context.emit('close');
        };

        return {
            //allRoles,
            user,
            close
            //getRoleByValue
        };
    }
});
</script>
