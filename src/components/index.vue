<template lang="pug">
  #box
    welcome(v-if='Showorflose' @showorflase='welcomeshoworflase')
    .box(v-else)
      .header
        span <
        span web7班({{mynamedata}})
        span
      .content
        .text(v-for='(userfixd,index ) in msg')
          .peopleleft(v-if='userfixd.usersnamedata !=NewData.mytitle')
            img(src="./../../static/img/dog2.jpg")
            .name
              span.first {{userfixd.usersnamedata}}
              span {{userfixd.userstextdata}}
          .peopleright(v-else)
            img(src="./../../static/img/dog1.jpg")
            .name
              span.first {{userfixd.usersnamedata}}
              span {{userfixd.userstextdata}}

      .footer
        input(type='text' v-model='mytext')
        input(type='botton' value='发送'  @click='Sendout')
</template>

<script>
  import welcome from './welcome'
  import chat from './chat'
export default {
  name: 'HelloWorld',
  methods:{
    welcomeshoworflase(msg){
      this.Showorflose=msg
    },
    Sendout(){
      if(this.mytext.length != 0 ){
        this.$socket.emit( 'usertext',this.mytext,this.NewData.mytitle)
        this.mytext=''
      }else{
        $.toast('输入不能为空')
      }

    },
    GetSendOut(){
      this.$socket.on('NewUserMessage',(name,text) => {
        let textdata={}
        textdata.userstextdata=text
        textdata.usersnamedata=name
        this.msg.push(textdata)
        console.log(this.NewData.mytitle)
      })
    }
  },
  data () {
    return {
      Showorflose:true,
      mynamedata:1,
      NewData:{
        usersname:'',
        mytitle:'',
        usernumber:null,
      },
        msg:[],
        mytext:'',

    }
  },
  mounted(){
    this.GetSendOut()
  },
  components:{
    welcome,
    chat
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#box{
  width: 100%;
  height: 100%;
}
.box{
  width: 100%;
  height: 100%;
  .header{
    width: 100%;
    height: 48px;
    display: flex;
    position: fixed;
    background: #4c4c4c;
    justify-content:space-between;
    line-height: 48px;
    align-items:center;
    span{
      padding: 0 20px;
      font-size: 20px;
      font-family: 宋体;
      color: #fff;
      .bell{
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url("./../../static/img/bell.png") no-repeat center center;
        background-size: 24px;
        vertical-align: middle;
      }

    }
    a:last-child{
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url("./../../static/img/contacts.png") no-repeat center center;
      background-size: 30px;
      vertical-align: middle;
    }
  }
  .content{
    padding-top: 50px;
    .peopleleft{
      overflow: hidden;
      padding: 10px;
      text-align: left;
      img{
        float: left;
        width: 48px;
        height: 48px;
        vertical-align: top;
        margin-right: 13px;
      }
      .name{
        width: 65%;
        float: left;
        span.first{
          display: inline-block;
          word-break:break-all;
          width: 100%;
          background: #eee;
          text-align: left;
          padding: 5px;
          line-height: 15px;
          font-size: 12px;
          border-radius: 4px;
        }
        span:last-child{
          display: inline-block;
          word-break:break-all;
          width: 100%;
          background: #5cdc4c;
          text-align: left;
          padding: 15px 10px;
          line-height: 18px;
          font-size: 14px;
          border-radius: 12px;
        }

      }
    }

    .peopleright{
      overflow: hidden;
      padding: 10px;
      text-align: right;
      img{
        float: right;
        width: 48px;
        height: 48px;
        vertical-align: top;
        margin-left: 13px;
      }
      .name{
        width: 65%;
        float: right;
        span.first{
          display: inline-block;
          word-break:break-all;
          width: 100%;
          background: #eee;
          text-align: right;
          padding: 5px;
          line-height: 15px;
          font-size: 12px;
          border-radius: 4px;
        }
        span:last-child{
          display: inline-block;
          word-break:break-all;
          width: 100%;
          background: #5cdc4c;
          text-align: left;
          padding: 15px 10px;
          line-height: 18px;
          font-size: 14px;
          border-radius: 12px;
        }

      }
    }


  }
  .footer{
    width: 100%;
    height: 48px;
    position: fixed;
    bottom:0 ;
    display: flex;
    background: #eee;
    justify-content:space-between;
    input[type='text'] {
      width: 70%;
      padding: 5px;
      border: none;
      outline: none;
      border-radius: 8px;
      margin: 10px;
    }
    input[type='botton'] {
      width: 10%;
      padding: 5px;
      font-size: 12px;
      border: 1px solid #999;
      background: #e2e2e2;
      color: #616161;
      margin: 10px;
      border-radius: 6px;
      text-align: center;
      outline: none;
    }
  }
}
</style>
