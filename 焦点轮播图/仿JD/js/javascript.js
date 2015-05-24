$(function(){
	var a = 0;
	var oplay = null;
	$("#btn li").bind("mouseover",function(){
		a = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$("#box li").eq(a).fadeIn().siblings().hide();
	});
	//当鼠标滑动到container范围上的时候就停止自动播放
	$("#container").hover(function(){
		clearInterval(oplay);
		},function(){//鼠标离开的时候又接着自动播放
			play();
		});
	//定义自动播放函数
	function play(){
		oplay = setInterval(function(){
			if(a < 7){
				a++;
				$("#box li").eq(a).fadeIn().siblings().hide();
				$("#btn li").eq(a).addClass("on").siblings().removeClass("on");
				
				if(a == 6){
					a = -1;
				}
			}
			else{
				a = -1;
			}
		},2000);
	}
	play();
})