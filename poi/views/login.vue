l<template lang="pug">
  .Login
    Card.formCard
      <p slot="title">密码登录</p>
      Form(ref="form" :model="form" :rules="rule")
        FormItem(prop="identifier")
          Input(type="text" v-model="form.identifier" placeholder="用户名或邮箱")
            Icon(type="ios-person-outline" slot="prepend")
        FormItem(prop="password")
          Input(type="password" v-model="form.password" placeholder="密码" @on-enter="handleLogin")
            Icon(type="ios-lock-outline" slot="prepend")
        FormItem
          Button(type="primary" @click="handleLogin") 登录
          Button(style="margin-left: 5px" @click="handleSignUp") 注册

</template>

<script>
import axios from "axios";
import store from "../store";
import { mapObjs } from "../utils";

export default {
  data() {
    return {
      form: {
        identifier: "",
        password: ""
      },
      rule: {
        identifier: [
          {
            required: true,
            message: "请输入用户名/邮箱",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
        ]
      }
    };
  },
  methods: {
    async handleLogin() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const {identifier, password} = this.form
          await store.dispatch("LOGIN", {
            data:{
              identifier,password
            }
          })
        } else {
          this.$Message.error("请输入正确的账号密码");
        }
      });
    },
    async handleSignUp() {
      this.$Notice.warning({
        title: "暂未开放注册",
        desc: ""
      });
    }
  }
};
</script>



<style lang="stylus" scoped>
.Login {
  background-image: url('../assets/Login.png');
  background-position: 50%;
  background-size: cover;
  height: 100vh;
  position: relative;
}

.formCard {
  width: 300px;
  position: fixed;
  right: 10vw;
  top: 30vh;
}
</style>
