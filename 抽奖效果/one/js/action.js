var oBox=document.getElementById('box');
var oBtn=document.getElementById('btn');
var oPlay=document.getElementById('play');
var oStop=document.getElementById('stop');
var data=['iPhone 5s','iPad 3','Mac Book Pro','iWatch','Camera','iPod','iPhone 6','iPhone 6 Plus'];
var timer=null;
var flag=0;

window.onload=function(){
	//点击事件
	oPlay.onclick=play;
	oStop.onclick=stop;

	//键盘事件
	document.onkeyup=function(event){
		event=event||window.event;
		if(event.keyCode==13){
			if(flag==0){
				play();
				flag=1;
			}else{
				stop();
				flag=0;
			}
		}
	}
}

function play(){
	clearInterval(timer);//
	timer=setInterval(function(){
		oRandom = Math.floor(Math.random()*data.length);//利用随机数*data的长度获取到data的索引
		oBox.innerHTML=data[oRandom];//将data的数值加入到box元素内。
	},30);
	oPlay.style.backgroundColor="#999";//play按钮的背景颜色的改变
}

function stop(){
	clearInterval(timer);//清楚定时器
	oPlay.style.backgroundColor="#333";
	alert('您抽中的奖品是：'+data[oRandom]+',\n请您尽快到指定地点领取，谢谢！');
}