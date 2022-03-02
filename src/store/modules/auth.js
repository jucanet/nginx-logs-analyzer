import axios from "axios"

const state = {
  user: null,
  posts: null,
  logs: null,
}

const getters = {
  isAuthenticated: (state) => !!state.user,
  StatePosts: (state) => state.posts,
  StateUser: (state) => state.user,
  StateLogs: (state) => state.logs,
}

const actions = {
  async Register({ dispatch }, form) {
    await axios.post('register', form)
    let UserForm = new FormData()
    UserForm.append('username', form.username)
    UserForm.append('password', form.password)
    await dispatch('LogIn', UserForm)
  },

  async LogIn({ commit }, user) {
    await axios.post("login", user)
    await commit("setUser", user.get("username"))
  },

  async CreatePost({ dispatch }, post) {
    await axios.post("post", post)
    return await dispatch("GetPosts")
  },

  async GetPosts({ commit }) {
    let response = await axios.get("posts")
    commit("setPosts", response.data)
  },

  async GetLogs({ commit }, params) {
    console.log(params.values)
    let response = await axios.get("logs", { params })
    commit("setLogs", response.data)
  },

  async LogOut({ commit }) {
    let user = null
    commit("logout", user)
  },
}

const mutations = {
  setUser(state, username) {
    state.user = username
  },
  setPosts(state, posts) {
    state.posts = posts
  },
  logout(state, user) {
    state.user = user
  },
  setLogs(state, logs) {
    state.logs = logs
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
