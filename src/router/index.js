import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Icons from '../pages/Icons.vue'
import UserManagement from '@/pages/UserManagement.vue'
import UserFormPage from '@/pages/UserFormPage.vue'
import UserLoginPage from '@/pages/UserLoginPage.vue'
import UserRolesFormPage from '@/pages/UserRolesFormPage.vue'
import UserList from '@/components/UserList.vue'
import UserRoles from '@/components/UserRoles.vue'
import UserPermissions from '@/components/UserPermissions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin'
  },
  {
    path: '/user/login',
    name: 'UserLogin',
    component: UserLoginPage,
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/user/list',
    children: [
      {
        path: 'user',
        name: 'UserManagement',
        redirect: { name: 'UserList' },
        component: UserManagement,
        children: [
          {
            path: 'list',
            name: 'UserList',
            component: UserList,
          },
          {
            path: 'roles',
            name: 'UserRoles',
            component: UserRoles,
          },
          {
            path: 'permissions',
            name: 'UserPermissions',
            component: UserPermissions,
          }
        ],
      },
      {
        path: 'user/create',
        name: 'UserAddPage',
        component: UserFormPage
      },
      {
        path: 'user/edit/:id',
        name: 'UserEditPage',
        component: UserFormPage
      },
      {
        path: 'user/roles/create',
        name: 'UserRolesAdd',
        component: UserRolesFormPage
      },
      {
        path: 'user/roles/edit/:id',
        name: 'UserRolesEdit',
        component: UserRolesFormPage
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('currentUser')
  console.log(isAuthenticated)
  if (to.name !== 'UserLogin' && !isAuthenticated) next({ name: 'UserLogin' })
  else next()
})

export default router
