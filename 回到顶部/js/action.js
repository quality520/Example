//当页面加载完毕时执行
window.onload = function(){

	var oBtn = document.getElementById("btn");
	var speed;
	var timer = null;
	var isTop = true;
	//获取当前窗体的高度
	var clientH = document.documentElement.clientHeight;
	
	window.onscroll = function(){
		//判断当前滚动的高度是否大于当前显示的窗体的高度
		var oTop = document.documentElement.scrollTop || document.body.scrollTop;
			if(oTop > clientH){
				//大于就显示oBtn;
				oBtn.style.display = 'block';
			}
			else{
				//小于就不显示oBtn;
				oBtn.style.display = 'none';
			}

		if(!isTop)
		{
			clearInterval(timer);
		}
		isTop = false;
	}

	oBtn.onclick = function(){
		//设置定时器
		timer = setInterval(function(){
			var oTop = document.documentElement.scrollTop || document.body.scrollTop;
			speed = Math.ceil(oTop / 5);
			isTop = true;
			document.documentElement.scrollTop = document.body.scrollTop -= speed;	
				//当滚动高度==0的时候，清除定时器
			if(oTop == 0){
				clearInterval(timer);
			}
		},30);
	}
}