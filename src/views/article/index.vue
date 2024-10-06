<template>
  <div>
    <el-row>
      <re-col>
        <el-card class="mb-4">
          <div class="flex justify-between">
            <div>
              <h3 class="text-xl font-bold">文章列表</h3>
            </div>
            <el-button type="primary">添加文章</el-button>
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
                @click="handleClick(row)"
              >
                Detail
              </el-button>
              <el-button link type="primary" size="small">Edit</el-button>
            </template>
          </pure-table>
        </el-card>
      </re-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import '@pureadmin/table/dist/style.css'
import type { PageParams, ArticleParams } from '@/api/articles'
import { PureTable } from '@pureadmin/table'
import { useColumns } from './columns'

const {
  ArticleData,
  loading,
  columns,
  pagination,
  loadingConfig,
  onSizeChange,
  onCurrentChange
} = useColumns()

import ReCol from '@/components/ReCol'

defineOptions({
  name: 'Articles'
})

const handleClick = (row: ArticleParams) => {
  console.log(row)
}
</script>

<style scoped></style>
