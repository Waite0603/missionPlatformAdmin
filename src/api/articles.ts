import { http } from '@/utils/http'

export type PageParams = {
  page: number
  pageSize: number
}

export type ArticleParams = {
  id: number
  title: string
  english_title: string
  content: string
  cover: string
  author_id: number
  author: string
  author_avatar: string
  create_time: string
  update_time: string
}

export type ArticleListResult = {
  success: boolean
  data: {
    total: number
    page: number
    pageSize: number
    data: Array<ArticleParams>
  }
}

// 获取文章列表
export const getArticleList = (params: PageParams) => {
  return http.request<ArticleListResult>('get', '/article/get_list', { params })
}

// 刪除文章
export const deleteArticle = (id: number) => {
  return http.request('get', `/article/delete?id=${id}`)
}
