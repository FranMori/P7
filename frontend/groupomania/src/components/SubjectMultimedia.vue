<template>
   <div>
      <h1>Forum Multimedia</h1>

    <button> <router-link to='/multimedia/add'> Créer un sujet </router-link></button>

  <table id="core">
    <caption>Liste des sujets multimedias</caption>
    <tr class="title">
      <th scope="col">Sujets</th>
    </tr>
    <div id="core" v-for="subject in subjects" :key="subject.id">
         <tr class="subjectInfos">
      <td class="title__subject" v-if="subject.image != null" > <router-link :to="{name: 'MultimediaMessage', params: {id : subject.id}}"> {{subject.title}} </router-link> </td> 
      
    </tr>
    </div>
   </table>
  </div>
</template>
<script>

export default {
 name: 'SubjectMultimedia',
 props: {
   subject: Object
   },
 computed:  {
  subjects(){
      return this.$store.getters.subjects
    }
},
mounted: function() {
  this.$store.dispatch('getAllSubjectInfos')
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
  color: #2f4f4f;
}

</style>