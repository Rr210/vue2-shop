<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-11-02 09:57:40
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-11-03 09:22:15
 * @LastEditors: Harry
-->
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片模式 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="query"
            clearable
            @clear="clearSearchInput"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getOrderLists"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格数据展示 -->
      <el-table :data="orderLists" stripe border>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scoped">
            <el-tag
              size="small"
              :type="scoped.row.pay_status === '1' ? '' : 'danger'"
              effect="dark"
            >
              {{ scoped.row.pay_status === "1" ? "已付款" : "未付款" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scopedTime">
            {{ scopedTime.row.create_time | transiTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改订单地址"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editOrderAddress(scope.row)"
                circle
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="物流信息"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="success"
                size="mini"
                icon="el-icon-location-outline"
                circle
                @click="searchLogisitics(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
        <el-form
          :model="ruleForm"
          :rules="addressForm"
          ref="addressForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="省市区/县" prop="address1">
            <el-cascader
              size="large"
              :options="options"
              v-model="ruleForm.address1"
              @change="handleChange"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address2">
            <el-input v-model="ruleForm.address2"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addressF('addressForm')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 订单信息 -->
      <el-dialog title="物流进度" :visible.sync="dialogdd" width="60%">
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(item, index) in OrderLogistics"
            :key="index"
            :timestamp="item.time"
          >
            {{ item.context }}
          </el-timeline-item>
        </el-timeline>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
export default {
  data() {
    return {
      dialogdd: false,
      OrderLogistics: [],
      ruleForm: {
        address1: [],
        address2: ''
      },
      addressForm: {
        address1: [
          { required: true, message: '请选择省市区', trigger: 'submit' }
        ],
        address2: [
          { required: true, message: '请填写详细的住址', trigger: 'blur' }
        ]
      },
      query: '',
      pagenum: 1,
      pagesize: 5,
      total: 0,
      orderLists: [],
      dialogVisible: false,
      options: regionData,
      selectedOptions: '',
      reverse: ''
    }
  },
  created() {},
  mounted() {
    this.getOrderLists()
  },
  methods: {
    addressF(ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.$message.success('模拟提交成功')
          this.dialogVisible = !this.dialogVisible
          this.$refs[ref].resetFields()
        }
      })
    },
    handleChange(value) {
      console.log(value)
    },
    // 页面数量发生变化时
    handleSizeChange(e) {
      this.pagesize = e
      this.getOrderLists()
    },
    // 当前页面改变时
    handleCurrentChange(num) {
      this.pagenum = num
      this.getOrderLists()
    },
    async getOrderLists() {
      const params = {
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }
      const { data: res } = await this.$http.get('orders', {
        params
      })
      if (res.meta.status === 200) {
        this.total = res.data.total
        this.orderLists = res.data.goods
      }
      console.log(res)
    },
    // 清空搜索框时的事件
    clearSearchInput() {
      this.getOrderLists()
    },
    // 修改订单的地址
    editOrderAddress(id) {
      this.dialogVisible = !this.dialogVisible
    },
    async searchLogisitics(id) {
      console.log(id)
      this.dialogdd = !this.dialogdd
      // const { data: res } = await this.$http.get(`/kuaidi/${data.order_id}`)
      const { data: res } = await this.$http.get(`kuaidi/${id.user_id}`)
      console.log(res)
      this.OrderLogistics = res.data
      this.$message.success(res.meta.message)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
