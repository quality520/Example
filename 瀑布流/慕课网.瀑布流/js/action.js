window.onload=function(){
	waterfall('main','box');
	var dataInt={"data":[{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'}]};
	window.onscroll=function(){
		if(checkScrollSlide){
			var oParent=document.getElementById('main');
			//将数据块渲染到页面的尾部
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src="images/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}

}




function waterfall(parent,box){
	//将main下的所有class为box的元素都取出来
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	//计算整个页面的列数(页面宽/box的宽)
	var oBoxW=oBoxs[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	//设置main的宽度
	oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
	//存放每一列高度的数组
	var hArr = [];
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hArr);
			var index=getMinhIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			//以下两种方式都可以获取到left距离
			//oBoxs[i].style.left=oBoxW*index+'px';
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
			//更新高度
			hArr[index]+=oBoxs[i].offsetHeight;

		}
	}
	console.log(hArr);
	//var minH=Math.min.apply(null,hArr);
	//console.log(minH);

}



//根据class获取元素
function getByClass(parent,clsName){
	var boxArr=new Array();//用来存储获取到的所有class为box的元素
	var oElements=document.getElementsByTagName('*');
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

//获取数组中最小值的索引
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}

//检测是否具备数据块加载的条件
function checkScrollSlide(){
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var height=document.documentElement.clientHeight||document.body.clientHeight;
	return(lastBoxH<scrollTop+height)?true:false;
}
