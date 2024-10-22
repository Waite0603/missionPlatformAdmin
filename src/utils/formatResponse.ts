// 处理时间格式
interface DataItem {
  [key: string]: string | DataItem | DataItem[] | undefined
  data?: DataItem | DataItem[]
}

const timeDeal: string[] = [
  'date_joined',
  'last_login',
  'create_time',
  'update_time',
  'vip_start_time',
  'vip_end_time'
]
export function formatTimeData(data: DataItem | DataItem[]) {
  // 定义一个名为 formatTimeData 的函数，它接受一个参数 data，类型为 DataItem 或 DataItem 数组
  if (Array.isArray(data)) {
    data.forEach(item => {
      formatTimeData(item)
    })
  } else if (typeof data === 'object' && data !== null) {
    // 如果 data 不是数组，但是是一个非空对象
    timeDeal.forEach(key => {
      // 遍历 timeDeal 数组中的每个元素，这里假设 timeDeal 是一个已经定义的数组
      if (typeof data[key] === 'string') {
        // 如果 data 对象的 key 属性是字符串
        data[key] = (data[key] as string).replace('T', ' ').split('.')[0]
      } else if (Array.isArray(data[key])) {
        // 如果 data 对象的 key 属性是数组
        ;(data[key] as DataItem[]).forEach((item: DataItem) => {
          // 遍历数组中的每个元素
          if (typeof item === 'object' && item !== null) {
            // 如果元素是一个非空对象
            formatTimeData(item) // 对元素递归调用 formatTimeData 函数
          }
        })
      }
    })

    if (data.data) {
      formatTimeData(data.data)
    }
  }
}
