<script setup>
import { ErMessage } from "eric-ui";
function handleBtnClick() {
  ErMessage.info("btn click");
}
</script>

<template>
  <p>
    <cr-button @click="handleBtnClick"> with throttle</cr-button>
    <cr-button :use-throttle="false" @click="handleBtnClick"
      >without throttle</cr-button
    >
  </p>
</template>
