<template>
<div>
  <h1>Mon commentaire</h1>
  <div>
    <p> {{comment.text}} </p>
  </div>
  <form  action="/api/subject"  method="PUT" enctype="multipart/form-data">
    <label for="text">Modifier mon commentaire</label>
    <input type="text" v-model="text" name="text">
    <div v-if="comment.image != null">
      <label for="image">Modifier une image ou un gif</label>
      <input type="file" name="image" v-on:change="selectedFile($event)">
    </div>
  </form>  
  <button @click="cancel()">Retour</button>
  <button @click="modifyComment()">Confirmer</button>
  <button @click="deleteComment()">Supprimer</button>
</div>
</template>

<script>

import { mapState } from "vuex";

export default {
  name: "Comment",
  props: ["id"],

  mounted: function() {
    this.$store.dispatch("getComment",);
  },
  computed: {
    ...mapState({
      comment: "commentInfos",
     
    }),
  },
    
    methods: {
      selectedFile(event) {
      this.file = event.target.files[0]
    },
      modifyComment: function () {
      const self = this
      let FormDataCommentModify = new FormData()
      FormDataCommentModify.append('text', this.text)
      FormDataCommentModify.append('image', this.file)

      this.$store.dispatch('modifyComment', FormDataCommentModify)
      .then(function () {
        self.$router.push('/')
      })
    },
    cancel: function () {
      const self = this
      self.$router.push('/')
    },
    deleteComment: function() {
      const self = this
      this.$store.dispatch('deleteComment')
      .then(function () {
        self.$router.push('/')
      })
    }

    }
}
</script>
