<template>
<div id="subjectInfos">
  <h1>Forum Texte</h1>

    <button> <router-link to='/texte/add'> Créer un sujet </router-link></button>

  <table id="core">
    <caption>Liste des sujets textuels</caption>
    <tr class="title">
      <th scope="col">Sujet</th>
      <th scope="col">Réponses</th>

    </tr>
    <div v-for="subject in subjects" :key="subject.id">
    <tr class="subjectInfos">
      <td> <router-link :to="{name: 'TexteMessage', params: {id : subject.id}}"> {{subject.title}} </router-link> </td> 
      <td> 8</td>
      
    </tr>
    </div>
  </table>
  </div>
</template>

<script>

export default{
name : 'Texte',
props: {
subject: Object
},

computed:  {
  subjects(){
      return this.$store.getters.subjects
    }
},
mounted: function() {
  this.$store.dispatch('getSubjectInfos')
},

}
</script>

<style scoped>
#core {
  width: 90%;
  text-align: center;
  margin: auto;
}

#core td {
  border: 1px solid black;
  border-collapse: collapse;
}

.title {
  background-color: lightgrey;
}
</style>