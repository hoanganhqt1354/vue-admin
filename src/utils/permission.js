import store from '../store'

export const checkPermission = (value) => {
  const permission = JSON.parse(store.getters['GET_CURRENT_USER'].permission)
  if (permission.user.indexOf(value) > -1) {
    return true
  } 
  else {     
    return false
  }
}
