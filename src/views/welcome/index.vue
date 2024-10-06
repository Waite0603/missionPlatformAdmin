<template>
  <div>
    <el-row :gutter="24" justify="space-around">
      <re-col
        v-for="(item, index) in chartData"
        :key="index"
        v-motion
        class="mb-[18px]"
        :value="8"
        :xs="24"
      >
        <el-card class="line-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">
              {{ item.name }}
            </span>
            <div
              class="w-8 h-8 flex justify-center items-center rounded-md"
              :style="{
                backgroundColor: isDark ? 'transparent' : item.bgColor
              }"
            >
              <IconifyIconOffline
                :icon="item.icon"
                :color="item.color"
                width="18"
              />
            </div>
          </div>
          <div class="flex justify-between items-start mt-3">
            <div class="w-1/2">
              <p class="text-2xl font-bold">{{ item.value }}</p>
              <p class="font-medium text-green-500">{{ item.percent }}</p>
            </div>
          </div>
        </el-card>
      </re-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useDark } from '@pureadmin/utils'
import ReCol from '@/components/ReCol'
import GroupLine from '@iconify-icons/ri/group-line'
import Question from '@iconify-icons/ri/question-answer-line'
import CheckLine from '@iconify-icons/ri/chat-check-line'
import Smile from '@iconify-icons/ri/star-smile-line'

defineOptions({
  name: 'Welcome'
})

const { isDark } = useDark()

const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

/** 需求人数、提问数量、解决数量、用户满意度 */
const chartData = [
  {
    icon: GroupLine,
    bgColor: '#effaff',
    color: '#41b6ff',
    duration: 2200,
    name: '需求人数',
    value: 36000,
    percent: '+88%',
    data: [2101, 5288, 4239, 4962, 6752, 5208, 7450] // 平滑折线图数据
  },
  {
    icon: Question,
    bgColor: '#fff5f4',
    color: '#e85f33',
    duration: 1600,
    name: '提问数量',
    value: 16580,
    percent: '+70%',
    data: [2216, 1148, 1255, 788, 4821, 1973, 4379]
  },
  {
    icon: CheckLine,
    bgColor: '#eff8f4',
    color: '#26ce83',
    duration: 1500,
    name: '解决数量',
    value: 16499,
    percent: '+99%',
    data: [861, 1002, 3195, 1715, 3666, 2415, 3645]
  }
]
</script>

<style lang="scss" scoped>
:deep(.el-card) {
  --el-card-border-color: none;

  /* 解决概率进度条宽度 */
  .el-progress--line {
    width: 85%;
  }

  /* 解决概率进度条字体大小 */
  .el-progress-bar__innerText {
    font-size: 15px;
  }

  /* 隐藏 el-scrollbar 滚动条 */
  .el-scrollbar__bar {
    display: none;
  }

  /* el-timeline 每一项上下、左右边距 */
  .el-timeline-item {
    margin: 0 6px;
  }
}

.main-content {
  margin: 20px 20px 0 !important;
}
</style>
