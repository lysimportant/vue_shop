* http 是无状态的
* 通过 cookie 在客户端记录状态
* 通过 session 在服务器端记录状态
* 通过 token 方式维持状态
* 前端与服务器之间存在跨域问题时使用
* 登录前输入帐号、密码 -》 服务器验证后返回token -》 客户端保存token -》 后续请求都携带token数据发送请求（用户的验证） -》 服务器验证token是否通过
## 项目准备工作
* 开始项目前创建一个分支来书写 写完成后在合并分支  `git checkout -b name` :创建一个名为name的分支
* 清空不必要的文件

----
1. 创建一个Login组件(三标签) : `template`(一: 模板) `script`(二: 属性/方法) `<style lang="less" scoped>` (三: 样式 支持less并且具有作用域)
2. 创建路由组件: 并且使用重定向 `redirect` 如果用户访问的是根路由路径 会自动重定向到登录的路由组件
## Login组件:
  1. 背景居中 使用element-ui 设置头像框 使用 `position: abolut`  和 ` transform: translate(-50%, -50%);` 样式居中
  2. Element-ui 表单按钮的使用 因为设置了按需加载需要在 `plugins`文件夹下的`element.js` 配置引入的 `{Button, Form, FormItem, Input}`

* `<el-form label-width="80px">`(表单默认label属性占位80px) `<el-form-item label="用户名">`(一个项使用label属性左侧文字的显示)
	* 使用第三方的字体图标: 引入第三方的库 再到标签上使用类名
	* 将属性数据绑定到表单 `<el-form :rules="form" :model="loginForm">` form的对象中 `loginForm`的数据保存在data中
	* 在表单项中再通过v-model来访问表单对象的属性`<el-input v-model="loginForm.username"></el-input> `
	* 表单的数据验证: 给表单`<el-form>`绑定`rules`属性校验(存放在`data`) 例子: ` rules: { name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }] }`
		* `required` 必填不能为空 `message` 错误消息提示 `trigger`触发事件 `min/max` 最小/大输入长度
		* 通过`prop`属性`rules`调用验证: 给 `el-form-item` 添加而不是里面的标签 `el-input`: `<el-form-item prop="username">`
		* 表单的重置: 给`<el-form ref='loginForm'>` 绑定一个ref 通过$refs拿到组件对象,通过点击事件使用表单上自带的resetFields()重置方法
## Home组件

* 表单的预登录: `validate` 方法 对象rules的规则进行校验也是用过$refs拿到组件调用其身上的方法

	* 验证通过后发送axios(Ajax)请求 把axios引入并赋值给Vue的原型上(可以全局访问) :`Vue.prototype.$http = axios`
* 消息提示: 添加 message 全局(Vue原型)添加`$message = Message` error:失败的提示 success:成功的提示
* 登录成功之后的 token,保存到客户端的 sessionStorage(会话机制/只在当前页面生效)中 / localStorage(持久话机制/关闭页面也不会忘记数据)
* `window.sessionStorage.setItem('token', res.data.token)` 因为除了登录界面都需要token来验证操作所以登录时会保存token作为身份验证
* 保存token后自动跳转到后台界面 使用`this.$router.push('/home')`
* 防止别人直接访问`login`以外的路由,而需要调用 路由的 导航守卫 使用 `beforeEach` 离开之前 检查是否有token的存在如果没有就直接跳转到 login 页面
* `router.beforeEach((to, from, next) => {})` to 即将跳转到哪里(到那里去) from 在哪里跳转(从哪里来) next 放行枷(给不给走)
* 退出登录: 在home页面设置按钮 清空token并且跳转到 login

## 其他配置
* 配置Eslint的检测规则
  * 在根路径创建一个 格式化 配置的文件 `.prettierrc` 文件是JSON格式 `semi` true加分号/false不加分号 `singleQuote`: true为单引号/false为双引号
  * `.eslintrc.js`下取消func之间的空格: `'space-before-function-paren': 0` rules里面写
