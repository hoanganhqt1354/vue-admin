export const links = [
  {
    id: 1,
    text: 'Overview',
    url: '/admin/overview',
    icon: 'nc-chart-pie-35'
  },
  {
    id: 2,
    text: 'User',
    url: '/admin/user',
    icon: 'nc-circle-09'
  },
  {
    id: 3,
    text: 'My Profile',
    url: '/admin/profile',
    icon: 'nc-atom'
  },
  
]

export const permissions = {
  user: [
    {
      id:'view', 
      name:'View user'
    },
    {
      id:'add', 
      name:'Add user'
    },
    {
      id:'edit', 
      name:'Edit user'
    },
    {
      id:'delete', 
      name:'Delete user'
    },
  ],
}

export const ROLE_ADMIN = 'administrator'
export const ROLE_DOCTOR = 'doctor'
export const ROLE_PATIENT = 'patient'
  