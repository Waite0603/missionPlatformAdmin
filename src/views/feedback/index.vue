<template>
  <el-card>
    <h2>Feedback</h2>
    <div class="flex justify-end mt-2">
      <el-button plain @click="exportExcel">Export Excel</el-button>
    </div>

    <pure-table row-key="id" :data="feedbackDataList" :columns="columns">
      <template #operation="{ row }">
        <el-button
          link
          type="primary"
          size="small"
          @click="contactWithEmail(row.email)"
        >
          Contact With Email
        </el-button></template
      >
    </pure-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { utils, writeFile } from 'xlsx'
import { getFeedbackAPI } from '@/api/feedback'
import type { FeedbackParams } from '@/api/feedback'
import { message } from '@/utils/message'

const columns: TableColumnList = [
  {
    label: 'ID',
    prop: 'id'
  },
  {
    label: 'Name',
    prop: 'name'
  },
  {
    label: 'Email',
    prop: 'email'
  },
  {
    label: 'Message',
    prop: 'message'
  },
  {
    label: 'Created At',
    prop: 'create_time'
  },
  ,
  {
    label: '操作',
    slot: 'operation',
    fixed: 'right'
  }
]

const feedbackDataList = ref<FeedbackParams[]>([])

defineOptions({
  name: 'Feedback'
})

const exportExcel = () => {
  const res = feedbackDataList.value.map(item => {
    const arr = []
    columns.forEach(column => {
      arr.push(item[column.prop as string])
    })
    return arr
  })
  const titleList = []
  columns.forEach(column => {
    titleList.push(column.label)
  })
  res.unshift(titleList)
  const workSheet = utils.aoa_to_sheet(res)
  const workBook = utils.book_new()
  utils.book_append_sheet(workBook, workSheet, '数据报表')
  writeFile(workBook, 'pure-admin-table.xlsx')
  message('导出成功', {
    type: 'success'
  })
}

const contactWithEmail = (email: string) => {
  const ccEmail = 'info@zhitu.com' // Replace with the actual email address
  window.open(`mailto:${email}?cc=${ccEmail}`)
}

onMounted(async () => {
  const res = await getFeedbackAPI()
  feedbackDataList.value = res.data
})
</script>

<style scoped></style>