* 分支的推送: 把 本地分支 login 推送到远程仓库上 `git push -u remote branch` 
  * 如果远程仓库没有本地的分支则可以使用 `git push -u remote user`  在哪个分支上就是那个分支 来推送到远程仓库
  * 切换分支 -> 提交分支 -> 回到主分支合并分支 -> 推送主分支
  * pull
## Element-ui

### Asied

* element-ui 提供的组件,每个组件名都是它自己的类名

* 布局容器: Container Asied Main
  * 右侧菜单(二级可折叠) `el-menu`(最外层包裹菜单) `<el-submenu>`一级菜单 `<el-menu-item>` 二级菜单(里层)  `<template>` 菜单的模板(icon/span)

* 请求拦截器:  登录授权 请求验证是否有 token  需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
  * login 不需要 token 可以直接登录 登录进去后每次操作/请求都会验证 `Authorization` 的 token令牌

* 创建完成后立即发送 网络请求 请求左侧菜单栏的数据 get
  * 通过 async 和 await 来获取需要的数据 因为是数组所以可以使用 v-for 来遍历生成数据 第一级的icon不同的解决方法之一:定义一个对象来存放字体图标需要的类名  
  * 菜单栏只打开一个的可以给`el-menu` 添加 `unique-opened` 属性(1) 为 `true` |  折叠属性(2): `collapse` | 关闭过渡动画属性(3): `:collapse-transition="false"` | 
  * 左侧边栏的宽度变化(Aised): `:width="isCollapse ? '61px' : '200px'"` 利用三元表达式
  * 子菜单的跳转: `el-from` 有router(index属性)默认为false关闭的  index='/login' index做路由跳转
    * 里面的组件都是作为Home的子组件展示的,如果作为一个独立的路由而不是Home的子路由那么左侧的导航栏就销毁没有了
  * 左侧导航激活的高亮`:default-active="activePath"`: 点击导航-> 使用sessionStorage来保存激活的路径 并赋值给高亮的变量->  当离开再回来created时得到 sessionStorage 的路径 赋值给 高亮变量  (导航守卫.beforeEach)
 ### Mian

### 用户管理

  * 导航的名称: `el-breadcrumb` 面包屑 : 首页 > 用户管理 > 用户列表
  * 卡片搜索框的使用: `el-card` 配合 栅栏布局 使用 input复合框 : 样式配合 Row 和 Col的栅栏配合
  * 使用get获取用户数据 参数为 params  { params : {name:'LHJ'} }
  * 表格数据: `<el-table :data="数据源" stripe(avtice) border(边框)>` `<el-table-column prop="数据名" label="列的名字">`
    * 显示按钮使用作用预插槽: 在`<el-table-column>` 添加template模板再使用`v-slot`属性拿到当前槽作用域的布尔值 Boolean 再通过Switch组件显示 而在 `<el-table-column>` 使用了作用域插槽会覆盖当前层的prop所以可以删除prop 按钮使用时需要 插槽作用域
  * 分页: `pagination`: `page-sizes`	每页显示个数选择器的选项设置 `page-size`	每页显示条目个数，支持 .sync 修饰符	number  `layout`: 显示那些组件 监听改变事件 页码的修改 显示个数的修改 `handleSizeChange(newValue)` 监听显示页数的改变自带参数 是 新的值 `handleCurrentChange`监听页码的改变
  * 按钮状态的修改: 通过Switch的chang改变事件触发回调函数
  * necktick
  * 搜索功能: 给搜索框双向绑定到 `queryInfo.query` 因为搜索时根据它来的 再搜索按钮绑定点击事件发送用户数据请求,根据query返回对应的参数 , 清空搜索框并清空搜索的内容 element-ui的搜索框有自带的clear事件,点击清楚时再次发送用户数据请求,此时因为query已经清空所以返回的是默认的数据
  * 点击添加用户弹出 `:visible.sync = DialogVisble ` 为true显示反之隐藏
  * 添加 **el-form** 项 :model="绑定要显示数据的对象" :rules="绑定校验规则的对象" ref="重置表单数据素要的方法" 
      * 手机和邮箱验证规则: 在data里面与return同级 用变量接收一个箭头函数(ruel, value, callback) 里面时校验的正则表达式 通过直接callback() 不通过则callback(new Error(''))
      * 使用变量名的方法: `{ validator: checkEmail, trigger: 'blur' }` 在验证规则里面写下`validator: 变量名` 就可以调用正则表达式来验证邮箱或手机号码
