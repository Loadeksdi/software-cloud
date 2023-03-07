<script setup lang="ts">
import { ref, onMounted } from "vue"
const todoList = ref()
const newTask = ref("")

onMounted(() => {
  fetchTodos()
})

function fetchTodos(){
  fetch(`/api/todos`).then(function(response) {
    return response.json();
  }).then(function(data) {
    todoList.value = data
  }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function addTask(){
  fetch(`/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body : JSON.stringify({
      title: newTask.value,
      completed: false
    })
  }).then(function(){
    console.log("add done")
    fetchTodos()
  })
}

function updateTask(todo: any){
  fetch(`/api/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body : JSON.stringify({
      completed: !todo.completed
    })
  }).then(function(){
    console.log("update done")
  })
}

function deleteTask(todo: any){
  fetch(`/api/todos/${todo.id}`, {
    method: "DELETE"
  }).then(function(){
    console.log("delete done")
    fetchTodos()
  })
}
</script>

<template>
  <div v-for="todo in todoList">
    <input type="checkbox" :checked="todo.completed" @click="updateTask(todo)">
    {{ todo.title }}
    <button @click="deleteTask(todo)">x</button>
  </div>
  <form @submit.prevent="addTask()">
    <input v-model="newTask" type="text"/>
    <button type="submit">Add</button>
  </form>
</template>