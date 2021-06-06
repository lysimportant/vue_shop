<template>
  <div class="list">
    <Breadcrumb name1="商品管理" name2="商品列表" />
    <el-card>
      <!-- 按钮搜索/添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" @clear="getGoofsList" clearable v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getGoofsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- table区域 -->
      <el-row>
        <el-table :data="goodsList" border style="width: 100%">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="goods_name" label="商品名称"></el-table-column>
          <el-table-column prop="goods_price" label="价格(元)" width="110px"></el-table-column>
          <!-- <el-table-column
            prop="goods_number"
            width="120px"
            label="商品数量"
          ></el-table-column> -->
          <el-table-column prop="goods_weight" label="商品重量" width="130px"></el-table-column>
          <el-table-column width="220px" label="创建时间">
            <template v-slot="scope">
              {{ scope.row.add_time | dataFormat }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template v-slot="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.goods_id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[7, 11, 15, 19]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from 'components/content/breadcrumb/Breadcrumb'
export default {
  name: 'List',
  components: {
    Breadcrumb
  },
  data() {
    return {
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 7
      },
      // 商品列表
      goodsList: [],
      // 总数据条数
      total: 0
    }
  },
  created() {
    this.getGoofsList()
  },
  methods: {
    // 根据分页获取列表数据
    async getGoofsList() {
      const { data: res } = await this.$http.get('goods', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败!')
      }
      this.$message.success('获取商品列表成功!')
      this.goodsList = res.data.goods
      this.total = res.data.total
      console.log(res.data)
    },
    // 显示的页数改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoofsList()
    },
    // 页码的改变
    handleCurrentChange(newValue) {
      this.queryInfo.pagenum = newValue
      this.getGoofsList()
    },
    async removeById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('删除操作已取消!')
      }
      const { data: res } = await this.$http.delete('goods/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败!')
      }
      this.$message.success('删除成功!')
      this.getGoofsList()
    },
    goAddpage() {
      this.$router.push('goods/add')
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin: 15px 0 0;
}
</style>
