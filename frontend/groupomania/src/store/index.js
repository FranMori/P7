import {createStore} from 'vuex'
const axios = require('axios')
import { auth } from "./auth.module"

const instance = axios.create({
  baseURL: 'http://localhost:5000/api'
})

const reqHeaders = {
  'headers': {
    'Access-Control-Allow-Headers': 'x-access-token',  }
}

const store = createStore({
  modules: {
    auth,
  },
  state: {
    status: '',
    user: {
      id: -1,
      token: '',
    },
    userInfos: {
      nom: '',
      prenom: '',
      email: '',
      password: '',
      image: '',
    },
    textInfos: {
      title: '',
      text: '',

    },
    multimediaSubjectInfos: {
      title: '',
      text:'',
      image:'',
    },
    commentTextInfos: {
      text: '',

    },
    commentMultimediaInfos: {
      text: '',
      image: ''
    },

    subjects : [],
    multimedias: [],
    comments: [],
    commentMultis: [],
  },
  
  mutations: {
    setStatus: function (state, status) {
      state.status = status
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos
    },
    subjectTextInfos: function (state, subjects) {
      state.subjects = subjects
    },
    textInfos: function (state, textInfos) {
      state.textInfos = textInfos
    },
    multimediaInfos: function (state, multimedias) {
      state.multimedias = multimedias
    },
    multimediaSubjectInfos: function (state, multimediaSubjectInfos) {
      state.multimediaSubjectInfos = multimediaSubjectInfos
    },
    commentTextInfos: function (state, comments) {
      state.comments = comments
    },
    commentInfos: function (state, commentTextInfos) {
      state.commentTextInfos = commentTextInfos
    },
    commentMultimediaInfos: function (state, commentMultis) {
      state.commentMultis = commentMultis
    },
    

  },
  getters: {
    subjects: state => {
      return state.subjects
    },
    multimedias: state => {
      return state.multimedias
    },
    authenticated(state){
      return !!state.user
    },
    comments: state => {
      return state.comments
    },
    commentMultis: state => {
      return state.commentMultis
    }
   
  },
  actions: {
    // authentification
    createAccount: ({commit}, userInfos) => {
      return new Promise ((resolve, reject) => {
        instance.post('/auth/signup', userInfos)
        .then(function (response){
          commit('setStatus', 'created')
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create')
          reject(error)
        })  
      })
    },
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading')
      return new Promise ((resolve, reject) => {
        instance.post('/auth/login', userInfos)
        .then(function (response){
          commit('setStatus', 'error_login')
          commit('logUser', response.data)
          sessionStorage.setItem('userId', response.data.userId)
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', '')
          reject(error)
        });
      });
    },
    logout: function()  {
      instance.get('/auth/logout')
    },

    // users
    getUserInfos: ({commit}) => {
      instance.get('/auth/profile')
        .then(function (response){
          commit('userInfos', response.data)
        })
        .catch(function () {
          commit('setStatus', 'error')
        })
    },
    getUser : ({commit}) => {
    const url = window.location.href
    const id = url.split('/profile/')[1]
      instance.get('/auth/profile/' + id)
      .then(function(response) {
        commit('userInfos', response.data)
      })
    },

    modifyProfile: ({commit}, userInfos) => {
      return new Promise ((resolve, reject) => {
        const url = window.location.href
        const id = url.split('/profile/')[1]
        instance.put('/auth/profile/' + id, userInfos,)
        .then(function (response){
          commit('setStatus', 'modified')
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_modify')
          reject(error)
        })  
      })
    },
    
    // textSubject
    createTextSubject: ({commit}, subjectTextInfos) => {
      return new Promise ((resolve, reject) => {
        instance.post('/auth/subject', Object.assign({}, subjectTextInfos, reqHeaders))
        .then(function (response){
          
          commit('setStatus', 'created')
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create')
          reject(error)
        })  
      })
    },
    getSubjectInfos: ({commit}) => {
      instance.get('/auth/subject')
      .then(function (response){
        commit('subjectTextInfos', response.data.subjects)
      })
      .catch(function () {
        commit('setStatus', 'error')
      })
  },
    getTextSubject : ({commit}) => {
    const url = window.location.href
    const id = url.split('/texte/')[1]
      instance.get('/auth/subject/' + id)
      .then(function(response) {
        commit('textInfos', response.data)
      })
    },
    modifyTextSubject: ({commit}, textInfos) => {
      return new Promise ((resolve, reject) => {
        const url = window.location.href
        const id = url.split('/texte/')[1]
        instance.put('/auth/subject/' + id, textInfos,)
        .then(function (response){
          commit('setStatus', 'modified')
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_modify')
          reject(error)
        })  
      })
    },

    deleteTextSubject: ({commit}) => {
      const url = window.location.href
      const id = url.split('/texte/')[1]
      instance.delete('/auth/subject/' + id, )
      commit('setStatus', 'deleted')
    },

    getTextAuthor: ({commit}) => {
      const url = window.location.href
      const id = url.split('/texte/')[1]
        instance.get('/auth/subject/author/' + id)
        .then(function(response) {
          commit('userInfos', response.data)
        })
      },
    // textComment
    createTextComment: ({commit}, commentTextInfos) => {
      return new Promise ((resolve, reject) => {
        instance.post('/auth/comment', Object.assign({}, commentTextInfos, reqHeaders))
        .then(function (response){
          
          commit('setStatus', 'created')
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create')
          reject(error)
        })  
      })
    },
    getAllTextComments: ({commit}, ) => {
    const url = window.location.href
    const id = url.split('/texte/')[1]
      instance.get('/auth/AllComment/' + id)
      .then(function (response){
        commit('commentTextInfos', response.data.comments)
      })
      .catch(function () {
        commit('setStatus', 'error')
      })
    },
    getTextComment: ({commit}, ) => {
      const url = window.location.href
      const id = url.split('/comment/')[1]
        instance.get('/auth/comment/' + id)
        .then(function (response){
          commit('commentInfos', response.data)         
        })
        .catch(function () {
          commit('setStatus', 'error')
        })
      },

    modifyTextComment: ({commit}, commentTextInfos) => {
      return new Promise ((resolve, reject) => {  
        const url = window.location.href
        const id = url.split('/comment/')[1]      
        instance.put('/auth/comment/' + id, commentTextInfos, )
        .then(function (response){
          commit('setStatus', 'modified')
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_modify')
          reject(error)
        })  
      })
    },

    deleteTextComment: ({commit}) => {
      const url = window.location.href
      const id = url.split('/comment/')[1]
      instance.delete('/auth/comment/' + id, )
      commit('setStatus', 'deleted')
    },

  // Multimedia
createMultimedia: ({commit}, multimediaInfos) => {
  return new Promise ((resolve, reject) => {
    instance.post('/auth/multimedia', multimediaInfos)
    .then(function (response){
      
      commit('setStatus', 'created')
      resolve(response);
    })
    .catch(function (error) {
      commit('setStatus', 'error_create')
      reject(error)
    })  
  })
},
getMultimediaInfos: ({commit}) => {
  instance.get('/auth/multimedia')
  .then(function (response){
    commit('multimediaInfos', response.data.multimedias)
  })
  .catch(function () {
    commit('setStatus', 'error')
  })
},
getMultimedia : ({commit}) => {
  const url = window.location.href
  const id = url.split('/multimedia/')[1]
    instance.get('/auth/multimedia/' + id)
    .then(function(response) {
      commit('multimediaSubjectInfos', response.data)
    })
  },
  modifyMultimedia: ({commit}, multimediaSubjectInfos) => {
    return new Promise ((resolve, reject) => {
      const url = window.location.href
      const id = url.split('/multimedia/')[1]
      instance.put('/auth/multimedia/' + id, multimediaSubjectInfos)
      .then(function (response){
        commit('setStatus', 'modified')
        resolve(response);
      })
      .catch(function (error) {
        commit('setStatus', 'error_modify')
        reject(error)
      })  
    })
  },

  getMultimediaAuthor: ({commit}) => {
    const url = window.location.href
    const id = url.split('/multimedia/')[1]
      instance.get('/auth/multimedia/author/' + id)
      .then(function(response) {
        commit('userInfos', response.data)
        console.log(response.data)
      })
    },
  deleteMultimedia: ({commit}) => {
    const url = window.location.href
    const id = url.split('/multimedia/')[1]
    instance.delete('/auth/multimedia/' + id)
    commit('setStatus', 'deleted')
  },
  
  // Multimedia Comment
  createMultimediaComment: ({commit}, commentMultimediaInfos) => {
    return new Promise ((resolve, reject) => {
      instance.post('/auth/commentMulti', commentMultimediaInfos)
      .then(function (response){
        
        commit('setStatus', 'created')
        resolve(response);
      })
      .catch(function (error) {
        commit('setStatus', 'error_create')
        reject(error)
      })  
    })
  },
  getAllMultiComments: ({commit} ) => {
    const url = window.location.href
    const id = url.split('/multimedia/')[1]
      instance.get('/auth/AllCommentMulti/' + id)
      .then(function (response){
        commit('commentMultimediaInfos', response.data)
        console.log(response.data)
        
      })
      .catch(function () {
        commit('setStatus', 'error')
      })
    },



  }
})



export default store;

