
// 引入 express 对象
var app = require('express')();
// 通过http类创建http服务
var http = require('http').Server(app);
// 引入 socket.io 将http绑定到socket.io上
var io = require('socket.io')(http);
//var pack = require('./package')    可以直接读取.js或者.json文件
var usernames=[];
var mynames=[];
var t=1;
io.on('connection', function(socket){
  console.log('socket连接成功')
  //注册
  socket.on('registerUserLogin',function(name,pass){
    var lengths=usernames.length
    if(usernames.length !=0){
      for(var i=0;i<lengths;i++){
        if(usernames[i].name==name){
          socket.emit('userrepeat');
        }else if(i==lengths-1){
            var userdata={};
            userdata.name=name;
            userdata.pass=pass;
            usernames.push(userdata);
            socket.emit('registerSuccess');
        }
      }
    }else{
        var userdata={}
        userdata.name=name
        userdata.pass=pass
        usernames.push(userdata)
        socket.emit('registerSuccess')
    }
    console.log(usernames);
    console.log('--------------------------------------我是华丽的分割线----------------------------------------------');
  })
  //登录
  socket.on('UserLogin',function (name,pass) {
    var lengths=usernames.length
    var mylengths=mynames.length
    if(usernames.length!=0){
      for(var i=0;i<lengths;i++){
        if(usernames[i].name==name){
          if(usernames[i].pass==pass){
            if(mynames.length!=0){
              for(var j=0;j<mylengths;j++){
                if(mynames[j].name==name){
                  socket.emit("UserLoginfails")
                }else if(j==mylengths-1){
                  var userdata={}
                  userdata.name=name;
                  mynames.push(userdata)
                  socket.emit("UserLoginsuccess")
                  io.sockets.emit('system', mynames.length, name, 'login')
                }
              }
            }else {
              var userdata={}
              userdata.name=name;
              mynames.push(userdata)
              socket.emit("UserLoginsuccess",mynames)
              io.sockets.emit('system', mynames.length, name, 'login')
            }
          }else{
            socket.emit("UserLoginpassFail")
          }
          break;
        }else if(i==lengths-1){
          socket.emit("UserLoginFail")
          console.log(11)
        }
      }
    }else {
      socket.emit("UserLoginFail")
      console.log(22)
    }
  })


  //聊天数据
  socket.on('usertext',(massge,name) => {
    console.log(name)
    io.sockets.emit('NewUserMessage', name, massge)
  })
  })
//登录

  // 后端接收前端的数据
  // socket.on('demo',function(msg){
  //   console.log(`后端接收到的参数：${msg}`)

  //   // 后端向前端发送数据
  // })

http.listen(3000,function(){
  console.log('网站运行在3000端口')
})
