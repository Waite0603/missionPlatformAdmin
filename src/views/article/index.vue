<template>
  <div>
    <el-row>
      <re-col>
        <el-card class="mb-4">
          <div class="flex justify-between">
            <div>
              <h3 class="text-xl font-bold">文章列表</h3>
            </div>
            <el-button type="primary" @click="addOrUpdateArticle()"
              >添加文章</el-button
            >
          </div>
        </el-card>
        <el-card>
          <pure-table
            :data="ArticleData"
            :columns="columns"
            :pagination="pagination"
            :loading="loading"
            :loading-config="loadingConfig"
            @page-size-change="onSizeChange"
            @page-current-change="onCurrentChange"
          >
            <template #image="{ row, index }">
              <el-image
                preview-teleported
                loading="lazy"
                :src="'/api/article/cover/' + row.cover"
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
                @click="deleteArticleData(row.id)"
              >
                Delete
              </el-button>
              <el-button
                link
                type="primary"
                size="small"
                @click="addOrUpdateArticle(row)"
              >
                Update
              </el-button>
            </template>
          </pure-table>
        </el-card>
      </re-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import '@pureadmin/table/dist/style.css'
import { addArticle, updateArticle } from '@/api/articles'
import type { PageParams, ArticleParams } from '@/api/articles'
import { PureTable } from '@pureadmin/table'
import { useColumns } from './columns'
import { ref, h } from 'vue'
import forms from './form.vue'
import { ElMessage } from 'element-plus'

// 获取页面宽度
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

import {
  addDialog,
  closeDialog,
  updateDialog,
  closeAllDialog
} from '@/components/ReDialog'

const {
  ArticleData,
  loading,
  columns,
  pagination,
  loadingConfig,
  getArticleListData,
  deleteArticleData,
  onSizeChange,
  onCurrentChange
} = useColumns()

import ReCol from '@/components/ReCol'

defineOptions({
  name: 'Articles'
})

// 添加文章
const handleAddArticle = async (articleData: object) => {
  try {
    const res = await addArticle(articleData)
    if (res.code !== 200) {
      ElMessage.error(res.msg)
      return false
    }
    getArticleListData()
    ElMessage.success('添加成功')

    return true
  } catch (error) {
    ElMessage.error('添加失败')

    return false
  }
}

// 更新文章
const handleUpdateArticle = async (articleData: object) => {
  try {
    const res = await updateArticle(articleData)
    if (res.code !== 200) {
      ElMessage.error(res.msg)
      return false
    }
    ElMessage.success('更新成功')

    return true
  } catch (error) {
    ElMessage.error('更新失败')

    return false
  }
}

const articleFormRef = ref()
const addOrUpdateArticle = (row?: ArticleParams) => {
  addDialog({
    title: row ? '更新文章' : '添加文章',
    fullscreen: width.value < 768,
    props: {
      articleData: row || ({} as ArticleParams)
    },
    contentRenderer: () => h(forms, { ref: articleFormRef, articleData: row }),
    beforeSure: (done, { options }) => {
      const formRef = articleFormRef.value.getRef()
      const articleData = options.props.articleData

      formRef.validate(valid => {
        if (valid) {
          console.log(articleData)
          if (articleData.id) {
            handleUpdateArticle(articleData).then(res => {
              if (res) {
                done()
              }
            })
          } else {
            handleAddArticle(articleData).then(res => {
              if (res) {
                done()
              }
            })
          }
        }
      })
    }
  })
}
</script>

<style scoped></style>
