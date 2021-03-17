<template>
  <div class="home">
    <div class="logo-div">
      <img src="../../assets/u45.png" class="log" />
      <span>新生报名</span>
    </div>
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="ksname"
          name="请输入姓名"
          placeholder="请输入姓名"
          label-align="right"
          :rules="[{ required: true }]"
          ><template #left-icon>
            <van-icon name="user-o" size="22" />
          </template>
        </van-field>
        <van-field
          v-model="kscardno"
          label-align="right"
          placeholder="请输入身份证号"
          :rules="[{ validator: checkIdCard, required: true }]"
          ><template #left-icon>
            <van-icon name="idcard" size="22" />
          </template>
        </van-field>
        <van-field
          v-model="telno"
          name="请输入手机号"
          label-align="right"
          placeholder="请输入手机号"
          :rules="[{ validator: checkPhone, required: true }]"
          ><template #left-icon>
            <van-icon name="phone-o" size="22" />
          </template>
        </van-field>
        <van-field
          name="报考专业"
          label-align="right"
          placeholder="请选择报考专业"
          :value="zySelected.zyname"
          readonly
          @click="getzyList"
          ><template #left-icon>
            <van-icon name="apps-o" size="22" />
          </template>
        </van-field>
        <div v-for="(item, index) in kmList" :key="'time' + index">
          <van-field
            name="报考课程"
            label-align="right"
            v-model="item.kmname"
            readonly
          >
          </van-field>
        </div>
        <div class="money">
          <van-icon name="balance-o" size="26" />
          <span>{{ registrationFee }}</span>
        </div>
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
  name: 'NewExa',
  components: {},
  data() {
    return {
      telno: '',
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
  mounted() {},
  methods: {
    onSubmit(values) {
      if (JSON.stringify(this.zySelected) === '{}') {
        alert('请选择报考专业')
        return
      }
      this.isPay = true
      this.pay()
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
        '/jbjg/enroll/kmList.action?zyid=' + item.zyid
      )
      const kmList = res.data.kmList
      this.kmList = kmList
      this.registrationFee = res.data.registrationFee
    },
    // 报名
    async signUp(outTradeNo, success) {
      let formData = new FormData()
      formData.append(
        'tablejson',
        JSON.stringify({
          zyid: this.zySelected.zyid,
          ksname: this.ksname,
          kscardno: this.kscardno,
          telno: this.telno,
          jsflag: '1',
          jsno: outTradeNo,
        })
      )
      let res = await this.$http.post(
        '/jbjg/enroll/newBornSave.action',
        formData
      )
      if (!res || !res.data) {
        alert('未知错误')
        this.isPay = false
        return
      }
      success()
    },
    async pay() {
      const outTradeNo = `${parseInt(Math.random() * 10000000000)}`
      let openid = localStorage.getItem('openid')
      createOrder(openid, outTradeNo, this.registrationFee, (r) => {
        if (r === '支付失败了') {
          this.isPay = false
          return
        }
        this.msg = '已支付'
        this.isPay = true
        this.signUp(outTradeNo, () => {
          this.$router.replace({
            path: '/paySuccess',
          })
        })
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
.time {
  font-size: px2rem(16);
  color: red;
  line-height: 30px;
  padding: px2rem(10) px2rem(20);
}
.money {
  padding: 10px 16px;
  font-size: 20px;
  color: red;
  display: flex;
  align-items: center;
  span {
    margin-left: 6px;
  }
}
</style>
