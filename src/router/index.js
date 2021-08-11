import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Icons from '../pages/Icons.vue'
import UserManagement from '@/pages/UserManagement.vue'
import UserAddPage from '@/pages/UserAddPage.vue'
import UserRolesAdd from '@/pages/UserRolesAdd.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/user'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/user',
    children: [
      {
        path: 'user',
        name: 'UserManagement',
        component: UserManagement,
      },
      {
        path: 'user/create',
        name: 'UserAddPage',
        component: UserAddPage
      },
      {
        path: 'user/roles/create',
        name: 'UserRolesAdd',
        component: UserRolesAdd
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      
    ]
  },
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
