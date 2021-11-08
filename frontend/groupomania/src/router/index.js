import{ createRouter, createWebHistory} from 'vue-router'

import Home from '@/views/Home.vue'
import Signup from '@/views/Signup.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'


import Multimedia from '@/views/Multimedia.vue'
import MultimediaAdd from '@/views/MultimediaAdd.vue'
import MultimediaMessage from '@/views/MultimediaMessage.vue'

import Texte from '@/views/Texte.vue'
import TexteAdd from '@/views/TexteAdd.vue'
import TexteMessage from '@/views/TexteMessage.vue'
import Comment from '@/views/Comment.vue'





const routes = [
  {
    name: 'Home',
    path:'/',
    component: Home,
    meta: {
      title: 'Accueil'
    },
  },
  {
    name: 'Signup',
    path: '/inscription',
    component: Signup,
    meta: {
      title: 'Inscription'
    }

  },

  {
    name: 'Login',
    path: '/connexion',
    component: Login,
    meta: {
      title: 'Connexion'
    }
  },

  {
    name: 'Multimedia',
    path: '/multimedia',
    component: Multimedia,
    meta : {
      title: 'Multimedia'
    }
  },
  {
    name: 'MultimediaAdd',
    path: '/multimedia/add',
    component: MultimediaAdd,
    meta: {
      title: 'Créer un sujet'
    }
  },

  {
    name: 'MultimediaMessage',
    path: '/multimedia/:id',
    component: MultimediaMessage,
    meta: {
      title: 'Message'
    }

  },

  {
    name: 'Texte',
    path: '/texte',
    component: Texte,
    meta : {
      title: 'Texte'
    }
  },

  {
    name: 'TexteAdd',
    path: '/texte/add',
    component: TexteAdd,
    meta : {
      title : 'Créer un sujet',
    }
  },

  {
    name: 'TexteMessage',
    path: '/texte/:id',
    component: TexteMessage,
    meta : {
      title: 'Sujet'
    }
  },
 
  {
    name: 'Profile',
    path: '/profile/:id',
    component: Profile,
    meta: {
      title: 'Profile'
    },

  },
  {
    name: 'Comment',
    path: '/comment/:id',
    component: Comment,
    meta: {
      title: 'Mon commentaire'
    }
  },
   
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title
})

export default router