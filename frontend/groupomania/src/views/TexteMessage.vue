<template>
  <div>

    <!-- display -->

    <div v-if="mode === 'display'" class="sujet">
      <div class="sujet__auteur">
        <div class="sujet__auteur__image">
          <img :src="user.image" alt="Photo de profil">
        </div>
        <div class="sujet__auteur__description">
          <p> {{user.prenom}} {{user.nom}} </p>
        </div>
      </div>
      <div class="sujet__titre">
        <h1> {{subject.title}} </h1>
         <p> {{user.createdAt}} </p>

      </div>
    </div>
   <div class="core" v-if="mode ==='display'">
    <div v-if="subject.image != null">
      <img  :src='subject.image' alt="photo ou gif" />
    </div> 
    <p> {{subject.text}} </p>
    <div v-if="userId === subject.userId || user.modo === 1">
      <button @click="switchToModifySubject()">Modifier</button>
    </div>
    </div>

<!-- commentaires -->

    <div class="core__comment" v-for="comment in comments" :key="comment.id">
      <div v-if="mode === 'display'" class="sujet__auteur__commentaire" >
        <div class="sujet__auteur__image">
          <img :src="user.image" alt="Photo de profil">
        </div>
        <div class="sujet__auteur__description">
          <p> {{user.prenom}} {{user.nom}} </p>
          <p> {{user.createdAt}} </p>
        </div>
      </div>
      <div class="core__comment__texte">
        <div v-if="mode ==='display'">
        <div class="core__comment__image" v-if="comment.image != null">
      <img  :src='comment.image' alt="photo ou gif" />
      </div> 
    </div>
      <p v-if="mode === 'display'"> {{comment.text}} </p>
      </div>
     <div v-if="mode === 'display'">
      <div v-if="userId === comment.userId || user.modo === 1">
        <button> <router-link :to="{name: 'Comment', params: {id : comment.id}}"> Modifier </router-link></button>
      </div>  
      <div v-if="mode === 'modifyComment'">
        <input type="text" name="textComment" v-model="textComment">
      <button @click="deleteComment()">Supprimer</button>
      <button @click="modifyComment()">Confirmer</button>
      </div>
    </div>
    </div> 

    <!-- modify -->
    
    <form v-if="mode === 'modify'" action="/api/subject"  method="PUT" enctype="multipart/form-data">
      <label for="titlePut"> Modifier le titre </label>
      <input  type="text" name="titlePut" v-model="titlePut" :placeholder= 'subject.title'>

      <label for="textPut">Modifier le texte</label>
      <input  type="text" name="textPut" v-model="textPut" :placeholder= 'subject.text' >

      <div v-if="subject.image != null">
       <label for="image">Modifier l'image ou le gif</label>
       <input type="file" name="image" v-on:change="selectedFile($event)">
     </div>
    </form>

    <button v-if="mode === 'modify'" @click="modifySubject()">Confirmer</button>
    <button v-if="mode === 'modify'" @click="deleteSubject()">Supprimer</button>


    <!-- create comment -->

    <button @click='switchToCreateComment()' v-if="mode ==='display'">Ecrire un commentaire</button>
  <div v-if="mode ==='create'">
    <label for="textComment">Votre commentaire</label>
    <input type="text" name="textComment" v-model="textComment">

    <div v-if="subject.image != null">
      <label for="image">Ajouter une image ou un gif</label>
      <input type="file" name="image" v-on:change="selectedFile($event)">
    </div>

    <button @click='switchToDisplay(), createComment()'>Envoyer le commentaire</button>
    <button @click='switchToDisplay()' >Annuler</button>  
  </div>  
</div>
</template>

<script>

import {mapState} from 'vuex'

 
export default {

  name: 'TexteMessage',
  props:{ 
  id: Number,
  comment: Object,
  },
  data: function() {
    if(localStorage.getItem('user') != null) {
      let localStorageValue = localStorage.getItem("user")
      let localStorageValueParsed = JSON.parse(localStorageValue)
      let authorId = localStorageValueParsed.userId
        return {
          userId: authorId,
          mode: 'display'
              }
              }

  },
  mounted: function() {
      this.$store.dispatch('getSubject')
      this.$store.dispatch('getAllComments')
      this.$store.dispatch('getAuthor')

    },

    computed: {
      
    ...mapState({
      subject: 'subjectInfos',
      user: "userInfos"

    }),
    comments() {
      return this.$store.getters.comments
    }

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
    switchToModifySubject: function () {
      this.mode='modify'
    },
    switchToModifyComment: function () {
      this.mode='modifyComment'
    },
    modifySubject: function () {
      const self = this
      let formDataSubjectModify = new FormData()
      formDataSubjectModify.append('title', this.titlePut)
      formDataSubjectModify.append('text', this.textPut)
      formDataSubjectModify.append('image', this.file)

      this.$store.dispatch('modifySubject', formDataSubjectModify)
      .then(function () {
        self.$router.push('/')
      })
    },
    deleteSubject: function () {
      const self = this
      this.$store.dispatch('deleteSubject')
      .then(function () {
        self.$router.push('/')
      })
    },
    createComment: function () {
      const self = this
      const url = window.location.pathname.split('/')
    console.log(url[2])
    const subjectId = url[2]
     let user = JSON.parse(window.localStorage.getItem('user'))
     let formDataComment = new FormData()
     formDataComment.append('text', this.textComment)
     formDataComment.append('image', this.file)
     formDataComment.append('userId', user.userId)
     formDataComment.append('subjectId', subjectId)

      this.$store.dispatch('createComment', formDataComment)
      .then(function () {
        self.$router.push('/')
      })
    }
  },
  modifyComment: function () {
    const self = this
      this.$store.dispatch('modifyTextComment', {
        text: this.textComment,
        id: this.comment.id
      }).then(function () {
        self.$router.push('/')
      })
  },
   deleteComment: function () {
      const self = this
      this.$store.dispatch('deleteTextComment')
      .then(function () {
        self.$router.push('/')
      })
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

.commentaire {
 

}
.sujet__auteur {
  width: 30%;
 display: flex;
 border-right: 1px solid black;
 border-bottom: 1px solid black;

 
}
.sujet__titre {
  display: flex;
  width: 70%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 10%;
}
.sujet__auteur__image {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 50%;
}
.sujet__auteur__description {
  display: flex;
  align-items: center;
  justify-content: center;
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
  padding: 0% 5%;
}

.core__comment {
  border-bottom: 1px solid black;
}

.core img {
  width: 60%;
}

.core__comment__image img {
width: 60%;
}

.sujet__auteur__commentaire {
  width: 50%;
 display: flex;
 border-right: 1px solid black;
 border-bottom: 1px solid black;
  background-color: lightgrey;
  color: #2f4f4f;
  margin-bottom: 50px;
}

@media (min-width: 1250px)  {
  .core img {
  width: 40%;
}
.core__comment__image img {
width: 40%;
}
  
}
</style>