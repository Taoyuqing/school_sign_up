<template>
  <div class="home">
    <div class="logo-div">
      <img src="../../assets/u45.png" class="log" />
      <span>补考报名</span>
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
          name="请输入身份证号"
          left-icon="idcard"
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
          left-icon="phone-o"
          label-align="right"
          placeholder="请输入手机号"
          :rules="[{ validator: checkPhone, required: true }]"
          ><template #left-icon>
            <van-icon name="phone-o" size="22" />
          </template>
        </van-field>
        <van-field
          name="报考专业"
          left-icon="apps-o"
          label-align="right"
          placeholder="报考专业"
          v-model="zySelected.zyname"
          readonly
          @click="getzyList"
          ><template #left-icon>
            <van-icon name="apps-o" size="22" />
          </template>
        </van-field>
        <div>
          <van-field
            name="checkboxGroup"
            label=""
            v-if="JSON.stringify(zySelected) !== '{}'"
          >
            <template #input>
              <van-checkbox-group
                v-model="checkboxGroup"
                direction="vertical"
                @change="groupChange"
              >
                <div
                  class="mt"
                  v-for="(item, index) in kmList"
                  :key="'kmname' + index"
                >
                  <van-checkbox :name="item.kmid" shape="square">{{
                    item.kmname
                  }}</van-checkbox>
                </div>
              </van-checkbox-group>
            </template>
          </van-field>
        </div>
        <div v-if="showTimeMsg" class="time">
          <span>该专业最新考试安排尚未公布，补考缴费以后，我校会第一时间通知你最新考试安排。</span>
        </div>
         <div class="money">
          <van-icon name="balance-o" size="26" />
          <span>{{ fee }}</span>
        </div>
        <!-- <van-field
          name="报名费用"
          label-align="right"
          v-model="fee"
          disabled
          placeholder="报名费用"
          style="font-size: 20px"
          ><template #left-icon>
            <van-icon name="balance-o" size="22" />
          </template>
        </van-field> -->
        <div style="padding: 0px 20px">
          <van-button
            :disabled="isPay"
            type="primary"
            native-type="submit"
            round
            size="large"
            >{{ msg }}</van-button
          >
        </div>
      </van-form>

      <!-- <div style="padding:0px 20px">
        <van-button
          type="primary"
          native-type="submit"
          round
          size="large"
          @click="authorizeClick"
          >点击授权（按钮临时存在的 到时候不会这么做）</van-button
        >
      </div> -->
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
  name: 'ReExa',
  components: {},
  data() {
    return {
      ksname: '',
      kscardno: '',
      telno: '',
      msg: '提交并缴费',
      zyList: [],
      zySelected: {},
      show: false,
      kmList: [],
      checkboxGroup: [],
      fee: '',
      registrationFee: {},
      sublist: [],
      isPay: false,
      showTimeMsg:false
    }
  },
  mounted() {},
  methods: {
    onSubmit() {
      if (JSON.stringify(this.zySelected) === '{}') {
        alert('请选择报考专业')
        return
      }
      if (this.sublist.length === 0) {
        alert('请选择报科目')
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
        '/jbjg/enroll/resitKmList.action?zyid=' + item.zyid
      )
      const kmList = res.data.kmList
      this.kmList = kmList
      this.registrationFee = res.data.registrationFee
      this.checkboxGroup=[]
      for (const item of this.kmList) {
        this.checkboxGroup.push(item.kmid)
      }
    },
    // 选中的科目变化
    groupChange(array) {
      if (!array) {
        return
      }
      this.sublist = []
      for (const iterator of array) {
        const kmid = iterator
        for (const item of this.kmList) {
          if(item.endtime==="" && item.starttime === ""){
            this.showTimeMsg = true
          }else{
            this.showTimeMsg = false
          }
          if (kmid === item.kmid) {
            let obj = {
              kmid: kmid,
              starttime: item.starttime,
              endtime: item.endtime,
            }
            this.sublist.push(obj)
            break
          }
        }
      }

      if (array.length === 1) {
        this.fee = this.registrationFee.oneprice
      } else if (array.length === 2) {
        this.fee = this.registrationFee.twoprice
      }else{
        this.fee = 0
      }
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
          jsflag: '1',
          jsno: outTradeNo,
        })
      )
      formData.append('sublist', JSON.stringify(this.sublist))
      let res = await this.$http.post('/jbjg/enroll/resitSave.action', formData)
      if (!res || !res.data) {
        alert('未知错误')
        return
      }

      this.pay(outTradeNo)
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
      createOrder(openid, outTradeNo, this.fee, () => {
        this.msg = '已支付'
        this.isPay = true
        this.$router.replace({
          path: '/paySuccess',
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

    // async payClick() {
    //   let code = getUrlParam('code')
    //   let openid = localStorage.getItem('openid')
    //   if (!openid) {
    //     let data = await this.$http.get('/jbjg/pay/getOpenId', {
    //       params: {
    //         code
    //       }
    //     })
    //     openid = data.data
    //     localStorage.setItem('openid', openid)
    //   }
    //   createOrder(openid, () => {
    //     this.msg = '已支付'
    //   })
    // },
    // authorizeClick() {
    //   getauthorize()
    // }
  },
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
.mt {
  margin-top: px2rem(12);
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
