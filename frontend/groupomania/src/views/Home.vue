<template>
<div id="home">
  <h1>Accueil</h1>
    <h2 class="titre__description">Bienvenue sur le nouveau réseau social de Groupomania. Un endroit créé pour les différents collaborateurs afin qu'ils puissent échanger et se relaxer </h2>
     <div>

     </div>
     <table id="core">
       <caption class="titre__form">Forums du réseau social Groupomania</caption>
       <tr class="title">
         <th scope="col">Forum</th>
         <th scope="col">Sujets</th>
         <th scope="col">Messages</th>
       </tr>
       <tr>
         <td> <router-link to="/multimedia"> Forum Multimédia <br> </router-link> <span class="forum__description">Forum dédié aux posts multimédias</span></td>
         <td>4</td>
         <td>19</td>
       </tr>
       <tr>
         <td> <router-link to="/texte">Forum Texte <br> </router-link><span class="forum__description">Forum dédié aux posts textes </span></td>
         <td>9</td>
         <td>84</td>
       </tr>
     </table>
  </div>
</template>

<script>
export default {
  name: 'Home',


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
  font-size: 30px;
  padding: 15px;
}

.title {
  background-color: #2F4F4F;
}

.forum__description {
  font-size: 12px;
}

h2 {
  margin-bottom: 50px;
}

.titre__description {
    font-size: 18px;
    margin-left: 10px;
    margin-right: 10px;
  } 

</style>