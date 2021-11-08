<template>
<div>
  <h1>Mon commentaire</h1>
  <div>
    <p> {{comment.text}} </p>
  </div>
  <label for="text">Mon commentaire</label>
  <input type="text" v-model="text" name="text">
  <button @click="cancel()">Retour</button>
  <button @click="modifyTextComment()">Confirmer</button>
  <button @click="deleteComment()">Supprimer</button>
</div>
</template>

<script>

import { mapState } from "vuex";

export default {
  name: "Comment",
  props: ["id"],

  mounted: function() {
    this.$store.dispatch("getTextComment",);
  },
  computed: {
    ...mapState({
      comment: "commentTextInfos",
     
    }),
  },
    
    methods: {
      modifyTextComment: function () {
      const self = this
      this.$store.dispatch('modifyTextComment', {
        text: this.text,
         
      }).then(function () {
        self.$router.push('/texte')
      })
    },
    cancel: function () {
      const self = this
      self.$router.push('/texte')
    },
    deleteComment: function() {
      const self = this
      this.$store.dispatch('deleteTextComment')
      .then(function () {
        self.$router.push('/texte')
      })
    }

    }
}
</script>
