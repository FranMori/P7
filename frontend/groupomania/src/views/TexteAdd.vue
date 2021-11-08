<template>
<div id="texteAdd">
  <h1>Ajouter un sujet</h1>
  <form method="POST">
  <label for="title">Titre</label>
  <input v-model="title" type="text" name="title">

  <label for="content">Ecrivez votre sujet</label>
  <input v-model="text" type="text" name="text">
  </form>
  
  <button @click="createTextSubject()">Créer</button>
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
  methods : {
    createTextSubject: function () {
      const self = this
      let user = JSON.parse(window.localStorage.getItem('user'))
      this.$store.dispatch('createTextSubject', {
        title: this.title,
        text: this.text,
        userId: user.userId
      })
      .then(function () {
        self.$router.push('/texte')
      })
    }
  }
}
</script>
