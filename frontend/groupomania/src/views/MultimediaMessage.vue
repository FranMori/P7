<template>
  <div>
   <div v-if="mode === 'display'" class="sujet">
      <div class="sujet__auteur"> 
        <div class="sujet__auteur__image">
         <img  :src='user.image' alt="Photo de profil" />
        </div> 
        <div class="sujet__auteur__description">
         <p> {{user.prenom}} {{user.nom}}</p>
         <p> {{user.createdAt}} </p>
        </div>
      </div>

      <div class="sujet__titre">
          <h1> {{multimedia.title}} </h1>
     </div>
    </div>  
    <div class="core" v-if="mode === 'display'">
      <img class="sujet__image"  :src='multimedia.image' alt="Photo ou gif" />
            <p> {{multimedia.text}} </p>
            <button @click="switchToModifyMultimedia()">Modifier</button>
      <button @click="deleteMultimedia()">Supprimer</button>
           </div>
     

     <div v-if="mode === 'display'">   

        <div v-for="commentMulti in commentMultis" :key="commentMulti.id">
          <p> Salut </p>
          <img :src='commentMulti.image' alt="Photo ou gif">
            <div v-if="userId === commentMulti.userId">
              <button> <router-link :to="{name: 'CommentMulti', params: {id : commentMulti.id}}"> Modifier </router-link></button>
            </div> 
        </div>  
 

      
    </div>
    
    <form v-if="mode === 'modify'" action="/api/multimedia" method="POST" enctype="multipart/form-data" >
    <input type="text" name="title" v-model="title">
    <input type="text" name="text" v-model="text" >
    <input type="file" name="image" v-on:change="selectedFile($event)">
    </form>
    <button>Retour</button>
    <button v-if="mode === 'modify'" @click="modifyMultimedia()">Confirmer</button>

    <button @click='switchToCreateComment()' v-if="mode ==='display'">Ecrire un commentaire</button>
  <div v-if="mode === 'create'">
    <label  for="commentaire">Votre commentaire</label>
    <input  type="text" name="commentaire" v-model="commentaire">
    <label for="image">Ajouter une image</label>
    <input type="file" name="image" v-on:change="selectedFile($event)"> 
    <button @click=' createMultimediaComment(), switchToDisplay()' >Envoyer le commentaire</button>
    <button @click='switchToDisplay()'>Annuler</button>  
  </div>  
  </div>
</template>

<script>
let localStorageValue = localStorage.getItem("user")
let localStorageValueParsed = JSON.parse(localStorageValue)
let authorId = localStorageValueParsed.userId
  import {mapState} from 'vuex'

 
export default {

  name: 'MultimediaMessage',
  props:{ 
  id: Number,
  commentMulti: Object,
  },
  data: function () {
    return {
    mode: 'display',
    userId: authorId,

    }
  },
  mounted: function() {
      this.$store.dispatch('getMultimedia')
      this.$store.dispatch('getAllMultiComments')
      this.$store.dispatch('getMultimediaAuthor')

    },

    computed: {

       commentMultis() {
      return this.$store.getters.commentMultis
    },

    ...mapState({
      multimedia: 'multimediaSubjectInfos',
      user: "userInfos"


    }),
   

  },

  methods: {
    selectedFile(event) {
      this.file = event.target.files[0]
    },
    switchToCreateComment: function () {
      this.mode= 'create'
    },
    switchToDisplay: function () {
      this.mode= 'subject'
    },
    switchToModifyMultimedia: function () {
      this.mode='modify'
    },
    modifyMultimedia: function () {
      const self = this;
      let formDataMultimedia = new FormData()
      formDataMultimedia.append('title', this.title)
      formDataMultimedia.append('text', this.text)
      formDataMultimedia.append('image', this.file)
      this.$store.dispatch("modifyMultimedia", formDataMultimedia)
        .then(function() {
          self.$router.push("/multimedia");
        });
    },
    deleteMultimedia: function () {
      const self = this
      this.$store.dispatch('deleteMultimedia')
      .then(function () {
        self.$router.push('/multimedia')
      })
    },
    createMultimediaComment: function() {
      const self = this;
      const url = window.location.href
      const multimediaId = url.split('/multimedia/')[1]
      let user = JSON.parse(window.localStorage.getItem('user'))
      let formDataComment = new FormData()
      formDataComment.append('text', this.commentaire)
      formDataComment.append('image', this.file)
      formDataComment.append('userId', user.userId)
      formDataComment.append('multimediaId', multimediaId)
      this.$store.dispatch("createMultimediaComment", formDataComment)
        .then(function() {
          self.$router.push("/multimedia");
        });
    },
  },
}
</script>

<style scoped>
.sujet {
  background-color: lightgrey;
  color: #2f4f4f;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;

}

.sujet__auteur {
  width: 30%;
 display: flex;
 border-right: 1px solid black;
 
}
.sujet__titre {
  display: flex;
  width: 70%;
  justify-content: left;
  padding-left: 10%;
}
.sujet__auteur__image {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 50%;
}
.sujet__auteur__description {
  display: flex;
  align-items: flex-start;
  width: 50%;
  flex-flow: column wrap;
  padding-left: 10px;
}

.sujet__auteur__image img {
  max-width: 100%;
}
.sujet__description h1 {
  font-size: 25px;
  margin: 0px;
}
.sujet__image {
  max-width: 80%;
}

/* sujet */
.core {
  border-bottom: 1px solid black;
}

</style>
