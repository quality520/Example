/**
 * Created by Quality on 2015-03-25.
 */
 var KEY = {
    	UP : 38,
    	DOWN :40,
    	W : 87,
    	S : 83
    }
$(document).ready(function(){
    //监听按键事件
    $(document).keydown(function(e){
    	switch(e.which){
    		case KEY.UP://向上键
    		//获取球拍B的当前top值并转化成Int类型
    		var top = parseInt($("#paddleB").css("top"));
    		//球拍B向上移动五个像素
    		$("#paddleB").css("top",top-5);
    		break;
    		case KEY.DOWN://向下键
    		var top = parseInt($("#paddleB").css("top"));
    		//球拍B向下移动五个效像素
    		$("#paddleB").css("top",top+5);
    		break;
    		case KEY.W://w键
    		var top = parseInt($("#paddleA").css("top"));
    		//把球拍A向上移动五个像素
    		$("#paddleA").css("top",top-5);
    		break;
    		case KEY.S://s键
    		var top = parseInt($("#paddleA").css("top"));
    		//把球拍A向下移动五个像素
    		$("#paddleA").css("top",top+5);
    		break;
    	}
    });

});