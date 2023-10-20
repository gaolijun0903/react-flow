/*
 * 全局类型，直接使用
 * */
declare namespace COMMON {
  // 当前登录人信息
  type IUserInfo = {
    headImg: string
    userName: string
    realName: string //
    isAdmin: boolean
  }
}
