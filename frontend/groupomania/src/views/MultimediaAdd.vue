<template>
<div id="multimediaAdd">
  <h1>Ajouter un sujet</h1>
  <form action="/api/multimedia" method="POST" enctype="multipart/form-data" >
  <label for="title">Titre</label>
  <input type="text" name="title" v-model="title">

  <label for="content">Ecrivez votre sujet</label>
  <input type="text" name="content" v-model="text">

  <label for="image">Ajouter une image</label>
  <input type="file" name="image" v-on:change="selectedFile($event)">
  </form>
  <button @click="createMultimedia()">Confirmer</button>
</div>  
</template>

<script>
export default {
name: 'MultimediaAdd',

methods: {
  selectedFile(event) {
      this.file = event.target.files[0]
    },
   createMultimedia: function() {
      const self = this;
      let user = JSON.parse(window.localStorage.getItem('user'))
      let formDataMultimedia = new FormData()
      formDataMultimedia.append('title', this.title)
      formDataMultimedia.append('text', this.text)
      formDataMultimedia.append('image', this.file)
      formDataMultimedia.append('userId', user.userId)
      this.$store.dispatch("createMultimedia", formDataMultimedia)
        .then(function() {
          self.$router.push("/multimedia");
        });
    },
},
}
</script>
