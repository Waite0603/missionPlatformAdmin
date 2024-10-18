<template>
  <div>
    <el-card class="mb-4">
      <div class="flex justify-between">
        <div>
          <h3 class="text-xl font-bold">课程列表</h3>
        </div>
        <div class="flex sm:w-full md:w-1/2 lg:w-1/3 gap-4">
          <el-select v-model="courseCategoryValue" placeholder="Select">
            <el-option
              v-for="item in courseCategoryList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
          <el-button type="primary" @click="addCourse">添加课程</el-button>
        </div>
      </div>
    </el-card>

    <el-card>
      <pure-table row-key="id" :data="courseList" :columns="columns">
        <template #image="{ row, index }">
          <el-image
            preview-teleported
            loading="lazy"
            :src="'/api/course/cover/' + row.cover"
            :initial-index="index"
            fit="cover"
            class="h-[80px]"
          />
        </template>
        <template #operation="{ row }">
          <el-button
            link
            type="primary"
            size="small"
            @click="deleteCourse(row.id)"
          >
            Delete
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="updateCourse(row.id)"
          >
            Update
          </el-button>
        </template>
      </pure-table>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, h } from 'vue'
import {
  getCourseAPI,
  deleteCourseAPI,
  getCourseCategoryAPI,
  addCourseAPI
} from '@/api/course'
import type { CourseInfoItem, CourseCategoryParams } from '@/api/course'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { addDialog } from '@/components/ReDialog'
import AddCourseForm from './AddCourseForm.vue'

defineOptions({
  name: 'CourseList'
})

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
    label: 'Category',
    prop: 'category'
  },
  {
    label: 'Description',
    prop: 'desc'
  },
  {
    label: '封面',
    slot: 'image',
    width: '200'
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

const courseCategoryList = ref<CourseCategoryParams[]>()
const courseCategoryValue = ref<string>('')

const getCourseCategoryList = () => {
  getCourseCategoryAPI().then(res => {
    courseCategoryList.value = res.data
    courseCategoryList.value.unshift({
      id: 0,
      name: '全部'
    } as CourseCategoryParams)
  })
}

const router = useRouter()
const updateCourse = (id: number) => {
  router.push(`/courses/edit/${id}`)
}

let courseAllList: CourseInfoItem[] = []
const courseList = ref<CourseInfoItem[]>([])

// 获取课程列表
const getCourseList = () => {
  getCourseAPI().then(res => {
    courseAllList = res.data
    courseList.value = res.data
  })
}

watch(courseCategoryValue, val => {
  if (val === '全部') {
    courseList.value = courseAllList
  } else {
    courseList.value = courseAllList.filter(item => item.category === val)
  }
})

// 删除课程
const deleteCourse = (id: number) => {
  ElMessageBox.confirm('你确定删除该课程嘛?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteCourseAPI(id).then(() => {
      getCourseAPI().then(res => {
        if (res.code === 200) {
          ElMessage.success('删除成功')
          courseList.value = res.data
        } else {
          ElMessage.error(res.msg)
        }
      })
    })
  })
}

// 添加课程
const addCourse = () => {
  addDialog({
    title: '添加课程',
    props: {
      courseData: {} as CourseInfoItem
    },
    contentRenderer: () => h(AddCourseForm),
    beforeSure: (done, { options }) => {
      const form = options.props.courseData
      if (!form.name || !form.desc || !form.category) {
        ElMessage.error('请填写完整信息')
        return
      }
      addCourseAPI({
        ...form,
        cover: 'default.jpg'
      }).then(res => {
        if (res.code === 200) {
          ElMessage.success('添加成功')

          setTimeout(() => {
            router.push(`/courses/edit/${res.data[0].id}`)
          }, 1000)
          done()
        } else {
          ElMessage.error(res.msg)
        }
      })
    }
  })
}

onMounted(() => {
  getCourseList()
  getCourseCategoryList()
})
</script>

<style scoped></style>
