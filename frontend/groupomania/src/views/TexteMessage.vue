<template>
  <div>
    <div v-if="mode === 'display'" class="sujet">
      <div class="sujet__auteur">
        <div class="sujet__auteur__image">
          <img :src="user.image" alt="Photo de profil">
        </div>
        <div class="sujet__auteur__description">
          <p> {{user.prenom}} {{user.nom}} </p>
          <p> {{user.createdAt}} </p>
        </div>
      </div>
      <div class="sujet__titre">
        <h1> {{subject.title}} </h1>
      </div>
    </div>
   <div class="core" v-if="mode ==='display'">
    <p> {{subject.text}} </p>
    <button @click="switchToModifySubject()">Modifier</button>
    <button @click="deleteSubject()">Supprimer</button>
    </div>
    <div class="core__comment" v-for="comment in comments" :key="comment.id">
      <div v-if="mode === 'display'" class="sujet__auteur commentaire" >
        <div class="sujet__auteur__image">
          <img :src="user.image" alt="Photo de profil">
        </div>
        <div class="sujet__auteur__description">
          <p> {{user.prenom}} {{user.nom}} </p>
          <p> {{user.createdAt}} </p>
        </div>
      </div>
      <div class="core__comment__texte">
      <p v-if="mode === 'display'"> {{comment.text}} </p>
      </div>
      <div v-if="userId === comment.userId">
        <button> <router-link :to="{name: 'Comment', params: {id : comment.id}}"> Modifier </router-link></button>
      </div>  
      <div v-if="mode === 'modifyComment'">
        <input type="text" name="textComment" v-model="textComment">
      <button @click="deleteComment()">Supprimer</button>
      <button @click="modifyComment()">Confirmer</button>
      </div>
    </div>
    

    <input v-if="mode === 'modify'" type="text" name="title" v-model="title" :placeholder= 'subject.title'>
    <input v-if="mode === 'modify'" type="text" name="text" v-model="text" :placeholder= 'subject.text' >

    <button v-if="mode === 'modify'" @click="modifySubject()">Confirmer</button>

    <button @click='switchToCreateComment()' v-if="mode ==='display'">Ecrire un commentaire</button>

    <label v-if="mode === 'create'" for="textComment">Votre commentaire</label>
    <input v-if="mode === 'create'" type="text" name="textComment" v-model="textComment">
    <button @click='switchToDisplay(), createComment()' v-if="mode === 'create'">Envoyer le commentaire</button>
    <button @click='switchToDisplay()' v-if="mode === 'create'" >Annuler</button>  
  </div>
</template>

<script>
let localStorageValue = localStorage.getItem("user")
let localStorageValueParsed = JSON.parse(localStorageValue)
let authorId = localStorageValueParsed.userId
import {mapState} from 'vuex'

 
export default {

  name: 'TexteMessage',
  props:{ 
  id: Number,
  comment: Object,
  },
  data: function () {
    return {
    mode: 'display',
    userId: authorId
    }
  },
  mounted: function() {
      this.$store.dispatch('getTextSubject')
      this.$store.dispatch('getAllTextComments')
      this.$store.dispatch('getTextAuthor')

    },

    computed: {
      
    ...mapState({
      subject: 'textInfos',
      user: "userInfos"

    }),
    comments() {
      return this.$store.getters.comments
    }

  },

  methods: {
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
      this.$store.dispatch('modifyTextSubject', {
        title: this.title,
        text: this.text,
         
      }).then(function () {
        self.$router.push('/texte')
      })
    },
    deleteSubject: function () {
      const self = this
      this.$store.dispatch('deleteTextSubject')
      .then(function () {
        self.$router.push('/texte')
      })
    },
    createComment: function () {
      const self = this
      const url = window.location.href
      const subjectId = url.split('/texte/')[1]
     let user = JSON.parse(window.localStorage.getItem('user'))
      this.$store.dispatch('createTextComment', {
        textComment: this.textComment,
        userId: user.userId,
        subjectId: subjectId
      }).then(function () {
        self.$router.push('/texte')
      })
    }
  },
  modifyComment: function () {
    const self = this
      this.$store.dispatch('modifyTextComment', {
        textComment: this.textComment,
        id: this.comment.id
      }).then(function () {
        self.$router.push('/texte')
      })
  },
   deleteComment: function () {
      const self = this
      this.$store.dispatch('deleteTextComment')
      .then(function () {
        self.$router.push('/texte')
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
  background-color: lightgrey;
  color: #2f4f4f;

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
  padding: 0% 5%;
}

.core__comment {
  border-bottom: 1px solid black;
}
</style>