<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const navItems = useRouter().options.routes.find((x) => x.name === 'sub').children
    return {
      navItems
    }
  },
  data() {
    return {
      userInfo: this.$cookies.get('user_info')
    }
  },
  methods: {
    logout() {
      this.$cookies.remove('user_info')
      this.$cookies.remove('token')
      this.$router.push('/login')
    }
  },
  mounted() {},
  watch: {}
}
</script>

<template>
  <header id="header">
    <h1>
      <RouterLink to="/">
        <img src="/src/assets/images/logo.svg" alt="Hy-Q" />
      </RouterLink>
    </h1>
    <nav id="nav">
      <ul>
        <li v-for="item in navItems" :class="{ active: $route.path === item.path || $route.path.indexOf(item.meta.path) !== -1 }">
          <RouterLink :to="item.path">{{ item.meta.title }}</RouterLink>
        </li>
      </ul>
    </nav>
    <div class="side">
      <div class="user-info" v-if="userInfo">{{ userInfo.plant_name }}</div>
      <div class="btn-member">
        <a class="ico-box seting" @click="this.$router.push('/setting/device')">설정</a>
        <a class="ico-box logout" @click="logout">로그아웃</a>
      </div>
    </div>
  </header>
</template>
