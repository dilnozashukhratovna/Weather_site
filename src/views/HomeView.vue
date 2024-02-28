<template>
  <div>
    <Navbar></Navbar>
    <Menu></Menu>
    <Main></Main>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import Menu from "../components/Menu.vue";
import Main from "../components/Main.vue";
import { onMounted } from "vue";
import { useStore } from "../store/store";
const store = useStore();

onMounted(() => {
  store.getData();
});
</script>

<style lang="scss" scoped></style>
