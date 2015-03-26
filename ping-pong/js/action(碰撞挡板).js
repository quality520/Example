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
 pingpong.ball = {
    speed : 5,
    x : 150,
    y : 100,
    directionX : 1,
    directionY : 1
 }


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
    movePaddles();//调用挡板移动函数
    moveBall();//调用乒乓球移动函数
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

//定义pingpang移动函数
function moveBall(){
    //引用需要用的变量
    var playgroundHeight = parseInt($("#playground").height());
    var playgroundWidth = parseInt($("#playground").width());
    var ball = pingpong.ball;
    

    //检测球台边缘
    //检测底边
    if(ball.y + ball.speed*ball.directionY > playgroundHeight){
        ball.directionY = -1;
    }
    //检测顶边
    if(ball.y + ball.speed*ball.driectionY < 0){
        ball.directionY = 1;
    }
    //检测右边
    if(ball.x + ball.speed*ball.directionX > playgroundWidth){
        ball.directionX = -1;
    }
    //检测左边
    if(ball.x + ball.speed*ball.directionX < 0){
        ball.directionX = 1;
    }
    ball.x += ball.speed*ball.directionX;
    ball.y += ball.speed*ball.directionY;

    //稍后会在此检测球拍
    //检测左边球拍
    var paddleAX = parseInt($("#paddleA").css("left") )+ parseInt($("#paddleA").css("width"));
    var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
    var paddleAYTop = parseInt($("#paddleA").css("top"));
    if(ball.x + ball.speed*ball.directionX < paddleAX){
        if(ball.y +ball.speed*ball.directionY <= paddleAYBottom && ball.y + ball.speed*ball.directionY >= paddleAYTop){
            ball.directionX = 1;
        }
    }

    //检测右边球拍
    var paddleBX = parseInt($("#paddleB").css("left"));
    var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
    var paddleBYTop = parseInt($("#paddleB").css("top"));
    if(ball.x + ball.speed*ball.directionX >= paddleBX){
        if(ball.y +ball.speed*ball.directionY <= paddleBYBottom && 
            ball.y + ball.speed*ball.directionY >= paddleBYTop){
            ball.directionX = -1;
        }
    }

    //根据速度与方向移动乒乓球
    $("#ball").css({
        "left":ball.x,
        "top":ball.y
    });

}


