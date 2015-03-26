/**
 * Created by Quality on 2015-03-25.
 */
 var KEY = {
        UP : 38,
        DOWN :40,
        W : 87,
        S : 83
    }
 var pingpong = {}
 pingpong.pressedkeys = [];

 $(document).ready(function(){
    //设置interval用于每30毫秒调用一次gameloop
    pingpong.timer = setInterval(gameloop,30);

    //标记下pressedkeys数组里某键的状态是按下还是放开
    $(document).keydown(function(e){
        pingpong.pressedkeys[e.which] = true;
    });
    $(document).keyup(function(e){
        pingpong.pressedkeys[e.which] = false;
    });
 });

 //定义gameloop函数
 function gameloop(){
    movePaddles();
 }

 //定义movePaddles函数
 function movePaddles(){
    //使用自定义定时器不断检测是否有按键被按下
    if(pingpong.pressedkeys[KEY.UP]){//向上键
        //把球拍B向上移动五个像素
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top",top-5);
    }
    if(pingpong.pressedkeys[KEY.DOWN]){//向下键
        //球拍B向下移动五个像素
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top",top+5);
    }
    if(pingpong.pressedkeys[KEY.W]){//w键盘
        //球拍A向上移动五个像素
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top",top-5);
    }
    if(pingpong.pressedkeys[KEY.S]){//s键
        //球拍A向下移动五个像素
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top",top+5);
    }
 }