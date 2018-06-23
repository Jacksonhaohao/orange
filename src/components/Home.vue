<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
          <div class="logo_tile">
            <img src="../assets/heima_logo.png" alt="">
            <h2>电商后台管理系统</h2>
          </div>
          <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
          <!-- 侧边栏 -->
          <el-aside :width="iscollapse ? '65px' : '200px'">
            <!-- 折叠展开的按钮 -->
            <div class="toggleBar" @click="iscollapse =! iscollapse">|||</div>
            <!-- meun菜单 -->
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              router
              :collapse-transition="false"
              :collapse="iscollapse"
              background-color="#333744"
              text-color="#fff"
              active-text-color="#409EFF">
              <!-- 循环创建一级菜单 -->
              <el-submenu :index="item.id + ''" v-for=" (item, i) in menus" :key="item.id" :class="iscollapse ? 'el_submenu_small' : 'el_submenu_large'">
                <template slot="title">
                  <i :class="['iconfont', iconlist[i]]"></i>
                  <span>{{item.authName}}</span>
                </template>
                <!-- 循环创建二级菜单 -->
                <el-menu-item :index="'/' + submenu.path" v-for="submenu in item.children" :key="submenu.id">
                  <i class="el-icon-menu"></i>
                  {{submenu.authName}}
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
          <!-- 主题内容区 -->
          <el-main>Main</el-main>
        </el-container>
      </el-container>
</template>
<script>
export default {
  data () {
    return {
      menus: [],
      iconlist: ['icon-users', 'icon-tijikongjian', 'icon-shangpin', 'icon-danju', 'icon-baobiao'],
      // 是否被折叠,默认为false
      iscollapse: false
    }
  },
  created () {
    this.getMeuns()
  },
  methods: {
    logout () {
      // 清空token信息
      window.sessionStorage.removeItem('token')
      // 请致跳转到登录页面
      this.$router.push('/login')
    },
    async getMeuns () {
      // 发axios请求左侧菜单数据
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取左侧列表失败!')
      // 如果成功把数据存到data中的menus中
      this.menus = res.data
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background: #373d41;
  display: flex;
  justify-content: space-between; // 让盒子内的元素平均间隔布局,
  // 只有两个则第一个在起始位置,后一个在盒子相对一侧
  padding-left: 0;
  user-select: none; // 不允许对元素选中,复制等操作,即鼠标单击经过不会变蓝
  .logo_tile {
    display: flex;
    justify-content: center;
    color: #fff;
    img {
      margin-right: 20px;
    }
    h2 {
      font-weight: 200;
    }
  }
  .el-button {
    padding-top: 5px;
    padding-bottom: 5px;
    height: 30px;
    margin-top:17px;
  }
}
.el-aside {
  background: #333744;
  user-select: none;
  .toggleBar {
    font-size: 12px;
    background: #4a5064;
    color: #fff;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
    user-select: none;
    letter-spacing: 0.2em;// 调节中文每个字母间的间距  word-spacing可以调节汉字之间的间距
  }
  .el_submenu_large {
    width: 200px;
  }
  .el_submenu_small {
    width: 65px;
  }
}
.el-main {
  background: #eaedf1;
}
</style>
