import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _62ea3bb4 = () => interopDefault(import('../pages/readme.vue' /* webpackChunkName: "pages/readme" */))
const _97879276 = () => interopDefault(import('../pages/update/_estado.vue' /* webpackChunkName: "pages/update/_estado" */))
const _40d701b7 = () => interopDefault(import('../pages/update/_cidade/_cidade.vue' /* webpackChunkName: "pages/update/_cidade/_cidade" */))
const _77b6e63c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/readme",
    component: _62ea3bb4,
    name: "readme"
  }, {
    path: "/update/:estado?",
    component: _97879276,
    name: "update-estado"
  }, {
    path: "/update/:cidade?/:cidade?",
    component: _40d701b7,
    name: "update-cidade-cidade"
  }, {
    path: "/",
    component: _77b6e63c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
