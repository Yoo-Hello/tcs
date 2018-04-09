$(function(){
	var sheshen = [],data = {},foods = [],score=0,anima;
	$('.start').on('click',function(){
		score = 0;
		$('.score p span').html(score);
		sheshen=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
		data={"0_0":true,"0_1":true,"0_2":true};
		func();
		$(this).css({
			'display':'none'
		})
		$('.ing').css({
			'display':'block'
		})
	})
	var func = function(){
		subject();
		sanke();
		food();
		changeDirection();
		anima = setInterval(function(){move(39)},200);
	}
	// 棋盘
	var subject = function(){
		var s='';
		for(var i=0;i<20;i++){
			for(var j=0;j<20;j++){
				var id=i+'_'+j;
				s +='<div id="'+id+'" class="block"></div>'; 
			}
		}
		$('.tcsbox').html(s);
	}
	// 身体
	var sanke = function(){
		$.each(sheshen,function(index,value){
				$('#'+value.x+'_'+value.y).css({"background":"red"})
			});
	}
	//食物
	var food = function(){
		foods.shift();
		var shiwux=Math.floor(Math.random()*19);
		var shiwuy=Math.floor(Math.random()*19);
		var judge = function(){
			console.log('开始判断')
			for(var i=0;i<sheshen.length;i++){
				console.log(i)
				if(shiwux!=sheshen[i].x&&shiwuy!=sheshen[i].y){
					return true;
				}else{
					shiwux=Math.floor(Math.random()*19);
					shiwuy=Math.floor(Math.random()*19);
					console.log(sheshen[i].x,sheshen[i].y);
					// i==0;
				}
			}
		}
		judge();
		if(judge){
			
			$('#'+shiwux+'_'+shiwuy).css({"background":"yellowgreen"});
			foods.push({x:shiwux,y:shiwuy});
		}
		
	}
	// 按键改变方向
	var changeDirection = function(animation){
		var initialKey = 39;
		$(window).keydown(function(e){
			if(e.keyCode !== 37 && e.keyCode !== 38 && e.keyCode !== 39 && e.keyCode !== 40){
				return;
			}else if(Math.abs(e.keyCode-initialKey) !== 2){
 				clearInterval(anima);
 				anima = setInterval(function(){move(e.keyCode)},200);
 				initialKey = e.keyCode
 			}
 		});
	}
 	//蛇移动
 	var move = function( k ){
 		var initialKey = k;
 		var oldHead=sheshen[sheshen.length-1];
 		if(initialKey == 39){
 			var newHead={x:oldHead.x,y:oldHead.y+1}
 		}
 		if(initialKey == 37){
 			var newHead={x:oldHead.x,y:oldHead.y-1}
 		}
 		if(initialKey == 38){
 			var newHead={x:oldHead.x-1,y:oldHead.y}
 		}
 		if(initialKey == 40){
 			var newHead={x:oldHead.x+1,y:oldHead.y}
 		}
 		if(newHead.x<0||newHead.x>19||newHead.y<0||newHead.y>19||data[newHead.x+'_'+newHead.y]){
 			if(confirm('你撞死了！')){
 				$('.start').css({'display':'block'});
 				$('.ing').css({'display':'none'});
 			};
 			clearInterval(anima);
 			return false;
 		}
 		if(newHead.x==foods[0].x&&newHead.y==foods[0].y){
 			food();
 			score++;
 			$('.score p span').html(score);
 		}else{
 			var weiba=sheshen.shift();
 			delete data[weiba.x+'_'+weiba.y];
 			$('#'+weiba.x+'_'+weiba.y).css({"background":"#ccc"})
 		}
 		$('#'+newHead.x+'_'+newHead.y).css({"background":"red"});
 		data[newHead.x+'_'+newHead.y]=true;
 		sheshen.push(newHead);
 	}
// 	var DisplayScore = function(){
// 		$('.score p span').html(score);
// 	}
// 	DisplayScore();
})
