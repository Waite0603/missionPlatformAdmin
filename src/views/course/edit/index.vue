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

          <template #operation="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click="addOrUpdateChapter(row)"
            >
              Update
            </el-button>
          </template>
        </pure-table>
        <div class="flex justify-center">
          <el-button type="primary" class="mt-5" @click="addOrUpdateChapter()"
            >Add Chapter</el-button
          >
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
// 获取 params 里的 id
import { useRoute } from 'vue-router'
import {
  getCourseDetailByIdAPI,
  addCourseChapterAPI,
  updateCourseChapterAPI
} from '@/api/course'
import type {
  ChapterListItem,
  CourseInfoItem,
  CourseCategoryParams
} from '@/api/course'
import CourseForm from './CourseForm.vue'
import { addDialog } from '@/components/ReDialog'
import EditVideoForm from './EditVideoForm.vue'
import { onMounted, ref, h } from 'vue'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'CoursesEdit'
})

const route = useRoute()
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
  },
  {
    label: 'Operation',
    slot: 'operation'
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
  } else {
    ElMessage.error(res.msg)

    history.back()
  }
}

// 添加或更新章节
const addOrUpdateChapter = (row?: ChapterListItem) => {
  addDialog({
    title: row ? '更新章节' : '添加章节',
    props: {
      chapterData: row || ({} as ChapterListItem)
    },
    contentRenderer: () => h(EditVideoForm),
    beforeSure: (done, { options }) => {
      const form = options.props.chapterData
      if (!form.name || !form.video) {
        ElMessage.error('请填写完整信息')
        return
      }

      if (row) {
        updateCourseChapterAPI(form).then(res => {
          if (res.code === 200) {
            ElMessage.success('更新成功')
            getCourseDetail()
            done()
          } else {
            ElMessage.error(res.msg)
          }
        })
      } else {
        addCourseChapterAPI({
          ...form,
          courseId: id
        }).then(res => {
          if (res.code === 200) {
            ElMessage.success('添加成功')
            getCourseDetail()
            done()
          } else {
            ElMessage.error(res.msg)
          }
        })
      }
    }
  })
}

onMounted(() => {
  getCourseDetail()
})
</script>
