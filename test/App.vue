<script setup lang="ts">
import { useTemplateRef } from 'vue'

const buttonRef1 = useTemplateRef('buttonRef1')
const buttonRef2 = useTemplateRef('buttonRef2')
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 300px;
      margin: 100px auto;
    "
  >
    <input type="text" v-enterButton="buttonRef1" />
    <button
      @click="console.log('button1')"
      ref="buttonRef1"
      style="height: 20px"
    ></button>
    <input type="text" v-enterButton="buttonRef2" />
    <button
      @click="console.log('button2')"
      ref="buttonRef2"
      style="height: 20px"
    ></button>
  </div>
</template>
