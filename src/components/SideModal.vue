<template>
    <transition name="fade" appear>
        <div ref="modalback" class="aside-modal active" @click="closeModal($event)">
            <transition name="slide-right" appear>
                <div class="aside-modal__wrapper">
                    <div class="aside-modal__header">
                        <slot name="modal-header"></slot>
                    </div>
                    <slot name="modal-body"></slot>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'SideModal',
    emits: ['close'],
    setup(props, context) {
        const modalback = ref(null);

        const closeModal = ($event: MouseEvent) => {
            if ($event.target === modalback.value) {
                context.emit('close');
            }
        };

        return {
            modalback,
            closeModal
        };
    }
});
</script>

<style lang="scss">

$accent: #30ba29;

.aside-modal {
    position: fixed;
    top: 0;
    right: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.1);

    z-index: -1;
    opacity: 0;
    visibility: hidden;
    overflow-y: auto;
    overflow-x: hidden;
    transition: all 0.3s ease;

    &_user {
        width: auto;
        background-color: transparent;
    }

    &_statistic {
        .aside-modal__wrapper {
            overflow: visible;
        }
    }

    &__clients {
        padding: 25px 25px 30px 25px;
    }

    &.active {
        z-index: 100;
        opacity: 1;
        visibility: visible;
        .aside-modal__wrapper {
            right: 0;
        }
    }
    &__wrapper {
        position: relative;
        width: 680px;
        min-height: 100%;
        height: auto;
        overflow-y: auto;
        margin-left: auto;
        right: -15px;

        background: #fefefe;
        border-left: 1px solid #e4e1e0;
        box-shadow: 0px 20px 10px rgba(0, 0, 0, 0.14);
        transition: all 0.3s ease;
    }
    &__reports {
        padding: 25px 25px 30px 25px;
        &-actions {
            display: flex;
            align-items: center;
            margin-top: 40px;
        }
    }
    &__orders {
        padding: 25px 25px 30px 25px;
    }
    &__header {
        height: 85px;
        background: #f9fafb;
        border-bottom: 1px solid #e4e1e0;
        display: flex;
        align-items: center;
        padding: 0 20px;
    }
    &__title {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 14.3px;
        line-height: 21px;
        text-transform: uppercase;
        color: #72777a;
    }
    &__submit-button {
        outline: 0;
        border: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: $accent;
        border-radius: 22.5px;
        margin-left: auto;
        height: 45px;
        padding: 0 17px;

        font-size: 15.5px;
        line-height: 23px;
        color: #ffffff;
        transition: all 0.3s ease;
        &:hover,
        &:focus {
            background: #297525;
            cursor: pointer;
        }
    }
    &__title-img-wrapper {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin-right: 18px;
        border: 1px solid #e4e1e0;
        width: 39px;
        height: 39px;
        border-radius: 50%;
        cursor: pointer;
    }
    &__title-img {
        position: relative;
        pointer-events: none;
        transform: rotate(180deg);
    }
    &__map {
        margin: 30px 20px 10px 35px;
        background-color: #f3f3f3;
        height: 500px;
    }
    &__edit {
        padding: 25px 25px 25px 35px;
    }
    &__assembly {
        flex: 1 1 auto;
    }
    &__statistic {
        margin-bottom: 25px;
    }
    &__statistic-and-table {
        padding: 25px 25px 30px 25px;
    }
    &__edit-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    &__edit-col {
        display: flex;
        flex-direction: column;
    }
    &__clients {
    }
}

.fade-enter-active {
    transition: opacity 0.2s ease-out !important;
}
.fade-leave-active {
    transition: opacity 0.2s ease-in !important;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0 !important;
    right: 0;
}

.slide-right-enter-from,
.slide-right-leave-to {
    transform: translateX(100%) !important;
}
.slide-right-enter-to,
.slide-right-leave-from {
    transform: translateX(0) !important;
}
.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.1s ease-out !important;
}
</style>
