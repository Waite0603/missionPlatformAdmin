<template>
  <el-form ref="articleFormRef" :model="articleData" :rules="rules">
    <el-form-item label="Title" prop="title">
      <el-input v-model="articleData.title" />
    </el-form-item>
    <el-form-item label="EnglishTitle" prop="englishTitle">
      <el-input v-model="articleData.englishTitle" />
    </el-form-item>
    <el-form-item>
      <div style="border: 1px solid #ccc; margin-top: 10px">
        <Toolbar
          :editor="editorRef"
          mode="default"
          style="border-bottom: 1px solid #ccc"
        />
        <Editor
          v-model="articleData.content"
          style="height: 500px; overflow-y: hidden"
          :defaultConfig="editorConfig"
          mode="default"
          @onCreated="handleCreated"
        />
      </div>
    </el-form-item>
    <el-form-item label="Cover">
      <el-image
        v-if="articleData.cover"
        :src="'/api/article/cover/' + articleData.cover"
        fit="cover"
      />
      <el-upload
        action="/api/article/upload_cover"
        class="m-auto"
        :onSuccess="handleSuccess"
        :onRemove="handleRemove"
        :on-exceed="handleExceed"
        :headers="{ Authorization: getToken()?.accessToken }"
        :limit="1"
      >
        <el-button size="small" type="primary">Upload</el-button>
      </el-upload>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive } from 'vue'

import type { UploadProps, UploadUserFile } from 'element-plus'

import { getToken } from '@/utils/auth'
import { ref, shallowRef } from 'vue'
import type { PageParams, ArticleParams } from '@/api/articles'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { FormInstance, FormRules } from 'element-plus'

const articleFormRef = ref<FormInstance>()

const props = defineProps({
  articleData: {
    type: Object as () => ArticleParams,
    default: () => ({})
  }
})

const validateTitle = (rule, value, callback) => {
  if (!value) {
    callback(new Error('Title is required'))
  } else {
    callback()
  }
}

const validateEnglishTitle = (rule, value, callback) => {
  if (value === undefined || value === null || value.trim() === '') {
    callback(new Error('EnglishTitle is required'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  title: [{ validator: validateTitle, trigger: 'blur' }],
  english_title: [{ validator: validateEnglishTitle, trigger: 'blur' }]
})

const editorConfig = { placeholder: '请输入内容...' }

const handleCreated = editor => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const articleData = ref(props.articleData)

// english_title 与 englishTitle 为后端字段
articleData.value.englishTitle = articleData.value.english_title

const editorRef = shallowRef()

const handleSuccess = (res, file) => {
  if (res.code === 200) {
    articleData.value.cover = res.data.cover
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
    articleData.value.cover = ''
  })
}

const handleExceed: UploadProps['onExceed'] = files => {
  ElMessage.warning('最多只能上传一张封面, 请删除后再上传')
}

function getRef() {
  return articleFormRef.value
}

defineExpose({ getRef })
</script>