* 调用form的validate属性判断数据是否合法,  值是true就发送网络请求添加用户 否则直接返回结束函数 post 对象 if(res.meta.status) 201为创建成功
  * 对话框的代码可以放到外面,只需要使用点击事件来变换 布尔值 就可以做到显示和隐藏
* 修改用户信息: 点击按钮使用作用插槽传id值,再发送axios.get请求获取当前id的用户 并将数据保存到起来
     * 点击确认按钮: 表单预登录验证 如果成功就发送 put请求并将保存的数据作为参数修改(因为双向绑定)
* 删除用户: 点击删除按钮 弹出对话框 -> 确认是否删除;  需要使用ui的 MessageBox 且要全局挂载在Vue.prototype.confirm = MessageBox .confirm



### 权限管理

* 添加两个 home 的子路由 rights/roles 

* 权限列表:  使用卡片再用过table绑定请求来的网络数据

* 角色列表: 使用table 最后一项需要按钮使用作用于插槽  
  * 其table第一个数据是展开项: 需要给el-table-column 绑定一个 expand 属性 此属性是展开卡片 index 索引
  
* Dialog 对话框的关闭  表单的清空
  *   点击按钮显示框 并获取数据 .点击确认按钮验证表单的 `rules ` 规则是否全通过返回 true 就发送相应的 修改/删除等操作
  * Dialog有关闭事件可以清空表单操作
  
  ```js
  el-table-column type="expand">
                <template v-slot="scope">
                  <el-row
                    :class="['bdtop', i1 === 0 ? 'bdbottom' : '', 'vcenter']"
                    v-for="(item1, i1) in scope.row.children"
                    :key="item1.id"
                  >
                    <!-- 渲染一级权限 -->
                    <el-col :span="5">
                      <el-tag
                        closable
                        @close="removeRightById(scope.row, item1.id)"
                        >{{ item1.authName }}</el-tag
                      >
                      <i class="el-icon-caret-right"></i>
                    </el-col>
  
                    <!-- 渲染二和三级权限 -->
                    <el-col :span="19">
                      <!-- 通过 for 嵌套 渲染二级权限 -->
                      <el-row
                        v-for="(item2, i2) in item1.children"
                        :key="item2.id"
                        :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                      >
                        <el-col :span="6">
                          <el-tag
                            type="success"
                            closable
                            @close="removeRightById(scope.row, item2.id)"
                          >
                            {{ item2.authName }}
                          </el-tag>
                          <i class="el-icon-caret-right"></i>
                        </el-col>
                        <el-col :span="18">
                          <el-tag
                            type="warning"
                            :class="[i3 === 0 ? '' : 'bdtop']"
                            v-for="(item3, i3) in item2.children"
                            :key="item3.id"
                            closable
                            @close="removeRightById(scope.row, item3.id)"
                          >
                            {{ item3.authName }}
                          </el-tag>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <!-- <pre>
                    {{ scope.row }}
                  </pre> -->
                </template>
              </el-table-column>
  ```
  
  

----



* 展开的设置: 使用 栅栏布局 嵌套 for 循环 遍历children ,el-row -> el-col**2 -> el-row -> el-col*2  
  * 栅栏row套栅栏会重置成24块样
* Tree 树形结构 : :data 要绑定的数据源 :prop展示的属性名字 `show-checkbox` 以复选框的形式 `node-key="id"`绑定id
  * `:default-checked-keys="defKeys"` 默认选中的 使用递归推送到数组中 没有子了直接推进数组 否则重再调用自己 
    * 递归的形式:  结束的条件  自己调用自己
  
  



### 商品分类

