<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>

  <hr>
  
  <h1>Hello World from me</h1>
  
  <div id="app">
  
    <hr>
  
    <div style="display: flex; justify-content: center; align-items: center;">
      <div>
        <h1>TodoApp</h1>
        <v-text-field v-model="name" label="Name"></v-text-field>
        <v-textarea v-model="description" label="Description" auto-grow></v-textarea>
        <v-btn @click="submit">Create</v-btn>
        <v-btn>Clear All</v-btn>
      </div>
    </div>

    <hr>
    <div>
      <h2>items</h2>
      <v-list three-line>
        <template v-for="(item, index) in items"  :key="index">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{item.name}} <small class="text-grey"> {{item.date}}</small></v-list-item-title>
              <div class="pl-3 mt-2" v-html="item.description"></div>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
        </template>
      </v-list>
    </div>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import dayjs from 'dayjs'
import { generateClient } from 'aws-amplify/api'
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import { onCreateTodo } from "./graphql/subscriptions";
dayjs.locale("ja");
const client = generateClient();

export default {
  name: 'App',
  data: () => ({
    name: "", 
    description: "", 
    items: undefined
  }), 
  mounted() {
    this.getData();
    this.registerSubscription()
  }, 
  methods: {
    submit() {
      this.postData();
    }, 
    clear() {
      this.name = ""
      this.description = ""
    }, 
    getData: async function () {
      // データ取得
      await client.graphql({ query: listTodos })
        .then((response) => {
          // 改行をタグに変換
          const items = response.data.listTodos.items.map( val => {
            val.description = val.description.replace(/\r?\n/g, '<br>')
            val.date = dayjs(val.createdAt).format('YYYY/MM/DD')
            return val
          })
          // テーブル表示
          this.items = items.sort((a,b)=> a.createdAt < b.createdAt ? 1 : -1)
        })
        .catch((error) => {
          // テーブルリセット
          console.error(error);
          this.items = []
        })
    }, 
    registerSubscription: async function (){
      // サブスクリプション登録
      await client.graphql(
        { query: onCreateTodo }
      ).subscribe({
        next: ({ data }) => {
          console.log(data)
          const res = data.onCreateTodo;
          const onCreateTodo = {
            ...res,
            description:res.description.replace(/\r?\n/g, '<br>'),
            date: dayjs(res.createdAt).format('YYYY/MM/DD')
          }
          this.items.unshift(onCreateTodo)
        }, 
        error: (error) => console.warn(error)
      })
    },
    postData: async function () {
      // オプション
      const myInit = {
        id: String(dayjs().format()),  
        name: String(this.name),
        description: String(this.description),
      };
      // データ登録
      await client.graphql({
        query: createTodo, 
        variables: { input: myInit }
      }).then((response) => {
          console.log(response);
          this.clear();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, 
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