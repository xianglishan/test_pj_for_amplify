<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <h1>Hello World from me</h1>
  <div>
    <h1>TodoApp</h1>
    <v-text-field v-model="name" label="Name"></v-text-field>
    <v-text-field v-model="description" label="Description"></v-text-field>
    <v-btn @click="createTodo">Create</v-btn>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.name }} : {{ todo.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
