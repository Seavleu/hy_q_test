<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { images } from '@/constants'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const { cookies } = useCookies()
const authStore = useAuthStore()

const userId = ref('')
const userPw = ref('')
const errorMessage = ref(false)
const saveLoginId = ref(false)

const login = async () => {
  const success = await authStore.login(userId.value, userPw.value)
  if (success) {
    router.push('/')
  } else {
    errorMessage.value = true
  }
}

const saveId = () => {
  if (saveLoginId.value && userId.value) {
    cookies.set('hy_q_id', userId.value)
  } else {
    cookies.remove('hy_q_id')
  }
}

onMounted(() => {
  const savedId = cookies.get('hy_q_id')
  if (savedId) {
    userId.value = savedId
    saveLoginId.value = true
  }
})
</script>

<template>
  <div class="login-con">
    <img :src="images.bg_login" alt="bg_login" />
    <div class="login-box">
      <div class="form">
        <img :src="images.logo" alt="hyq_logo" />
        <p>
          신재생에너지 EMS 플랫폼<br />
          Hy-Q에 오신 것을 환영합니다.
        </p>
      </div>
      <div class="con">
        <p>
          <label>ID</label>
          <input v-model="userId" type="text" placeholder="아이디 입력" />
        </p>
        <p>
          <label>PW</label>
          <input v-model="userPw" type="password" @keyup.enter="login" placeholder="비밀번호 입력" />
        </p>
        <p>
          <input type="checkbox" id="saveLogin" v-model="saveLoginId" @change="saveId" />
          <label for="saveLogin"></label>
          <span>아이디 저장</span>
        </p>
        <div class="submit">
          <v-btn variant="outlined" block @click="login">로그인</v-btn>
          <v-dialog v-model="errorMessage" class="backdrop" width="auto">
            <div class="card">
              <p>1544-0000</p>
              <dl>
                <dt>
                  아이디와 비밀번호가 일치하지 않습니다.<br />
                  관리자에게 문의해주세요.
                </dt>
                <dd>
                  <v-btn color="#E83830" flat @click="(errorMessage = false)">확인</v-btn>
                </dd>
              </dl>
            </div>
          </v-dialog>
        </div>
      </div>
      <dl class="foot">
        <dt><img :src="images.footer" alt="REC's Innovation" /></dt>
        <dd>
          대표자 : 임정민 사업자등록번호 :142-81-86179 TEL : 061-820-7533 FAX :
          070-8230-7533<br />
          주소 : 전남 나주시 교육길 13 스마트파크지식산업센터 G동 201호(본점),
          202호(기업부설연구소)<br />
          Copyright ⓒ 2023 렉스이노베이션 All rights reserved.
        </dd>
      </dl>
    </div>
  </div>
</template>

<style scoped lang="scss" src="@/assets/styles/auth.scss" />
