<template>
<div id="texteAdd">
  <h1>Ajouter un sujet</h1>
  <form action="/api/subject"  method="POST" enctype="multipart/form-data">

  <label for="title">Titre</label>
  <input type="text" v-model="title" name="title">

    <div v-if="multimedia() === true">
      <label for="image">Ajouter une image ou un gif</label>
      <input type="file" name="image" v-on:change="selectedFile($event)">
    </div>

  <label for="text">Ecrivez votre sujet</label>
  <input type="text" v-model="text"  name="text">

  </form>
  
  <button @click="createSubject()">Créer</button>
</div>  
</template>

<script>

export default {
  name: 'TexteAdd',
  data: function () {
    return {
      title: '',
      text: '',
    }
  },
  methods: {
    selectedFile(event) {
      this.file = event.target.files[0]
    },
    createSubject: function () {
      const self = this
      let user = JSON.parse(window.localStorage.getItem('user'))
      let formDataSubject = new FormData()
      formDataSubject.append('title', this.title)
      formDataSubject.append('text', this.text)
      formDataSubject.append('image', this.file)
      formDataSubject.append('userId', user.userId)
      this.$store.dispatch('createSubject', formDataSubject)
      .then(function () {
        self.$router.push('/')
      })
    },
    multimedia: function() {
    if (window.location.href === 'http://localhost:8080/multimedia/add' )
    {
    return true
    } else {
      return false
    }
  }
  }
}
</script>
