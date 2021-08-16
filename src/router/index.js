import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'
import AccessDenied from '../pages/AccessDeniedPage.vue'

// Admin pages
import Icons from '../pages/Icons.vue'
import UserManagement from '@/pages/UserManagement.vue'
import UserFormPage from '@/pages/UserFormPage.vue'
import UserLoginPage from '@/pages/UserLoginPage.vue'
import UserRolesFormPage from '@/pages/UserRolesFormPage.vue'
import OverviewPage from '@/pages/OverviewPage.vue'
import UserProfile from '@/pages/UserProfile.vue'
import UserList from '@/components/UserList.vue'
import UserRoles from '@/components/UserRoles.vue'
import UserPermissions from '@/components/UserPermissions.vue'

// constants
import { ROLE_ADMIN, ROLE_DOCTOR, ROLE_PATIENT } from '@/utils/constants'

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
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: OverviewPage,
      },  
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
            meta: {
              user: 'view'
            },
          },
          {
            path: 'roles',
            name: 'UserRoles',
            component: UserRoles,
            meta:{
              isOnlyAdmin: true
            }
          },
          {
            path: 'permissions',
            name: 'UserPermissions',
            component: UserPermissions,
            meta:{
              isOnlyAdmin: true
            }
          }
        ],
      },
      {
        path: 'profile',
        name: 'UserProfile',
        component: UserProfile
      },
      {
        path: 'user/create',
        name: 'UserAddPage',
        component: UserFormPage,
        meta: {
          user: 'add'
        }
      },
      {
        path: 'user/edit/:id',
        name: 'UserEditPage',
        component: UserFormPage,
        meta: {
          user: 'edit'
        }
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
  { path: '*', name:'NotFound' ,component: NotFound },
  { path: '/404', name:'404' ,component: NotFound },
  { path: '/403', name:'403' ,component: AccessDenied },
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
  const infoUser = JSON.parse(isAuthenticated)
  if (to.name !== 'UserLogin' && !isAuthenticated) next({ name: 'UserLogin' })

  if (to.matched.some((record) => record.meta.isOnlyAdmin)) {
    if (infoUser.role_name !== ROLE_ADMIN) next({ name: '403' })
    else next()
  }

  if (to.matched.some((record) => record.meta.user)) {
    const permission =  JSON.parse(infoUser.permission)
    if (permission.user.indexOf(to.meta.user) > -1) next()
    else next({ name: '403' })
  }

  else next()
})

export default router
