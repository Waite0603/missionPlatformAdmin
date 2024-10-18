<template>
  <el-form ref="courseCategoryFormRef" :model="chapterData" :rules="rules">
    <el-form-item label="Name" prop="name">
      <el-input v-model="chapterData.name" />
    </el-form-item>
    <el-form-item label="Video">
      <video
        v-if="chapterData.video"
        :src="'/api/video/' + chapterData.video"
        controls
        style="width: 100%"
      />
      <el-upload
        action="/api/video/upload"
        class="m-auto"
        :headers="{
          Authorization: getToken()?.accessToken,
          'X-CSRFToken': getCookie('csrftoken')
        }"
        :onSuccess="handleSuccess"
        :onError="handleError"
        :onRemove="handleRemove"
        :on-exceed="handleExceed"
        :limit="1"
      >
        <el-button size="small" type="primary">Upload</el-button>
      </el-upload>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type {
  ChapterListItem,
  CourseInfoItem,
  CourseCategoryParams
} from '@/api/course'
import { getToken, getCookie } from '@/utils/auth'
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

type UploadVideoResule = {
  code: number
  msg: string
  data: {
    id: number
    name: string
    path: string
  }
}

const courseCategoryFormRef = ref<FormInstance>()

const props = defineProps({
  chapterData: {
    type: Object as () => ChapterListItem,
    default: () => ({})
  }
})

const validate = (rule, value, callback) => {
  if (!value) {
    callback(new Error('This is required'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  name: [{ validator: validate, trigger: 'blur' }]
})

const chapterData = ref(props.chapterData)

const handleSuccess = (res: UploadVideoResule) => {
  if (res.code === 200) {
    chapterData.value.video = res.data.name
  } else {
    ElMessage.error(res.msg)
  }
}

const handleError = () => {
  ElMessage.error('上传失败')
}

const handleRemove = () => {
  chapterData.value.video = ''
}

const handleExceed = () => {
  ElMessage.error('只能上传一个视频')
}
</script>
