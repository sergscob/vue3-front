<template>
    <SideBar @openUser="showUserModal = true" />
    <div class="content">
        111
        <router-view />
        <PermissionDenied v-if="isDenied" />
    </div>
    <UserModal v-if="showUserModal" @close="showUserModal = false" />
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue';
import SideBar from '../sidebar/Sidebar.vue';
import UserModal from './UserModal.vue';
import PermissionDenied from './PermissionDenied.vue';
import { StateType } from '@/store';

export default defineComponent({
    name: 'LoggedInPage',
    components: {
        SideBar,
        UserModal,
        PermissionDenied
    },
    setup() {
        const showUserModal = ref(false);
        const store: { state: StateType } | undefined = inject('store');
        const isDenied = computed(() => store?.state.isDenied);

        return {
            isDenied,
            showUserModal
        };
    }
});
</script>
