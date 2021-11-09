<template>
<div id="subjectInfos">
    <div v-if="texte() === true">
    <SubjectText />
    </div>
    <div v-else> 
    <SubjectMultimedia />
    </div>
  </div>
</template>

<script>
import SubjectText from '../components/SubjectText.vue'
import SubjectMultimedia from '../components/SubjectMultimedia.vue'

export default{
name : 'Texte',
components: {
  SubjectText,
  SubjectMultimedia
},
methods: {
  texte: function() {
    if (window.location.href === 'http://localhost:8080/texte' )
    {
    return true
    } else {
      return false
    }
  }
}

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