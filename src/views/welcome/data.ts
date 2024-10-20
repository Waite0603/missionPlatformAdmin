import { dayjs, cloneDeep, getRandomIntBetween } from './utils'
import GroupLine from '@iconify-icons/ri/group-line'
import Question from '@iconify-icons/ri/question-answer-line'
import CheckLine from '@iconify-icons/ri/chat-check-line'

const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

/** 需求人数、提问数量、解决数量、用户满意度 */
const chartData = [
  {
    icon: GroupLine,
    bgColor: '#effaff',
    color: '#41b6ff',
    duration: 2200,
    name: '文章数量',
    value: 16,
    percent: '+88%'
  },
  {
    icon: Question,
    bgColor: '#fff5f4',
    color: '#e85f33',
    duration: 1600,
    name: '课程数量',
    value: 23,
    percent: '+70%'
  },
  {
    icon: CheckLine,
    bgColor: '#eff8f4',
    color: '#26ce83',
    duration: 1500,
    name: '反馈数量',
    value: 9,
    percent: '+99%'
  }
]

/** 分析概览 */
const barChartData = [
  {
    requireData: [21, 52, 42, 62, 67, 8, 50],
    questionData: [16, 18, 15, 88, 21, 73, 49]
  },
  {
    requireData: [21, 80, 40, 42, 52, 69, 76],
    questionData: [26, 38, 55, 88, 21, 70, 50]
  }
]

/** 解决概率 */
const progressData = [
  {
    week: '周一',
    percentage: 85,
    duration: 110,
    color: '#41b6ff'
  },
  {
    week: '周二',
    percentage: 86,
    duration: 105,
    color: '#41b6ff'
  },
  {
    week: '周三',
    percentage: 88,
    duration: 100,
    color: '#41b6ff'
  },
  {
    week: '周四',
    percentage: 89,
    duration: 95,
    color: '#41b6ff'
  },
  {
    week: '周五',
    percentage: 94,
    duration: 90,
    color: '#26ce83'
  },
  {
    week: '周六',
    percentage: 96,
    duration: 85,
    color: '#26ce83'
  },
  {
    week: '周日',
    percentage: 100,
    duration: 80,
    color: '#26ce83'
  }
].reverse()

/** 数据统计 */
const tableData = Array.from({ length: 30 }).map((_, index) => {
  return {
    id: index + 1,
    requiredNumber: getRandomIntBetween(13500, 19999),
    questionNumber: getRandomIntBetween(12600, 16999),
    resolveNumber: getRandomIntBetween(13500, 17999),
    satisfaction: getRandomIntBetween(95, 100),
    date: dayjs().subtract(index, 'day').format('YYYY-MM-DD')
  }
})

/** 最新动态 */
const latestNewsData = cloneDeep(tableData)
  .slice(0, 14)
  .map((item, index) => {
    return Object.assign(item, {
      date: `${dayjs().subtract(index, 'day').format('YYYY-MM-DD')} ${
        days[dayjs().subtract(index, 'day').day()]
      }`
    })
  })

export { chartData, barChartData, progressData, tableData, latestNewsData }
