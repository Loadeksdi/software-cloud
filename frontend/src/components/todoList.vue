<script setup lang="ts">
import { ref } from "vue"
const todoList = ref()
todoList.value = [
  {
    id: "0",
    text: "Une action a réalisée",
  },
  {
    id: "1",
    text: "Une autre action a réalisée",
  },
  {
    id: "2",
    text: "Une action a réalisée",
  },
  {
    id: "3",
    text: "Une autre action a réalisée",
  },
]
</script>

<template>
  <ul>
    <li v-for="todo in todoList">
      {{ todo.text }}
    </li>
  </ul>
</template>