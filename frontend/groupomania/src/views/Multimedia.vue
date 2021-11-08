<template>
<div id="multimediaInfos">
  <h1>Forum Multimedia</h1>

    <button> <router-link to='/multimedia/add'> Créer un sujet </router-link></button>

  <table id="core">
    <caption>Liste des sujets Multimédias</caption>
    <tr class="title">
      <th class="title__sujet" scope="col1">Sujets</th>
      <th scope="col2">Réponses</th>
    </tr>
    <tr class="multimedia__infos">
     <div v-for="multimedia in multimedias" :key="multimedia.id">
      <td> <router-link :to="{name: 'MultimediaMessage', params: {id : multimedia.id}}"> {{multimedia.title}} </router-link> </td> 
      <td>8</td>
     </div>

    </tr>
  </table>
  </div>
</template>

<script>

export default{
name : 'Multimedia',
props: {
multimedia: Object
},

computed:  {
  multimedias(){
      return this.$store.getters.multimedias
    }
},
mounted: function() {
  this.$store.dispatch('getMultimediaInfos')
},

}
</script>

<style scoped>
#core {
  width: 90%;
  text-align: center;
  margin: auto;
  border-collapse: collapse;
}

#core td {
  border: 1px solid black;
  width: 100%;
  padding: 10px 0px;

}
th {
  padding: 20px 0px;
}
.title__sujet {
  border-right: 1px solid black;
}


.title {
  background-color: lightgrey;
  color: #2f4f4f;
}

</style>
