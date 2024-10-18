<template>
  <el-form ref="coureFormRef" :model="courseData" :rules="rules">
    <el-row :gutter="24" justify="space-around">
      <re-col>
        <el-form-item label="Name" prop="name">
          <el-input v-model="courseData.name" />
        </el-form-item>
      </re-col>

      <re-col>
        <el-form-item label="Description" prop="desc">
          <el-input v-model="courseData.desc" />
        </el-form-item>
      </re-col>

      <re-col>
        <el-form-item label="Category" prop="category">
          <el-select v-model="courseData.category">
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import ReCol from '@/components/ReCol'
import { reactive } from 'vue'

import type { UploadProps } from 'element-plus'

import { ref } from 'vue'
import { getCourseCategoryAPI, updateCourseAPI } from '@/api/course'
import type {
  ChapterListItem,
  CourseInfoItem,
  CourseCategoryParams
} from '@/api/course'
import type { FormInstance, FormRules } from 'element-plus'
import { onMounted } from 'vue'

const coureFormRef = ref<FormInstance>()

const props = defineProps({
  courseData: {
    type: Object as () => CourseInfoItem,
    default: () => ({})
  }
})
const courseData = ref(props.courseData)

const validateTitle = (rule, value, callback) => {
  if (!value) {
    callback(new Error('对象不能为空'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  name: [{ validator: validateTitle, trigger: 'blur' }],
  desc: [{ validator: validateTitle, trigger: 'blur' }]
})

// 获取课程分类
const categoryList = ref<CourseCategoryParams[]>([])
const getCourseCategory = async () => {
  const res = await getCourseCategoryAPI()
  if (res.code === 200) {
    categoryList.value = res.data
  } else {
    ElMessage.error(res.msg)
  }
}

onMounted(() => {
  getCourseCategory()
})
</script>
