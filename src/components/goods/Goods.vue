<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-09-28 20:52:35
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-11-03 18:14:53
 * @LastEditors: Harry
-->
<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="goodsParams.query"
            clearable
            @clear="clearSearchInput"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsLists"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button style="font-size: 12px" type="primary" @click="addGoods"
            >添加商品
          </el-button>
        </el-col>
      </el-row>
      <!-- 表格模块 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          label="商品名称"
          prop="goods_name"
          width="500"
        ></el-table-column>
        <el-table-column label="商品价格" prop="goods_price"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
        <el-table-column label="创建时间" prop="add_time">
          <template slot-scope="scope">
            {{ scope.row.add_time | transiTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope1">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editCurrentUser(scope1.row.goods_id)"
              circle
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteUser(scope1.row.goods_id)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="goodsParams.pagenum - 0"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="goodsParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  data() {
    return {
      dialogVisible: false,
      // 商品的展示数据
      goodsList: [],
      // 搜索关键词
      query: '',
      goodsParams: {
        query: '',
        pagesize: 10,
        pagenum: 1
      },
      total: 0
    }
  },
  created() {
    this.getGoodsLists()
  },
  filters: {
    transiTime(timestamp) {
      /**
       *  时间戳转时间（10位）
       */
      const date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = date.getFullYear()
      const M =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1

      function change(stage) {
        if (stage < 10) {
          return '0' + stage
        } else {
          return stage
        }
      }
      const D = change(date.getDate())
      const h = change(date.getHours()) // 小时
      const m = change(date.getMinutes()) // 分钟
      // const s = change(date.getSeconds()) // 秒
      // return Y + M + D + h + m
      return `${Y}-${M}-${D} ${h}:${m}`
    }
  },
  methods: {
    // 获取当前页面需要请求的数据数量
    handleSizeChange(pagesize) {
      this.goodsParams.pagesize = pagesize
      this.getGoodsLists()
    },
    // 获取某个页面的数据信息
    handleCurrentChange(pagenum) {
      this.goodsParams.pagenum = pagenum
      this.getGoodsLists()
    },
    clearSearchInput() {
      this.getGoodsLists()
    },
    async getGoodsLists() {
      const { data: res } = await this.$http.get('goods', {
        params: this.goodsParams
      })
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg)
        console.log(res)
        const { goods, pagenum, total } = res.data
        this.goodsList = goods
        this.goodsParams.pagenum = pagenum
        this.total = total
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    // 跳转到添加商品的界面
    addGoods() {
      this.$router.replace('/goods/add')
    },

    // 根据关键词进行商品的搜索
    SearchQuery() {},
    // 编辑当前的商品信息
    editCurrentUser() {},
    // 删除当前商品
    async deleteUser(id) {
      console.log(typeof id)
      const res = await this.$confirm(
        '此操作将永久删除该商品, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then((result) => result)
        .catch((err) => err)
      if (res === 'confirm') {
        const { data: res } = await this.$http.delete(`goods/${id}`)
        if (res.meta.status === 200) {
          return this.$message.success(res.meta.message)
        }
        this.$message.error(res.meta.message)
      } else {
        this.$message.info('取消删除')
      }
    }
  }
  //   // 格式化10位字符的时间戳
}
</script>

<style>
/* a{
  color:#1caa0f
} */
</style>
