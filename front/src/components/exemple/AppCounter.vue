<template>
  <div>
    <h1>Exemple de counter {{ counter }}</h1>
    <q-btn label="more" @click="increment" />
    <q-btn label="less" @click="decrement" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  count: Number,
});

const emit = defineEmits(["incremented"]);

const counter = ref(props.count);

const increment = () => {
  counter.value++;
  emit("incremented", counter.value);
};

const decrement = () => {
  counter.value--;
};
</script>
