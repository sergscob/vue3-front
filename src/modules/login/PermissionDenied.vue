<template>
  <div class="denied-block">
    <div class="denied-block__card">
      <div class="denied-block__card-block">
        <p class="denied-block__title">Недостаточно прав</p>
        <button class="actions__btn" @click="close()">OK</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { StateType } from "@/store";
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "PermissionDenied",
  setup(props, context) {
    const store: { state: StateType } | undefined = inject("store");

    const close = () => {
            if (store) {
                store.state.isDenied = false;
            }
        };

    return {
      close,
    };
  },
});
</script>
