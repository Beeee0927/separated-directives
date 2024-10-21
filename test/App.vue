<script setup lang="ts">
import { useTemplateRef } from 'vue'

const buttonRef1 = useTemplateRef('buttonRef1')
const buttonRef2 = useTemplateRef('buttonRef2')
</script>

<template>
  App
  <input type="text" v-x="buttonRef1" />
  <button @click="console.log(111)" ref="buttonRef1"></button>
  <input type="text" v-x="buttonRef2" />
  <button @click="console.log(222)" ref="buttonRef2"></button>
  <button></button>
</template>

<style scoped></style>
