<template>
  <el-card>
    <pure-table :data="courseCategoryList" :columns="courseCategoryColumns">
      <template #operation="{ row }">
        <el-button
          link
          type="primary"
          size="small"
          @click="handleDeleteCourseCategory(row.id)"
        >
          Delete
        </el-button>
        <el-button
          link
          type="primary"
          size="small"
          @click="editCourseCategory(row)"
        >
          Update
        </el-button>
      </template>
    </pure-table>

    <div class="flex justify-end mt-2">
      <el-button type="primary" @click="addCourseCategory">
        Add Course Category
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useTag } from './tag'
import { ref, h } from 'vue'
import type { CourseCategoryParams } from '@/api/course'
import { updateCourseCategoryAPI, addCourseCategoryAPI } from '@/api/course'
import { addDialog } from '@/components/ReDialog'
import forms from './form.vue'
import { useWindowSize } from '@vueuse/core'
import { ElMessage } from 'element-plus'

const {
  courseCategoryList,
  courseCategoryColumns,
  handleDeleteCourseCategory,
  getCourseCategoryList
} = useTag()

const courseCategoryFormRef = ref()
const { width } = useWindowSize()

const addCourseCategory = () => {
  addDialog({
    title: '增加课程分类',
    fullscreen: width.value < 768,
    props: {
      courseCategoryData: {} as CourseCategoryParams
    },
    contentRenderer: () =>
      h(forms, {
        ref: courseCategoryFormRef,
        courseCategoryData: {} as CourseCategoryParams
      }),
    beforeSure: (done, { options }) => {
      const form = courseCategoryFormRef.value.getRef()
      const courseCategoryData = options.props.courseCategoryData

      form?.validate().then(valid => {
        if (valid) {
          addCourseCategoryAPI(courseCategoryData).then(res => {
            if (res.code === 200) {
              ElMessage.success('添加成功')
              getCourseCategoryList()
              done()
            } else {
              ElMessage.error(res.msg)
            }
          })
        }
      })
    }
  })
}

const editCourseCategory = (courseCategoryData: CourseCategoryParams) => {
  addDialog({
    title: '编辑课程分类',
    fullscreen: width.value < 768,
    props: {
      courseCategoryData
    },
    contentRenderer: () =>
      h(forms, {
        ref: courseCategoryFormRef,
        courseCategoryData
      }),
    beforeSure: (done, { options }) => {
      const form = courseCategoryFormRef.value.getRef()
      const courseCategoryData = options.props.courseCategoryData

      form?.validate().then(valid => {
        if (valid) {
          updateCourseCategoryAPI(courseCategoryData).then(res => {
            if (res.code === 200) {
              ElMessage.success('编辑成功')
              getCourseCategoryList()
              done()
            } else {
              ElMessage.error(res.msg)
            }
          })
        }
      })
    }
  })
}

defineOptions({
  name: 'CoursesTag'
})
</script>

<style scoped></style>
