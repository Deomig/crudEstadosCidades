import axios from "axios"

export const state = () => ({ 
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc1Mzg2ODA1LCJleHAiOjE1NzU0NzMyMDV9.t5AFs-FLuFaUNRf-IkMOBMQgWKHx34stS08BwaonAZU',
  dataEstados: [],
  dataEstado: [],
  dataCidades: [],
  dataCidade: [],
  responseApi: ''
})

export const mutations = {
  setResponse: (state, responseApi) => {
    state.responseApi = responseApi
  },
  setdataEstados: (state, dataEstados) => {
    state.dataEstados = dataEstados
  },
  setdataEstado: (state, dataEstado) => {
    state.dataEstado = dataEstado
  },
  setdataCidades: (state, dataCidades) => {
    state.dataCidades = dataCidades
  },
  setdataCidade: (state, dataCidade) => {
    state.dataCidade = dataCidade
  },
}

export const actions = {
  async getdataEstados({ state, commit }) {
    await axios.get("http://localhost:3001/api/estados", { 'headers': { 'Authorization': state.token } })
    .then(response => { 
      commit("setdataEstados", response.data)
    })
    .catch(e => {
      console.error(e)
    })
  },
  async getdataEstado({ state, commit }, id) {
    await axios.get(`http://localhost:3001/api/estados/${id}`, { 'headers': { 'Authorization': state.token } })
    .then(response => {
      commit("setdataEstado", response.data)
    })
    .catch(e => {
      console.error(e)
    })
  },
  async getdataCidades({ state, commit }) {
    await axios.get("http://localhost:3001/api/cidades", { 'headers': { 'Authorization': state.token } })
    .then(response => {       
      commit("setdataCidades", response.data)
    })
    .catch(e => {
      console.error(e)
    })
  },
  async getdataCidade({ state, commit }, id) {
    await axios.get(`http://localhost:3001/api/cidades/${id}`, { 'headers': { 'Authorization': state.token } })
    .then(response => {
      commit("setdataCidade", response.data)
    })
    .catch(e => {
      console.error(e)
    })
  },
  async deleteEstado({state,dispatch,commit}, id) {
    await axios.delete(`http://localhost:3001/api/estados/${id}`, { 'headers': { 'Authorization': state.token } })
    .then(response => {       
      dispatch('getdataEstados')
      commit("setResponse", response.data.message)
    })
    .catch(e => {
      console.error(e)
    })
  },
  async deleteCidade({state,dispatch,commit}, id) { 
    await axios.delete(`http://localhost:3001/api/cidades/${id}`, { 'headers': { 'Authorization': state.token } })
    .then(response => {       
      dispatch('getdataEstados')
      dispatch('getdataCidades')
      commit("setResponse", response.data.message)
    })
    .catch(e => {
      console.error(e)
    })
  },
  async insertEstado({state,dispatch,commit}, data) {
    await axios.post('http://localhost:3001/api/estados', { nome: data.nome, sigla: data.sigla }, { 'headers': { 'Authorization': state.token } })
    .then(response => {       
      dispatch('getdataEstados')
      dispatch('getdataCidades')
      commit("setResponse", response.data.message)
    })
    .catch(e => {
      console.error(e)
    })
  },
  async updateEstado({state,dispatch,commit}, data) { 
    await axios.put(`http://localhost:3001/api/estados/${data.id}`, { nome: data.nome, sigla: data.sigla }, { 'headers': { 'Authorization': state.token } })
    .then(response => {       
      dispatch('getdataEstado', data.id)
      commit("setResponse", response.data.message)
    })
    .catch(e => {
      console.error(e)
    })
  },
  async updateCidade({state,dispatch,commit}, data) { 
    await axios.put(`http://localhost:3001/api/cidades/${data.id}`, { nome: data.nome, idEstado: data.idEstado }, { 'headers': { 'Authorization': state.token } })
    .then(response => {      
      dispatch('getdataEstados') 
      dispatch('getdataCidade', data.id)
      commit("setResponse", response.data.message)
    })
    .catch(e => {
      console.error(e)
    })
  },
  async insertCidade({state,dispatch,commit}, data) {    
    await axios.post('http://localhost:3001/api/cidades', { nome: data.nome, idEstado: data.idEstado }, { 'headers': { 'Authorization': state.token } })
    .then(response => {       
      dispatch('getdataEstados')
      dispatch('getdataCidades')
      commit("setResponse", response.data.message)
    })
    .catch(e => {
      console.error(e)
    })
  }
}
