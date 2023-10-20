import request from '@/utils/request'
import { API_URL } from '@/constants'

// 获取当前登录人信息
export async function queryCurrentUser(): Promise<{
  message: string
  data: COMMON.IUserInfo
  code: number
}> {
  return request.get(`${API_URL}/user/loginUser`)
}

