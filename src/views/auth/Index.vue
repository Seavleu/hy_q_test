<script setup lang="ts"></script>

<template>
  <div class="login-con">
    <img src="@/assets/images/bg_login.png" alt="bg_login" />
    <div class="login-box">
      <div class="form">
        <!-- <img src="@/assets/images/login/txt_foot.png" alt="REC's Innovation" /> -->
        <p>
          신재생에너지 EMS 플랫폼<br />
          Hy-Q에 오신 것을 환영합니다.
        </p>
      </div>

      <div class="con">
        <p>
          <label>ID</label>
          <input v-model="user_id" type="text" placeholder="아이디 입력" />
        </p>
        <p>
          <label> PW </label>
          <input v-model="user_pw" type="password" @keyup.enter="login" placeholder="비밀번호 입력" />
        </p>
        <p>
          <input type="checkbox" id="saveLogin" v-model="save_login_id" @change="saveId()" /><label for="saveLogin"> 아이디
            저장 </label>
        </p>

        <div class="submit">
          <v-btn variant="outlined" block @click="login">로그인</v-btn>
        </div>
      </div>

      <dl class="foot">
        <dt>
          <!-- <img src="@/assets/images/login/txt_foot.png" alt="REC's Innovation" /> -->
        </dt>
        <dd>
          대표자 : 임정민 사업자등록번호 :142-81-86179 TEL : 061-820-7533 FAX : 070-8230-7533<br />
          주소 : 전남 나주시 교육길 13 스마트파크지식산업센터 G동 201호(본점), 202호(기업부설연구소)<br />
          Copyright ⓒ 2023 렉스이노베이션 All rights reserved.
        </dd>
      </dl>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./Index.scss" />
