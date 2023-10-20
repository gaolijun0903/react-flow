import { proxy } from 'valtio'
import { queryCurrentUser } from '@/services/common'

export const state = proxy({
  userInfo: {} as COMMON.IUserInfo,
})

export const actions = {
  setUserInfo: async () => {
    const res = await queryCurrentUser()
    if (res.data) {
      state.userInfo = res.data
    }
  },
}

export default {
  state,
  actions,
}
