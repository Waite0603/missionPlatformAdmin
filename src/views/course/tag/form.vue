<template>
  <el-form
    ref="courseCategoryFormRef"
    :model="courseCategoryData"
    :rules="rules"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="courseCategoryData.name" />
    </el-form-item>
    <el-form-item label="Desc" prop="desc">
      <el-input v-model="courseCategoryData.desc" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { CourseCategoryParams } from '@/api/course'
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const courseCategoryFormRef = ref<FormInstance>()

const props = defineProps({
  courseCategoryData: {
    type: Object as () => CourseCategoryParams,
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
  name: [{ validator: validate, trigger: 'blur' }],
  desc: [{ validator: validate, trigger: 'blur' }]
})

const courseCategoryData = ref(props.courseCategoryData)

function getRef() {
  return courseCategoryFormRef.value
}

defineExpose({ getRef })
</script>
