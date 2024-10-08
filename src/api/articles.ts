import { http } from '@/utils/http'

export type PageParams = {
  page: number
  pageSize: number
}

export type ArticleParams = {
  id: number
  title: string
  english_title: string
  englishTitle: string
  content: string
  cover: string
  author_id: number
  author: string
  create_time: string
  update_time: string
  status: number
}

export type ArticleListResult = {
  code: number
  msg: string
  data: {
    total: number
    page: number
    pageSize: number
    data: Array<ArticleParams>
  }
}

export type ArticleResult = {
  code: number
  msg: string
}

// 获取文章列表
export const getArticleList = (params: PageParams) => {
  return http.request<ArticleListResult>('get', '/article/get_list', { params })
}

// 刪除文章
export const deleteArticle = (id: number) => {
  const data: object = {
    id: id
  }

  return http.request<ArticleResult>('post', '/article/delete', { data })
}

// 新增文章
export const addArticle = (data: object) => {
  return http.request<ArticleResult>('post', '/article/add', { data })
}

// 更新文章
export const updateArticle = (data: object) => {
  return http.request<ArticleResult>('post', '/article/update', { data })
}
