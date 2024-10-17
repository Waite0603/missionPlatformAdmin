<template>
  <el-card>
    <div>
      <h3 class="text-xl font-bold mb-5">编辑课程</h3>
      <CourseForm v-if="courseInfo" :courseData="courseInfo" />
    </div>

    <el-divider />

    <el-row>
      <el-col class="w-full">
        <pure-table :data="chapterList" :columns="chapterColumns">
          <template #video="{ row }">
            <video width="180" height="180" controls>
              <source :src="`/api/video/` + row.video" type="video/mp4" />
            </video>
          </template>
        </pure-table>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
// 获取 params 里的 id
import { useRoute } from 'vue-router'
import { getCourseDetailByIdAPI, getCourseCategoryAPI } from '@/api/course'
import type {
  ChapterListItem,
  CourseInfoItem,
  CourseCategoryParams
} from '@/api/course'
import CourseForm from './CourseForm.vue'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'CoursesEdit'
})

const route = useRoute()
const edited = ref(false)
const id = Number(route.params.id)

const courseInfo = ref<CourseInfoItem | null>(null)
const chapterList = ref<ChapterListItem[]>([])

const chapterColumns: TableColumnList = [
  {
    label: 'ID',
    prop: 'id'
  },
  {
    label: 'Name',
    prop: 'name'
  },
  {
    label: 'Video',
    slot: 'video'
  },
  {
    label: 'Create Time',
    prop: 'create_time'
  },
  {
    label: 'Update Time',
    prop: 'update_time'
  }
]

// 获取课程详情
const getCourseDetail = async () => {
  if (!id) {
    ElMessage.error('课程 id 不存在')
    history.back()

    return
  }
  const res = await getCourseDetailByIdAPI(id)
  if (res.code === 200) {
    courseInfo.value = res.data.course
    chapterList.value = res.data.chapter

    console.log(chapterList.value)
  } else {
    ElMessage.error(res.msg)

    history.back()
  }
}

onMounted(() => {
  getCourseDetail()
})
</script>
