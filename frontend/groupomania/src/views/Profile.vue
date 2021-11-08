<template>
  <div>
    
    <div v-if="mode === 'profile'">
      <h1>Votre profil</h1>
      <div class="Profil__name">
        <h2>Prénom :</h2>
        <p>{{ user.prenom }}</p>
      </div>
      <div>
        <h2>Nom :</h2>
        <p>{{ user.nom }}</p>
      </div>
    <div>
      <h2>Email :</h2>
      <p>{{user.email }}</p>
    </div>
    <div>
      <h2>Photo de profil :</h2>
      <img  :src='user.image' alt="Photo de profil" />
    </div>
    <button v-if="mode === 'profile'" @click="switchToModifyProfile()">
      Modifier mon profil
    </button>
        </div>
        <div v-else>
          <h1>Modifier mon profil</h1>
      <form action="/profile" method="post" enctype="multipart/form-data">
        <input type="text" v-model="prenom" name="prenom" placeholder="prenom">
        <input type="text" v-model="nom" name="prenom" placeholder="nom">
        <input type="text" v-model="email" name="prenom" placeholder= 'email' >
        <input type="file" v-on:change="selectedFile($event)" name="image" placeholder='image'>


      </form>
          <button @click="modifyProfile()">Confirmer</button>
          </div>


  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Profile",
  props: ["id"],

  data() {
    return {
      mode: "profile",
    };
    
  },
  mounted: function() {
    this.$store.dispatch("getUser");
  },

  computed: mapState({
      user: "userInfos",
     
    }),
  

  methods: {
    switchToModifyProfile: function() {
      this.mode = "modify";
    },
    modifyProfile: function() {
      const self = this;
      let formData = new FormData()
      formData.append('prenom', this.prenom)
      formData.append('nom', this.nom)
      formData.append ('email', this.email)
      formData.append('image', this.file)
      this.$store.dispatch("modifyProfile", formData)
        .then(function() {
          self.$router.push("/");
        });
    },
    selectedFile(event) {
      this.file = event.target.files[0]
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0px;
}
</style>
