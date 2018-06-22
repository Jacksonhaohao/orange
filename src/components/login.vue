<template>
    <div class="login-container">
        <div class="logo">
            <img src="../assets/logo.png" alt="">
        </div>
        <!-- 登陆的ui结构 -->
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0" class="loginIuput">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username">
              <!-- 使用solt 为输入框设置图标 -->
              <i slot="prefix" class="iconfont icon-user"></i>
            </el-input>
          </el-form-item>
          <!-- 密码框结构 -->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password">
              <i slot="prefix" class="iconfont icon-3702mima"></i>
            </el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btn">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        // 登录名的校验规则
        username: [
          { required: true, message: '请输入登录名称', tiggler: 'bulr' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', tiggler: 'bulr' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // 验证表单
      this.$refs.loginFormRef.validate(async valid => {
        // 验证失败,立即return
        if (!valid) return
        // 发起登录的请求
        const {data: res} = await this.$http.post('login', this.loginForm)
        // 登录失败
        if (res.meta.status !== 200) return this.$message.error('登录失败! ')
        // 登陆成功
        this.$message.success('登陆成功! ')
        // 把登陆后的令牌保存到sessionStorage
        window.sessionStorage.setItem('token', res.data.token)
        // 使用js API 实现登路跳转
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  width: 450px;
  height: 304px;
  background: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 25%;
}
.logo {
  height: 130px;
  width: 130px;
  border-radius: 50%;
  padding: 10px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px #eee;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-60px);
  background: rgba(187, 138, 34, 0.8);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #eee;
  }
}
.loginIuput {
  padding: 0 20px;
  margin-top: 110px;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>