* 树形表格:由于 element-ui 没有 树形的表格要借助于第三方的 `vue-table-with-tree-grid`   [github地址](https://github.com/MisterTaki/vue-table-with-tree-grid)
  * columns｛ｌａｂｅｌ    template  type  prop｝   --  show-index   index-text　下面案例
* 分页: 由于获取用户的方法关系,可以每次修改 页码 或 页数 时直接重新发送获取用户请求

* 分类的添加:   

```javascript
 <!-- 添加分类的对话框   -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:">
          <!-- options 用来指定数据源 -->
          <!-- props 用来指定配置对象 expandTrigger: 触发方式 value(id) label(显示的文字) children(下层元素) -->
          <!-- v-model 双向绑定keys -->
          <el-cascader
            v-model="selectdKeys"
            :options="parentCateList"
            :props="{
              expandTrigger: 'hover',
              ...cascaderProps,
              checkStrictly: 'true'
            }"
            @change="parentCateChanged"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>

```

* tree-table

```js
<tree-table
          :data="cateList"
          :expand-type="false"
          :selection-type="false"
          show-index
          class="treetable"
          index-text="#"
          stripe
          border
          :show-row-hover="false"
          :columns="columns"
        >
          <!-- 是否有效 -->
          <!-- <template slot='isok' v-slot="scope"> -->
          <template v-slot:isok="scope">
            <i
              class="el-icon-success"
              v-if="scope.row.cat_deleted === false"
              style="color: lightgreen"
            ></i>
            <i class="el-icon-error" style="color: red" v-else></i>
          </template>
          <!-- 排序 -->
          <template v-slot:order="scope">
            <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag
              size="mini"
              type="success"
              v-else-if="scope.row.cat_level === 1"
              >二级</el-tag
            >
            <el-tag size="mini" type="warning" v-else>三级</el-tag>
          </template>
          <template v-slot:opt="scope">
            <el-button
              type="primary"
              @click="showeditCateDialog(scope.row)"
              icon="el-icon-edit"
              size="mini"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="removeCate(scope.row.cat_id)"
              icon="el-icon-delete"
              size="mini"
              >删除</el-button
            >
          </template>
        </tree-table>
```

* 级联选择框

  ```js
                <el-cascader
                  v-model="addForm.goods_cat" 选择出来的keys
                  :options="cateList" 绑定的数据元
                  :props="{ expandTrigger: 'hover', ...cateProps  (要显示的东西) }"
                  @change="handleChange" 选择项发生变化
                ></el-cascader>
               cateProps: {
                      label: 'cat_name', 显示的名字
                      value: 'cat_id', 双向绑定的id
                      children: 'children' 显示的子项
                    }
  ```

  
  
  * 判断双向绑定的 选择数组长度  不等于3表示没有选择对应的三级子级 可以把数组直接赋值为空 把一二级清空 
  * 接收参数前 把 attr_vals 进行分割成为数组,再由v-for循环遍历配合组件渲染
  
  ```js
  <!-- 渲染表单的item项 -->
              <el-form-item
                :label="item.attr_name"
                v-for="item in manyTableData"
                :key="item.attr_id"
              >
                <el-checkbox-group v-model="item.attr_vals">
                  <el-checkbox
                    border
                    :label="item"
                    v-for="(item, i) in item.attr_vals"
                    :key="i"
                    >{{ item }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-form-item>
  ```
  
  

* 图片的上传
  * 使用 element-ui的upload  删除操作 

  * ```js
     // 处理移除图片的操作
        handleRemove(file) {
          // 1. 获取将要删除的图片的临时路径
          const filePath = file.response.data.tmp_path
          // 2. 从 pics 数组中找到这个图片的对应的索引值
          const index = this.addForm.pics.findIndex(x => x.pic === filePath)
          // 3. 调用数组的splice方法,把图片信息对象,从pics数组中移除
          this.addForm.pics.splice(index, 1)
          console.log('移除图片', file, this.addForm)
        }
    ```

* 富文本: **vue-quill-editor**

# 项目优化

* nprogress 加载时进度条
  * NProgress.done() 隐藏进度条
  * NProgress.start() 展示进度条
    * 其条件可以在 请求拦截器里面设置

* 打包是 console的处理:  babel-plugin-transform-remove-console

  * plugins: [ "transform-remove-console"  ]

* 生成打包报告

  1. vue-cli-service build --report
  2. UI面版

* 项目优化 配置webpack

  * 如果程序员有修改 webpack 默认配置的需求，可以在项目根目录中，按需创建 vue.config.js 这个配置文件，从

    而对项目的打包发布过程做自定义的配置（具体配置参考 https://cli.vuejs.org/zh/config/#vue-config-js）。

  * 在 vue.config.js 导出的配置对象中，新增 configureWebpack 或 chainWebpack 节点，来自定义 webpack 

    的打包配置。

    在这里， configureWebpack 和 chainWebpack 的作用相同，唯一的区别就是它们修改 webpack 配置的方

    式不同：

    ①  chainWebpack 通过链式编程的形式，来修改默认的 webpack 配置

    ②  configureWebpack 通过操作对象的形式，来修改默认的 webpack 配置

    两者具体的使用差异，可参考如下网址：

    https://cli.vuejs.org/zh/guide/webpack.html#webpack-%E7%9B%B8%E5%85%B3

* **通过 externals 加载外部 CDN 资源**

  * 默认情况下，通过 import 语法导入的第三方依赖包，最终会被打包合并到同一个文件中，从而导致打包成功后，单文件体积过大的问题。
  * 为了解决上述问题，可以通过 webpack 的 externals 节点，来配置并加载外部的 CDN 资源。凡是声明在externals 中的第三方依赖包，都不会被打包。
  * 开发时直接下载引瑞
    * 发布时把直接引入可以省的包 使用window全局的方式来查找  也就是说 CDN 挂载 通过CDN挂载的方式进行引用

* 路由来加载

  ```
  // 分组名生成文件
  const Login = () => import(/* webpackChunkName: "login_home_welome" */ 'components/login/Login')
  const Home = () => import(/* webpackChunkName: "login_home_welome" */ 'components/home/Home')
  const Welcome = () => import(/* webpackChunkName: "login_home_welome" */ 'components/home/welcome/Welcome')
  
  const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ 'components/home/users/Users')
  const Rights = () => import(/* webpackChunkName: "Users_Rights_Roles" */ 'components/home/power/rights/Rights')
  const Roles = () => import(/* webpackChunkName: "Users_Rights_Roles" */ 'components/home/power/roles/Roles')
  
  const Cate = () => import(/* webpackChunkName: "Cate_Params" */ 'components/home/goods/cate/Cate')
  const Params = () => import(/* webpackChunkName: "Cate_Params" */ 'components/home/goods/params/Params')
  
  const GoodsList = () => import(/* webpackChunkName: "GoodsList_Add" */ 'components/home/goods/list/List')
  const Add = () => import(/* webpackChunkName: "GoodsList_Add" */ 'components/home/goods/list/children/Add')
  
  const Order = () => import(/* webpackChunkName: "Order_Report" */ 'components/home/order/Order')
  const Report = () => import(/* webpackChunkName: "Order_Report" */ 'components/home/report/Report')
  // 独立生成一个文件
  const Login = () => import('components/login/Login')
  const Home = () => import('components/home/Home')
  const Welcome = () => import('components/home/welcome/Welcome')
  
  const Users = () => import('components/home/users/Users')
  const Rights = () => import('components/home/power/rights/Rights')
  const Roles = () => import('components/home/power/roles/Roles')
  
  const Cate = () => import('components/home/goods/cate/Cate')
  const Params = () => import('components/home/goods/params/Params')
  
  const GoodsList = () => import('components/home/goods/list/List')
  const Add = () => import('components/home/goods/list/children/Add')
  
  const Order = () => import('components/home/order/Order')
  const Report = () => import('components/home/report/Report')
  
  ```



* 开启gzip包  compression
* 开启 HTTPS 
  * 官网: https://freessl.org/
  * 
* pm2 关闭命令行窗口依旧执行
  * npm i pm2 -g
    * 启动项目: pm2 start script --name(自定义名字)
    * 查看运行项目：pm2 ls 
    * 重启项目：pm2 restart 自定义名称
    * 停止项目：pm2 stop 自定义名称
    * 删除项目：pm2 delete 自定义名称