import Vue from 'vue'
import VueRouter from 'vue-router'
import ReExa from '../views/signUp/ReExa.vue'
import Entry from '../views/entry/Entry.vue'
import NewExa from '../views/signUp/NewExa.vue'
import ContinueExa from '../views/signUp/ContinueExa.vue'
import PaySuccess from '../views/signUp/PaySuccess.vue'
import SearchPage from '../views/search/SearchPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'entry',
    component: Entry,
  },
  {
    path: '/reExa',
    name: 'ReExa',
    component: ReExa,
  },
  {
    path: '/newExa',
    name: 'NewExa',
    component: NewExa,
  },
  {
    path: '/continueExa',
    name: 'ContinueExa',
    component: ContinueExa,
  },
  {
    path: '/paySuccess',
    name: 'PaySuccess',
    component: PaySuccess,
  },
  {
    path: '/searchPage',
    name: 'SearchPage',
    component: SearchPage,
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
