<template>
    <div class="loader-block">
        <div class="loader-icon">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Loader'
});
</script>

<style scoped lang="scss">
.loader-block {
    text-align: center;
    width: 100%;
    padding: 32px;
}

.loader-icon {
    --loader-bg: #d3d3d3;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    > div {
        display: inline-block;
        position: absolute;
        left: 8px;
        width: 16px;
        background: var(--loader-bg);
        animation: loader-icon 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        &:nth-child(1) {
            left: 8px;
            animation-delay: -0.24s;
        }
        &:nth-child(2) {
            left: 32px;
            animation-delay: -0.12s;
        }
        &:nth-child(3) {
            left: 56px;
            animation-delay: 0;
        }
    }
}
@keyframes loader-icon {
    0% {
        top: 8px;
        height: 64px;
    }
    50%,
    100% {
        top: 24px;
        height: 32px;
    }
}
</style>
