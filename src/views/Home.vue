<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="load">
      <p v-if="!articles[0]">LOADING</p>
    </div>
    <div class="articles" v-for="article in articles" v-bind:key="article.id">
      <div>{{ article.timestamp }}</div>  
      <div>{{ article.title }}</div>
      <div>{{ article.body }}</div>  
    </div>
    <div><button @click='showModal'>Post Something</button></div>
    <div v-if='isAddingArticle == true' class='modal'>
      <div id="form">
        <div class="form">
          <label for="title">Title of Article</label>
          <input type="text" class="input" id='title' name='title' v-model="newArticle.title">
        </div>
        <div class="form">
          <label for="body">Article</label>
          <input type="text" class="input" id='body' name='body' v-model="newArticle.body">
        </div>
        <div><button @click="addNewArticle" id='post'>Post Article</button></div>
      </div>
    </div>
    
  </div>
</template>

<script>
const io = require('socket.io-client');

export default {
  name: 'Home',
  data(){
    return {
      socket: io('localhost:3000'),
      isConnected: false,
      isAddingArticle: false,
      articles: [],
      newArticle: {
        title: "",
        body: "",
        timestamp: Date.now()
      }
    }
  },
  methods: {
    showModal(){
      this.isAddingArticle = true;
    },
    addNewArticle(){
      this.socket.emit('addNewArticle', this.newArticle)
       this.isAddingArticle = false;
       this.newTitle = '';
       this.newBody = '';
    },
  },
  mounted(){
    this.socket.on('connect', function(){
      console.log("Connected to Web Socket");
    })
    this.socket.on('articlesUpdated', (results) => {
      console.log(results);
      this.articles = results;
    })
  }
}
</script>

<style lang="scss">

@keyframes spin{
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.load {
  animation: spin 3s infinite;
}
.modal {
  display: hiddden;
  width: 50%;
  height: 30%;
}
#form {
  width: 300px;
  margin-left: 80%;
}
.input{
  margin-top: 25px;
  border: 1px solid rgb(158, 158, 158);
  border-radius: 5px;
}
#post {
  margin-top: 20px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid #e1e4e8;
}
.form label {
  margin-right: 10px;
}
</style>
