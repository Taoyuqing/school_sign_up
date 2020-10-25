<template>
  <div class="home">
    <div class="logo-div">
      <img src="../../assets/u45.png" class="log" />
      <span>补考报名</span>
    </div>
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          left-icon="user-o"
          placeholder="用户名"
          label-align="right"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="username"
          name="用户名"
          left-icon="idcard"
          label-align="right"
          placeholder="请输入身份证号"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="username"
          name="用户名"
          left-icon="phone-o"
          label-align="right"
          placeholder="请输入身份证号"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="username"
          name="用户名"
          left-icon="apps-o"
          label-align="right"
          placeholder="请输入身份证号"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        
        <van-field
          v-model="username"
          name="用户名"
          left-icon="calendar-o"
          label-align="right"
          placeholder="请输入身份证号"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="username"
          name="用户名"
          left-icon="balance-o"
          label-align="right"
          placeholder="请输入身份证号"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
      </van-form>
      <div style="padding:0px 20px">
        <van-button type="primary" round size="large">大号按钮</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      username: ''
    }
  },
  methods: {
    onSubmit() {}
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/common.scss';
.logo-div {
  width: px2rem(375);
  height: px2rem(100);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .log {
    width: px2rem(70);
  }
  span {
    font-size: px2rem(20);
    font-weight: 600;
    margin-left: px2rem(10);
  }
}
</style>
