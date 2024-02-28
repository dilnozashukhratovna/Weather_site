<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style lang="scss">
body {
  font-family: var(--body-font);
  background-color: #31255a;
  background-image: url("./src/assets/images/wallpaperflare.com_wallpaper\ copy\ 3.jpg");
  background-repeat: repeat-y;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  z-index: -1;
}
</style>
