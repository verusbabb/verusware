import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Work from '../views/Work.vue'
import WorkDetail from '../views/WorkDetail.vue'
import About from '../views/About.vue'
import Writing from '../views/Writing.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/work', name: 'work', component: Work },
    { path: '/work/:slug', name: 'work-detail', component: WorkDetail },
    { path: '/about', name: 'about', component: About },
    { path: '/writing', name: 'writing', component: Writing },
    // Legacy route — redirect old blog URL
    { path: '/blog', redirect: '/writing' },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

export default router
