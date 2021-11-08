<template>
  <div id="app">
    <header id="header">
      <img
        id="logo"
        src="./assets/icon-left-font-monochrome-white.png"
        alt="Logo blanc Groupomania"
      />
    </header>
    <nav id="nav">
      <div class="nav__connected" v-if="currentUser" >
      <router-link  to="/">Accueil</router-link>
       <router-link :to="{name: 'Profile', params: {id : userId}}" > Mon profil</router-link>
       <button @click="logout()">Déconexion</button>
      </div>
      <div class="nav__disconnected" v-if="!currentUser">
      <router-link  to="/inscription"  >Inscription</router-link>
      <button><router-link  to="/connexion" >Connexion</router-link></button>
      </div>
      
    </nav>
    <router-view />
  </div>
</template>

<script>
let localStorageValue = localStorage.getItem("user")
let localStorageValueParsed = JSON.parse(localStorageValue)
let userId = localStorageValueParsed.userId

export default {
  name: "App",
  data: function() {
    return {
      userId: userId
    };

  },

  computed:{
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    logout: function() {
    this.$store.dispatch('auth/logout')
    this.$router.push('/connexion')

    },
  },
};

</script>

<style>
html {
  background-color: #708090;
}

body {
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  padding: 0px;
}

#header {
  display: flex;
  justify-content: center;
  background-color: #2f4f4f;
  margin-bottom: 20px;
  height: 200px;
  
}

#logo {
  width: 250px;
  height: 250px;
}

nav {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 50px;
}


input {
  margin: 5% 0%;
  font-size: 25px;
}

a {
  text-decoration: none;
  color: white;
}

a:hover {
  color: #2f4f4f;
}


h1 {
  color: #2f4f4f;
  font-size: 35px;
  margin-bottom: 45px;
}

input {
  border-radius: 10px;
  border: 0px;
  padding: 5px;
  background-color: #2f4f4f;
  color: white;
}

::placeholder {
  color: white;
}

button {
  background-color: #2f4f4f;
  border-radius: 10px;
  color: white;
  padding: 5px;
  border: 0px;
  cursor: pointer;
  margin: 5% 0%;
  font-size: 25px;
}

caption {
  margin-bottom: 15px;
}
</style>
