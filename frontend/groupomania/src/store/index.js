import {createStore} from 'vuex'
const axios = require('axios')
import { auth } from "./auth.module"

import  authHeader  from "../services/user.service"

const instance = axios.create({
  baseURL: 'http://localhost:5000/api'
})

// const reqHeaders = {
//   'headers': {
//     'Access-Control-Allow-Headers': 'x-access-token',  }
// }

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
    subjectInfos: {
      title: '',
      text: '',
      image: ''
    },
    commentInfos: {
      text: '',
      image:''
    },

    subjects : [],
    comments: [],
  },
  
  mutations: {
    setStatus: function (state, status) {
      state.status = status
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos
    },
    subject: function (state, subjects) {
      state.subjects = subjects
    },
    subjectInfos: function (state, subjectInfos) {
      state.subjectInfos = subjectInfos
    },
    comment: function (state, comments) {
      state.comments = comments
    },
    commentInfos: function (state, commentInfos) {
      state.commentInfos = commentInfos
    },
   

  },
  getters: {
    subjects: state => {
      return state.subjects
    },
    authenticated(state){
      return !!state.user
    },
    comments: state => {
      return state.comments
    },
   
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

    modifyProfile: ({commit},  userInfos) => {
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
    
    // Subject
    createSubject: ({commit},  subjectInfos) => {
      return new Promise ((resolve, reject) => {
        instance.post('/auth/subject',  subjectInfos, {headers: authHeader()})
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
    getAllSubjectInfos: ({commit}) => {
      instance.get('/auth/subject', {headers: authHeader()})
      .then(function (response){
        commit('subject', response.data.subjects)
      })
      .catch(function () {
        commit('setStatus', 'error')
      })
  },
    getSubject : ({commit}) => {
    const url = window.location.pathname.split('/')
    const id = url[2]
      instance.get('/auth/subject/' + id, {headers: authHeader()})
      .then(function(response) {
        commit('subjectInfos', response.data)
      })
    },
    modifySubject: ({commit}, subjectInfos) => {
      return new Promise ((resolve, reject) => {
    const url = window.location.pathname.split('/')
    const id = url[2]
        instance.put('/auth/subject/' + id, subjectInfos, {headers: authHeader()})
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

    deleteSubject: ({commit}) => {
      const url = window.location.pathname.split('/')
      const id = url[2]
      instance.delete('/auth/subject/' + id, {headers: authHeader()} )
      commit('setStatus', 'deleted')
    },

    getAuthor: ({commit}) => {
      const url = window.location.pathname.split('/')
    const id = url[2]
        instance.get('/auth/subject/author/' + id, {headers: authHeader()})
        .then(function(response) {
          commit('userInfos', response.data)
        })
      },
    // Comment
    createComment: ({commit}, commentInfos) => {
      return new Promise ((resolve, reject) => {
        instance.post('/auth/comment', commentInfos, {headers: authHeader()})
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
    getAllComments: ({commit}, ) => {
      const url = window.location.pathname.split('/')
      const id = url[2]
      instance.get('/auth/AllComment/' + id, {headers: authHeader()})
      .then(function (response){
        commit('comment', response.data.comments)
      })
      .catch(function () {
        commit('setStatus', 'error')
      })
    },
    getComment: ({commit}, ) => {
      const url = window.location.pathname.split('/')
      const id = url[2]
        instance.get('/auth/comment/' + id, {headers: authHeader()})
        .then(function (response){
          commit('commentInfos', response.data)         
        })
        .catch(function () {
          commit('setStatus', 'error')
        })
      },

    modifyComment: ({commit}, commentInfos) => {
      return new Promise ((resolve, reject) => {  
        const url = window.location.href
        const id = url.split('/comment/')[1]      
        instance.put('/auth/comment/' + id, commentInfos, {headers: authHeader()} )
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

    deleteComment: ({commit}) => {
      const url = window.location.href
      const id = url.split('/comment/')[1]
      instance.delete('/auth/comment/' + id, {headers: authHeader()} )
      commit('setStatus', 'deleted')
    },


  }
})



export default store;

