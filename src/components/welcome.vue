<template lang="pug">
    .welcome
      .login(v-if="mylogin")
        img(src="./../../static/img/dog1.jpg")
        .logins
          span.login 登录
          input(type="text" name=" login" v-model="loginusername").login
        .logins
          span.login 密码
          input(:type="mypassword" name=" loginpassword" v-model="loginuserpass").login
        button(type="button" @click="mytexts" ).btnpass {{mytext}}
        button(type="button" @click="SignChat").btnlogin 立即登录
      .login(v-else)
        img(src="./../../static/img/dog2.jpg")
        .logins
          span.login 账号
          input(type="text" name=" account " v-model="registerusername").login
        .logins
          span.login 密码
          input(:type="registermypassword" name="registerpassword" v-model="registeruserpass").login
        .logins
          span.login 确认密码
          input(:type="registermypassword" name="registerpasswords" v-model="registeruserpasss").login
        button(type="button" @click="registermytexts" ).btnpass {{registermytext}}
        button(type="button" @click="ShowChat").btnlogin 立即注册
      p(@click="myswich").switch {{myregister}}
</template>

<script>
    export default {
      data(){
        return{
          username:'',
          mypassword:"password",
          registermypassword:"password",
          mytext:"显示密码",
          registermytext:"显示密码",
          mylogin:true,
          myregister:"立即注册",
          loginusername:"",
          registerusername:"",
          loginuserpass:"",
          registeruserpass:"",
          registeruserpasss:"",
          user : {},
          i:1
        }
      },
      name: "welcome",
      mounted(){
        this.usercon()
      },
      methods:{
        myswich(){
          if(this.mylogin==true){
            this.mylogin=false
            this.myregister="立即登录"
          }else{
            this.mylogin=true
            this.myregister="立即注册"
          }

        },
        mytexts(){
          if(this.mypassword == "password"){
            this.mypassword="text"
            this.mytext="隐藏密码"
          }else{
            this.mypassword="password";
            this.mytext="显示密码"
          }
        },
        registermytexts(){
          if(this.registermypassword == "password"){
            this.registermypassword="text"
            this.registermytext="隐藏密码"
          }else{
            this.registermypassword="password";
            this.registermytext="显示密码"
          }
        },
        ShowChat(){
            if((this.registerusername.length != 0)&&(this.registeruserpass.length != 0)){
              if(this.registeruserpass == this.registeruserpasss){
                this.$socket.emit( 'registerUserLogin',this.registerusername,this.registeruserpass)

              }else{
                console.log('两次输入密码不同')
              }
            }else{
              console.log('账户或密码未输入')
            }
        },
        //监听事件不能放在用户事件里需要放在生命周期里监听，不然后端会强制执行用户事件
        usercon() {
          this.$socket.on('userrepeat', () => {
            $.toast('用户已注册')
          })
          this.$socket.on('registerSuccess', () => {
            $.toast('注册成功')
          })
          this.$socket.on('UserLoginFail', () => {
            $.toast('用户未注册')
          })
          this.$socket.on('UserLoginpassFail', () => {
            $.toast('密码错误')
          })
          this.$socket.on('UserLoginsuccess', (ms) => {
            $.toast('用户登录成功')
            this.$parent.$data.Showorflose=false
            this.$socket.on('system', (peoplenumber,name) =>{
              this.$parent.$data.mynamedata=peoplenumber
              this.$parent.$data.NewData.mytitle=this.loginusername
            })

            this.$parent.$data.Showorflose=false
          })
          this.$socket.on('UserLoginfails', () => {
            $.toast('请勿重复登录')
          })
        },
        //登录判断
        SignChat(){
          if((this.loginusername.length != 0)&&(this.loginuserpass.length != 0)){
            this.$socket.emit( 'UserLogin',this.loginusername,this.loginuserpass)
          }else{
            $.toast("请输入用户名或密码")
          }
        }
    }}
</script>

<style scoped lang="less">
  .welcome{
    color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background: url("./../../static/img/bg@2x.png") no-repeat center center;
    .login{
      img{
        display: block;
        width: 100pt;
        height: 100pt;
        border-radius: 100%;
        margin: 0 auto;
      }
      .logins{
        width: 470px;
        margin: 38px auto 0;
        border: 1px solid #fff;
        border-radius: 38px;
        height: 76px;
        font-size: 26px;
        line-height: 76px;
        padding:0 34px;
        input.login{
          background: none;
          border: none;
          padding: 10px 20px;
          width: 269px;
        }
      }
      .btnpass{
        display: block;
        margin: 10px auto;
        background: none;
        border: 1px solid #fff;
        font-size: 14px;
      }
      .btnlogin{
        display: block;
        margin: 30px auto;
        background: url("./../../static/img/login@2x.png");
        width: 470px;
        height: 76px;
        border: none;
        font-size: 32px;
        line-height: 32px;
        text-align: center;
      }
    }
    p{
      font-size: 20px;
      cursor: pointer;
    }
  }
</style>
