// 请写出js中实现继承的方式
// 例子:
// var a = {a1:1,a2:2}
// var f=function(){};
// f.portotype=a;
// var b=dunction f(){};

$(function(){
	var s='';
	for(var i=0;i<20;i++){
		for(var j=0;j<20;j++){
			var id=i+'_'+j;
			s +='<div id="'+id+'" class="block"></div>'; 
		}
	}
	$('.tcsbox').html(s);
	var sheshen=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	var data={"0_0":true,"0_1":true,"0_2":true}
	var huashe=function(){
		$.each(sheshen,function(index,value){
			$('#'+value.x+'_'+value.y).css({"background":"red"})
		})
	}
	huashe();

	//食物
	var shiwux;
	var shiwuy;
	var shiwu = function(){
		shiwux=Math.floor(Math.random()*19);
		shiwuy=Math.floor(Math.random()*19);
		for(var i=0;i<sheshen.length;i++){
			if(shiwux==sheshen[i].x&&shiwuy==sheshen[i].y){
				shiwux=Math.floor(Math.random()*19);
				shiwuy=Math.floor(Math.random()*19);
			}
		}
		$('#'+shiwux+'_'+shiwuy).css({"background":"yellowgreen"});
	}
	shiwu();
	//蛇
	var fangxiang=39;
	function move(){
		var oldtou=sheshen[sheshen.length-1];
		if(fangxiang==39){
			var newtou={x:oldtou.x,y:oldtou.y+1}
		}
		if(fangxiang==37){
			var newtou={x:oldtou.x,y:oldtou.y-1}
		}
		if(fangxiang==38){
			var newtou={x:oldtou.x-1,y:oldtou.y}
		}
		if(fangxiang==40){
			var newtou={x:oldtou.x+1,y:oldtou.y}
		}

		if(newtou.x<0||newtou.x>19||newtou.y<0||newtou.y>19||data[newtou.x+'_'+newtou.y]){
			alert('撞死');
			clearInterval(zidong);
			return;
		}
		if(newtou.x==shiwux&&newtou.y==shiwuy){
			shiwu();
		}else{
			var weiba=sheshen.shift();
			delete data[weiba.x+'_'+weiba.y];
			$('#'+weiba.x+'_'+weiba.y).css({"background":"#ccc"})
		}
		sheshen.push(newtou);
		$('#'+newtou.x+'_'+newtou.y).css({"background":"red"})
		
		data[newtou.x+'_'+newtou.y]=true;
		console.log(data);
	}
	var zidong = setInterval(move,200);

	$(window).keydown(function(e){
		if(Math.abs(e.keyCode-fangxiang) == 2){
			return;
		}
		fangxiang=e.keyCode;

	})
	
	
})
