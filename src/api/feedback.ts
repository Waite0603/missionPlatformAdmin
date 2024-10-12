import { http } from '@/utils/http'

export type FeedbackParams = {
  id: number
  name: string
  email: string
  message: string
  create_time: string
}

export type FeedbackListResult = {
  code: number
  msg: string
  data: FeedbackParams[]
}

// 获取所有反馈
export const getFeedbackAPI = () => {
  return http.request<FeedbackListResult>('get', '/auth/contact/list')
}
