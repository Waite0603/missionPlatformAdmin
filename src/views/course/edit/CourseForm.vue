<template>
  <el-form ref="coureFormRef" :model="courseData" :rules="rules">
    <el-row :gutter="24" justify="space-around">
      <re-col :value="12" :xs="24" class="mb-[18px]">
        <el-form-item label="Name" prop="name">
          <el-input v-model="courseData.name" :disabled="!edited" />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24">
        <el-form-item label="Description" prop="desc">
          <el-input v-model="courseData.desc" :disabled="!edited" />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24">
        <el-form-item label="Category" prop="category">
          <el-select v-model="courseData.category" :disabled="!edited">
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24">
        <el-form-item label="Cover">
          <el-image
            v-if="courseData.cover"
            :src="'/api/course/cover/' + courseData.cover"
            style="height: 100px"
            fit="cover"
          />
          <el-upload
            action="/api/course/upload/cover"
            class="m-auto"
            :onSuccess="handleSuccess"
            :onRemove="handleRemove"
            :on-exceed="handleExceed"
            :headers="{ Authorization: getToken()?.accessToken }"
            :limit="1"
            :disabled="!edited"
          >
            <el-button size="small" type="primary">Upload</el-button>
          </el-upload>
        </el-form-item>
      </re-col>
    </el-row>

    <el-form-item class="justify-center">
      <div class="w-full flex justify-center">
        <el-button type="primary" @click="handleSubmit">
          {{ !edited ? 'Edit' : 'Submit' }}
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import ReCol from '@/components/ReCol'
import { reactive } from 'vue'

import type { UploadProps } from 'element-plus'

import { getToken } from '@/utils/auth'
import { ref } from 'vue'
import {
  getCourseDetailByIdAPI,
  getCourseCategoryAPI,
  updateCourseAPI
} from '@/api/course'
import type {
  ChapterListItem,
  CourseInfoItem,
  CourseCategoryParams
} from '@/api/course'
import type { FormInstance, FormRules } from 'element-plus'
import { onMounted } from 'vue'

const coureFormRef = ref<FormInstance>()
const edited = ref(false)

const props = defineProps({
  courseData: {
    type: Object as () => CourseInfoItem,
    default: () => ({})
  }
})

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

const courseData = ref(props.courseData)

const handleSubmit = () => {
  if (!edited.value) edited.value = true
  else {
    coureFormRef.value.validate(async valid => {
      if (valid) {
        const res = await updateCourseAPI(courseData.value)
        if (res.code === 200) {
          ElMessage.success('更新成功')

          edited.value = false
        } else {
          ElMessage.error(res.msg)
        }
      }
    })
  }
}

const handleSuccess = (res, file) => {
  if (res.code === 200) {
    courseData.value.cover = res.data.cover
  } else {
    ElMessage.error(res.message)
  }
}

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  ElMessageBox.confirm('你确定要删除这个封面吗？', '警告', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    courseData.value.cover = ''
  })
}

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

const handleExceed: UploadProps['onExceed'] = files => {
  ElMessage.warning('最多只能上传一张封面, 请删除后再上传')
}

onMounted(() => {
  getCourseCategory()
})
</script>
