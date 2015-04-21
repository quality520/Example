function flow(mh,mv){//mh，mv是定义数据块之间的间距，mh是水平距离，mv是垂直距离
	var w = document.documentElement.offsetWidth;//计算页面宽度
	var ul = document.getElementById("flow-box");
	var lis = ul.getElementsByTagName("li");
	var lisW = lis[0].offsetWidth + mh; //计算数据块的宽度
	var col = Math.floor(w / lisW);//计算列数
	ul.style.width = lisW * col + "px";//设置ul的宽度至适合便可以利用css定义的margin把所有内容居中
	
	var len = lis.length;
	var lenArr = [];//创建记录每一个数据块的数组
	for(var i =0;i<len;i++){//遍历每一个数据块，将高度记入数组
		lenArr.push(lis[i].offsetHeight);
	}
	
	
	var oArr = []; //创建记录第一行的每一块的数组；
	for(var i = 0;i<col;i++){//把第一行排放好，并将每一列的高度记入数据oArr
		lis[i].style.top = "0";
		lis[i].style.left = lisW * i + "px";
		oArr.push(lenArr[i]);
	}
	
	
	for(var i = col;i<len;i++){////将其他数据块定位到最短的一列后面，然后再更新该列的高度
		var x = _getMinKey(oArr);//获取最短的一列的索引值
		lis[i].style.top = oArr[x] + mv +"px";
		lis[i].style.left = lisW * x +"px";
		
		oArr[x] = lenArr[i] + oArr[x] + mv;//更新该列高度
		
	}
	
	
	
	document.getElementById("loadimg").style.top = _getMaxValue(oArr) + 50 +"px";//将load图片放到最下面；
/*
	function scroll (){//滚动加载数据
		var st = oArr[_getMinKey(oArr)];
		var scrollTop = document.documentElement.scrollTop > document.body.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
		if(scrollTop >= st - document.documentElement.clientHeight){
			window.onscroll = null;//为防止重复，先清除事件
			_request(null,"php/GetList.php",function(data){
				_addItem(data.d,function(){
					var lenNew = lis.length;
					for(var i=len;i<lenNew;i++){
						lenArr.push(lis[i].offsetHeight);
					}
					for(var i=len;i<lenNew;i++){
						var x = _getMinKey(oArr);
						lis[i].style.top = oArr[x]+10+"px";
						lis[i].style.left = lisW * x + "px";
						oArr[x] = lenArr[x] + oArr[x]+10;
					}
					document.getElementById("loadimg").style.top = _getMaxValue(oArr) + 50 +"px";
					len = lenNew;
					window.onacroll =scroll;
				});
			})
		}
	}
	window.onscroll = scroll;
	*/
		
}

window.onload = function(){
	flow(10,10);
	}
/*	
 //追加项
 75              function _addItem(arr, callback) {
 76                  var _html = "";
 77                  var a = 0;
 78                  var l = arr.length;
 79                  (function loadimg() {
 80                      var img = new Image();
 81                      img.onload = function() {
 82                          a += 1;
 83                          if (a == l) {
 84                              for (var k in arr) {
 85                                  var img = new Image();
 86                                  img.src = arr[k].img;
 87                                      _html += '<li><img src="' + arr[k].img + '" /><a href="#">' + arr[k].title + '</a></li>';
 88                              }
 89                              _appendhtml(document.getElementById("flow-box"), _html);
 90                              callback();
 91                          }
 92                          else {
 93                              loadimg();
 94                          }
 95                      }
 96                      img.src = arr[a].img;
 97                  })()
 98              }
 99              //ajax请求
100             function _request(reqdata, url, callback) {
101                 var xmlhttp;
102                 if (window.XMLHttpRequest) {
103                     xmlhttp = new XMLHttpRequest();
104                 }
105                 else {
106                     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
107                 }
108                 xmlhttp.onreadystatechange = function () {
109                     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
110                         var data = eval("(" + xmlhttp.responseText + ")");
111                         callback(data);
112                     }
113                 }
114                 xmlhttp.open("POST", url);
115                 xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
116                 xmlhttp.send(reqdata);
117             }
118             //追加html
119             function _appendhtml(parent, child) {
120                 if (typeof (child) == "string") {
121                     var div = document.createElement("div");
122                     div.innerHTML = child;
123                     var frag = document.createDocumentFragment();
124                     (function() {
125                         if (div.firstChild) {
126                             frag.appendChild(div.firstChild);
127                             arguments.callee();
128                         }
129                         else {
130                             parent.appendChild(frag);
131                         }
132                     })();
133                 }
134                 else {
135                     parent.appendChild(child);
136                 }
137             }	
*/

//获取数字数组的最大值
function _getMaxValue(arr){
	var a = arr[0];
	for(var k in arr){
		if(arr[k] > a ){
			a = arr[k];
		}
	}
	return a;
	
}
function _getMinKey(arr){
	var a = arr[0];
	var b = 0;
	for(var k in arr){
		if(arr[k] <a){
			a = arr[k];
			b = k;
		}
	}
	return b;
}


//改变浏览器窗口大小时，重新布局
var re;
window.onresize = function(){
	clearTimeout(re);
	re = setTimeout(function(){flow(10,10)},200);
}

