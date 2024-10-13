import { getCourseCategoryAPI, deleteCourseCategoryAPI } from '@/api/course'
import type { CourseCategoryParams } from '@/api/course'
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

export const useTag = () => {
  const courseCategoryList = ref<CourseCategoryParams[]>([])

  const courseCategoryColumns: TableColumnList = [
    {
      label: 'ID',
      prop: 'id',
      width: 80
    },
    {
      label: '分类名称',
      prop: 'name'
    },
    {
      label: '分类描述',
      prop: 'desc'
    },
    {
      label: '创建时间',
      prop: 'create_time'
    },
    {
      label: '更新时间',
      prop: 'update_time'
    },
    {
      label: '操作',
      width: '200',
      fixed: 'right',
      slot: 'operation'
    }
  ]

  // 获取课程分类
  const getCourseCategoryList = async () => {
    const res = await getCourseCategoryAPI()
    if (res.code !== 200) {
      ElMessage.error(res.msg)
      return
    }

    if (res.data) {
      courseCategoryList.value = res.data
      // 根据 id 排序
      courseCategoryList.value.sort((a, b) => a.id - b.id)
      console.log(courseCategoryList.value)
    }
  }

  // 删除课程分类
  const handleDeleteCourseCategory = async (id: number) => {
    ElMessageBox.confirm('确定删除该课程分类吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const res = await deleteCourseCategoryAPI(id)
      if (res.code !== 200) {
        ElMessage.error(res.msg)
        return
      }

      ElMessage.success('删除成功')
      getCourseCategoryList()
    })
  }

  onMounted(() => {
    getCourseCategoryList()
  })

  return {
    courseCategoryList,
    courseCategoryColumns,
    getCourseCategoryList,
    handleDeleteCourseCategory
  }
}
