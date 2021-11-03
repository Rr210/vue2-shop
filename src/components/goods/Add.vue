<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-10-20 09:50:44
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-11-03 17:12:02
 * @LastEditors: Harry
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加商品的卡片表单 -->
    <el-card>
      <el-alert
        :closable="false"
        title="添加商品信息"
        type="info"
        center
        show-icon
      >
      </el-alert>
      <!-- 不走条 -->
      <div class="steps_w">
        <el-steps
          :active="isActiveIndex - 0"
          align-center
          finish-status="success"
        >
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <!-- tabs标签 -->
        <div class="steps_w">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
            label-position="top"
          >
            <el-tabs
              :tab-position="tabPosition"
              v-model="isActiveIndex"
              :before-leave="beforeTabLeave"
              @tab-click="currentClickTabs"
            >
              <el-tab-pane label="基本信息" name="0">
                <el-form-item label="商品名称" prop="goods_name">
                  <el-input v-model="ruleForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="goods_price">
                  <el-input
                    type="number"
                    v-model.number="ruleForm.goods_price"
                  ></el-input>
                </el-form-item>
                <el-form-item label="商品重量" prop="goods_weight">
                  <el-input
                    v-model.number="ruleForm.goods_weight"
                    type="number"
                  ></el-input>
                </el-form-item>
                <el-form-item label="商品数量" prop="goods_number">
                  <el-input
                    v-model.number="ruleForm.goods_number"
                    type="number"
                  ></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="goods_cat">
                  <el-cascader
                    v-model="ruleForm.goods_cat"
                    :props="Good_props"
                    :options="options"
                    @change="handleChange"
                    clearable
                  ></el-cascader>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="商品参数" name="1">
                <el-form-item
                  v-for="(item, index) in manyDetails"
                  :key="index"
                  :label="item.attr_name"
                >
                  <el-checkbox-group v-model="item.attr_vals">
                    <el-checkbox
                      v-for="(cb, i) in item.attr_vals"
                      :key="i"
                      :label="cb"
                      border
                    ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="商品属性" name="2">
                <el-form-item
                  v-for="(item, i) in onlyDetails"
                  :label="item.attr_name"
                  prop="attr_vals"
                  :key="i"
                >
                  <el-input v-model="item.attr_vals"></el-input>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="商品图片" name="3">
                <el-upload
                  :headers="headers_config"
                  class="upload-demo"
                  action="https://sapi.mr90.top/api/private/v1/upload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  list-type="picture"
                  :on-success="handleSuccess"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
                <!-- <el-upload
                  action="https://sapi.mr90.top/api/private/v1/upload"
                  list-type="picture-card"
                  :auto-upload="false"
                >
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{ file }">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                      >
                        <i class="el-icon-download"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload> -->
              </el-tab-pane>
              <el-tab-pane label="商品内容" name="4">
                <quill-editor
                  ref="myQuillEditor"
                  v-model="ruleForm.goods_introduce"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
                />
                <el-button type="primary" class="sub_w" @click="addGoods"
                  >添加商品</el-button
                >
              </el-tab-pane>
            </el-tabs>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
const _ = require('lodash')
export default {
  name: 'Add',
  data() {
    return {
      tabPosition: 'left',
      isActiveIndex: '0',
      manyDetails: [],
      onlyDetails: [],
      ruleForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      Good_props: {
        value: 'cat_id',
        label: 'cat_name'
      },
      options: [],
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          {
            required: true,
            message: '请输入商品价格',
            trigger: 'blur'
          }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请输入商品的分类', trigger: 'change' }
        ]
      },
      // 上传图片的图片列表
      fileList: [],
      file: {
        url: ''
      },
      dialogVisible: false,
      dialogImageUrl: '',
      headers_config: {
        Authorization: window.sessionStorage.getItem('token')
      },
      editorOption: {}
    }
  },
  created() {
    window.sessionStorage.removeItem('ispathActive')
  },
  mounted() {
    this.getCates()
  },
  computed: {
    cardId() {
      if (this.ruleForm.goods_cat.length === 3) {
        return this.ruleForm.goods_cat[2]
      }
      return false
    }
  },
  methods: {
    // 获取分类列表
    async getCates() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status === 200) {
        this.options = res.data
      }
    },
    handleChange(e) {
      if (e.length !== 3) {
        this.$message.warning('只能选中三级属性')
        this.ruleForm.goods_cat = []
      }
    },
    // 监听用户点击Tab切换事件
    beforeTabLeave(newValue, oldValue) {
      if (oldValue === '0' && this.ruleForm.goods_cat.length !== 3) {
        this.$message.error('你还未选中商品的分类')
        return false
      }
    },
    async currentClickTabs() {
      if (this.isActiveIndex === '1') {
        const { data: res } = await this.$http.get(
          `categories/${this.cardId}/attributes`,
          {
            params: { sel: 'many' }
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('参数列表获取失败')
        } else {
          this.$message.success(res.meta.msg)
          // 对参数的介绍进行分隔已数组的形式显示
          const arr = res.data
          arr.forEach((v) => {
            v.attr_vals =
              v.attr_vals.length === 0 ? [] : v.attr_vals.split(',')
          })
          this.manyDetails = arr
        }
      } else if (this.isActiveIndex === '2') {
        const { data: res1 } = await this.$http.get(
          `categories/${this.cardId}/attributes`,
          {
            params: {
              sel: 'only'
            }
          }
        )
        console.log(res1.data)
        this.onlyDetails = res1.data
      }
    },
    // 加入商品
    addGoods() {
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (valid) {
          // 深拷贝不能影响v - modle里面得值
          this.snhandle()
          const newobj = _.cloneDeep(this.ruleForm)
          newobj.goods_cat = newobj.goods_cat.join(',')
          const { data: res } = await this.$http.post('goods', newobj)
          // 对静态数据进行处理
          if (res.meta.status !== 201) {
            return this.$message.error(res.meta.msg)
          }
          this.$router.push('/goods')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 对静态和动态数据进行处理
    snhandle() {
      this.onlyDetails.forEach((v) => {
        const data = {
          attr_id: v.attr_id,
          attr_value: v.attr_vals
        }
        this.ruleForm.attrs.push(data)
      })
      // 对动态得数据进行处理
      this.manyDetails.forEach((v) => {
        const data = {
          attr_id: v.attr_id,
          attr_value: v.attr_vals.join(' ')
        }
        this.ruleForm.attrs.push(data)
      })
    },
    // 预览时的事件 处理
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(response, file) {
      // console.log(response, file)
      const tmpPath = file.response.data.tmp_path
      this.ruleForm.pics.push({ pic: tmpPath })
    },
    // 移除图片时的事件处理方法
    handleRemove(file) {
      const removeFileName = file.response.data.tmp_path
      const i = this.ruleForm.pics.findIndex((x) => x.pic === removeFileName)
      this.ruleForm.pics.splice(i, 1)
    },
    // 当用户下载的时的事件处理
    handleDownload(file) {
      console.log(file)
    },
    // 处理图片卡片的预览事件
    handlePictureCardPreview(e) {
      console.log(e)
    },
    // 富文本失去焦点
    onEditorBlur(e) {
      console.log(e)
    },
    // 富文本编辑框得到焦点
    onEditorFocus(e) {
      console.log(e)
    },
    // 富文本准备阶段的事件
    onEditorReady(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="sass" scoped>
.steps_w
  margin-top: 20px
.el-checkbox
  margin: 0 5px 0 0 !important
.sub_w
  margin-top: 20px
</style>
