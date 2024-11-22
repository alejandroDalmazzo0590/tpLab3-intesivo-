import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Descripcion from '../views/Descripcion.vue'
import EditarView from '../views/EditarView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/Cliente/:id',
    name: 'DescripcionView',
    component: Descripcion,
    props: true
  },
  {
    path: '/Armas/:id',
    name: 'EditarView',
    component: EditarView,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
