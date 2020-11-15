<template>
  <div class="home">
    <div class="logo-div">
      <img src="../../assets/u45.png" class="log" />
      <span>继续报名</span>
    </div>
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="ksname"
          name="请输入姓名"
          left-icon="user-o"
          placeholder="请输入姓名"
          label-align="right"
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="kscardno"
          left-icon="idcard"
          label-align="right"
          placeholder="请输入身份证号"
          :rules="[{ validator: checkIdCard, required: true }]"
        />
        <van-field
          v-model="telno"
          name="请输入手机号"
          left-icon="phone-o"
          label-align="right"
          placeholder="请输入手机号"
          :rules="[{ validator: checkPhone, required: true }]"
        />
        <van-field
          v-model="zsno"
          name="请输入证书号"
          left-icon="coupon-o"
          label-align="right"
          placeholder="请输入证书号"
          :rules="[{required: true }]"
        />
        <van-field
          name="报考专业"
          left-icon="apps-o"
          label-align="right"
          :placeholder="zySelected.zyname || '请选择报考专业'"
          disabled
          @click="getzyList"
        />
        <div v-for="(item, index) in kmList" :key="'time' + index">
          <van-field
            name="报考课程"
            left-icon="apps-o"
            label-align="right"
            :placeholder="' ' + item.kmname"
            disabled
          />
          <van-field
            v-if="item.starttime && item.endtime"
            name="考试时间"
            left-icon="calendar-o"
            label-align="right"
            :placeholder="' ' + item.starttime + '~' + item.endtime"
            disabled
          />
          <van-field
            v-else
            name="考试时间"
            left-icon="calendar-o"
            label-align="right"
            placeholder="缴费以后我校会第一时间通知你考试最新安排"
            disabled
          />
        </div>
        <van-field
          v-model="registrationFee"
          name="报名费用"
          left-icon="balance-o"
          label-align="right"
          placeholder="报名费用"
          disabled
        />
        <div style="padding: 0px 20px">
          <van-button
            :disabled="isPay"
            type="primary"
            round
            size="large"
            native-type="submit"
            >{{ msg }}</van-button
          >
        </div>
      </van-form>
    </div>

    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div style="margin-top: 40px">
        <div
          v-for="(item, index) in zyList"
          :key="'zyName' + index"
          @click="selectedZy(item)"
        >
          <div class="courseName">{{ item.zyname }}</div>
          <van-divider />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getauthorize, createOrder, getUrlParam } from '../../utils/wxUtils'
import { idCardValidator, phoneValidator } from '../../utils/validator'
export default {
  name: 'ContinueExa',
  components: {},
  data() {
    return {
      telno: '',
      zsno:'',
      ksname: '',
      kscardno: '',
      msg: '提交并缴费',
      show: false,
      zyList: [],
      //   选中的专业
      zySelected: {},
      //   专业下的课程
      kmList: [],
      registrationFee: '',
      isPay: false,
    }
  },
  mounted() {
    let that = this
    if (window.history && window.history.pushState) {
      window.onpopstate = function () {
        if (that.backEvent) {
          that.backEvent()
          that.$store.commit('backEvent', null)
        }
      }
    }
  },
  methods: {
    onSubmit(values) {
      if (JSON.stringify(this.zySelected) === '{}') {
        alert('请选择报考专业')
        return
      }
      this.signUp()
    },
    async getzyList() {
      const res = await this.$http.get('/jbjg/enroll/zyList.action')
      if (!res || !res.data) {
        return
      }
      let data = res.data
      this.zyList = data.zyList || []
      this.show = true
    },
    // 选中专业事件点击 // 2、选择专业带出科目明细，报名费用
    async selectedZy(item) {
      this.zySelected = item
      this.show = false
      const res = await this.$http.get(
        '/jbjg/enroll/continueEduKmList.action?zyid=' + item.zyid
      )
      const kmList = res.data.kmList
      this.kmList = kmList
      this.registrationFee = res.data.registrationFee
    },
    // 报名
    async signUp() {
      const outTradeNo = `${parseInt(Math.random() * 10000000000)}`
      let formData = new FormData()
      formData.append(
        'tablejson',
        JSON.stringify({
          zyid: this.zySelected.zyid,
          ksname: this.ksname,
          kscardno: this.kscardno,
          telno: this.telno,
          zsno:this.zsno,
          jsflag: '1',
          jsno: outTradeNo,
        })
      )
      let res = await this.$http.post(
        '/jbjg/enroll/continueEduSave.action',
        formData
      )
      if (!res || !res.data) {
        alert('未知错误')
        return
      }
      this.pay(outTradeNo)
      // let openid = localStorage.getItem('openid')
      // createOrder(openid, () => {
      //   this.msg = '已支付'
      //   this.isPay = true
      // })
    },
    async pay(outTradeNo) {
      // let code = localStorage.getItem('code')
      let openid = localStorage.getItem('openid')
      // if (!openid) {
      //   let data = await this.$http.get('/jbjg/pay/getOpenId', {
      //     params: {
      //       code
      //     }
      //   })
      //   openid = data.data
      //   localStorage.setItem('openid', openid)
      // }
      createOrder(openid, outTradeNo, this.registrationFee, () => {
        this.msg = '已支付'
        this.isPay = true
      })
    },
    // 身份证验证
    checkIdCard(idcard) {
      return idCardValidator(idcard)
    },
    // 手机验证
    checkPhone(phone) {
      return phoneValidator(phone)
    },
  },
}
</script>
<style lang="scss">
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
.courseName {
  font-size: px2rem(18);
  text-align: center;
}
</style>
