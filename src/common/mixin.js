export const userAddFormRulesMixin = {
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/ // 验证邮箱的正则表达式
      if (regEmail.test(value)) {
        return callback() // 合法邮箱
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的邮箱'))
    }
    // 验证手机的规则
    var checkMobeli = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的手机号码'))
    }
    return {
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '用户名长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobeli, trigger: 'blur' }
        ]
      },
      // 修改用户数据验证规则
      editFormRules: {
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入用户手机', trigger: 'blur' },
          { validator: checkMobeli, trigger: 'blur' }
        ]
      }
    }
  }
}
export const rolesFormRulesMixin = {
  data() {
    return {
      addFormRules: {
        roleName: [
          { required: true, message: '请输入角色名字', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '输入的范围是 3 ~ 10 为字符',
            triggetr: 'nlur'
          }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          {
            min: 5,
            max: 20,
            message: '输入的范围是 5 ~ 20 为字符',
            triggetr: 'nlur'
          }
        ]
      },
      editFormRules: {
        roleName: [
          { required: true, message: '请输入角色名字', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '输入的范围是 3 ~ 10 为字符',
            triggetr: 'nlur'
          }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          {
            min: 5,
            max: 20,
            message: '输入的范围是 5 ~ 20 为字符',
            triggetr: 'nlur'
          }
        ]
      }
    }
  }
}
export const paramsFormRulesMixin = {
  data() {
    return {
      // 添加表单的验证规则
      addFormRules: {
        attr_name: [
          { required: true, message: '请输入添加的分类', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      },
      // 修改表单的验证
      editFormRules: {
        attr_name: [
          { required: true, message: '请输入修改的信息', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
export const goodsAddFormRulesMixin = {
  data() {
    return {
      // 添加商品验证规则
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品的名称', trigger: 'blur' },
          {
            min: 2,
            max: 30,
            message: '请输入 2 ~ 30 范围的字符',
            trigger: 'blur'
          }
        ],
        goods_price: [{ required: true, message: '请输入商品的价格', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入商品的重量', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入商品的数量', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '请选择商品分类', trigger: 'blur' }]
      }
    }
  }
}
