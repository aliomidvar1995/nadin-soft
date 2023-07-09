<template>
    <div class="dashboard-card">
        <a-card hoverable style="width: 360px">
            <template #cover>
            <img alt="example" src="../assets/house.jpg" />
            </template>
            <a-card-meta :title="message">
            <template #description>{{ time }}</template>
            </a-card-meta>
        </a-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref<string>('')

const time = ref<string>(new Date().toLocaleTimeString())

function setMessage(): void {
  if (
    new Date(0, 0, 0, 6, 0, 0).getHours() <= new Date().getHours() &&
    new Date().getHours() < new Date(0, 0, 0, 12, 0, 0).getHours()
  ) {
    message.value = 'Good morning'
  } else if (
    new Date(0, 0, 0, 12, 0, 0).getHours() <= new Date().getHours() &&
    new Date().getHours() < new Date(0, 0, 0, 16, 0, 0).getHours()
  ) {
    message.value = 'Good afternoon'
  } else if (
    new Date(0, 0, 0, 16, 0, 0).getHours() <= new Date().getHours() &&
    new Date().getHours() < new Date(0, 0, 0, 19, 0, 0).getHours()
  ) {
    message.value = 'Good evening'
  } else {
    message.value = 'Good night'
  }
}

setInterval(() => {
  time.value = new Date().toLocaleTimeString()
}, 1000)

setMessage()
</script>

<style>
.dashboard-card {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>