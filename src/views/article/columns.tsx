import type { LoadingConfig, PaginationProps } from '@pureadmin/table'
import type { PageParams, ArticleParams } from '@/api/articles'
import { ref, onMounted, reactive } from 'vue'
import { delay } from '@pureadmin/utils'
import { getArticleList } from '@/api/articles'

export function useColumns() {
  const ArticleData = ref<ArticleParams[]>([])
  const loading = ref(true)
  const columns: TableColumnList = [
    {
      prop: 'title',
      label: '标题',
      width: '200'
    },
    {
      prop: 'english_title',
      label: '英文标题',
      width: '200'
    },
    {
      prop: 'author',
      label: '作者',
      width: '200'
    },
    {
      prop: 'create_time',
      label: '创建时间',
      width: '200'
    },
    {
      prop: 'update_time',
      label: '更新时间',
      width: '200'
    },
    {
      label: '封面',
      slot: 'image',
      width: '200'
    },
    {
      label: '操作',
      width: '120',
      fixed: 'right',
      slot: 'operation'
    }
  ]
  // 页码信息
  let pageParams: PageParams = {
    page: 1,
    pageSize: 5
  }

  /** 分页配置 */
  const pagination = reactive<PaginationProps>({
    pageSize: 5,
    currentPage: 1,
    pageSizes: [5, 10, 20],
    total: 0,
    align: 'right',
    background: true,
    size: 'default'
  })

  /** 加载动画配置 */
  const loadingConfig = reactive<LoadingConfig>({
    text: '正在加载第一页...',
    viewBox: '-10, -10, 50, 50',
    spinner: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
  })

  // 获取文章列表
  const getArticleListData = async () => {
    const res = await getArticleList(pageParams)
    console.log(res.data.data)
    ArticleData.value = res.data.data
    pagination.total = res.data.total

    loading.value = false
  }

  function onSizeChange(val) {
    pageParams.pageSize = val
    getArticleListData()
  }

  function onCurrentChange(val) {
    loadingConfig.text = `正在加载第${val}页...`
    loading.value = true
    delay(600).then(() => {
      pageParams.page = val
      getArticleListData()
    })
  }

  onMounted(() => {
    getArticleListData()
  })

  return {
    ArticleData,
    loading,
    columns,
    pagination,
    loadingConfig,
    onSizeChange,
    onCurrentChange
  }
}
