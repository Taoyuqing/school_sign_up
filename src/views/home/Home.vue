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
          name="请输入姓名"
          left-icon="user-o"
          placeholder="请输入姓名"
          label-align="right"
          :rules="[{ required: true, message: '请输入姓名' }]"
        />
        <van-field
          v-model="username"
          name="请输入身份证号"
          left-icon="idcard"
          label-align="right"
          placeholder="请输入身份证号"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="username"
          name="请输入手机号"
          left-icon="phone-o"
          label-align="right"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="username"
          name="报考专业"
          left-icon="apps-o"
          label-align="right"
          placeholder="报考专业"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />

        <van-field
          v-model="username"
          name="考试时间"
          left-icon="calendar-o"
          label-align="right"
          placeholder="考试时间"
          :rules="[{ required: true, message: '请选择考试时间' }]"
        />
        <van-field
          v-model="username"
          name="报名费用"
          left-icon="balance-o"
          label-align="right"
          placeholder="报名费用"
          :rules="[{ required: true, message: '报名费用' }]"
        />
      </van-form>
      <div style="padding:0px 20px">
        <van-button
          type="primary"
          native-type="submit"
          round
          size="large"
          @click="payClick"
          >{{msg}}</van-button
        >
      </div>
      <div style="padding:0px 20px">
        <van-button
          type="primary"
          native-type="submit"
          round
          size="large"
          @click="authorizeClick"
          >点击授权（按钮临时存在的 到时候不会这么做）</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getauthorize, createOrder, getUrlParam } from '../../utils/wxUtils'
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      username: '',
      msg:'提交并缴费'
    }
  },
  mounted() {},
  methods: {
    onSubmit() {},
    async payClick() {
      let code = getUrlParam('code')
      let openid = localStorage.getItem('openid')
      if (!openid) {
        let data = await this.$http.get('/jbjg/pay/getOpenId', {
          params: {
            code
          }
        })
        openid = data.data
        localStorage.setItem('openid', openid)
      }
      createOrder(openid, () => {
        this.msg = '已支付'
      })
    },
    authorizeClick() {
      getauthorize()
    }
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
