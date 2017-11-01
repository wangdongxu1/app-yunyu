new IScroll("#home",{
	mouseWheel:true,
    scrollbars:true
});
new IScroll("#list",{
	mouseWheel:true,
    scrollbars:true
});

var Dates = null;
//ajax返回数据
$.ajax({
	url:'data/data.json',
	dataType:"json",
	success:function(data){
		Dates=data;
	}
})
$(".container").on('click','a',function(e){
	if($(this).attr('id')=='return'){
		$('.main').find('.home').css({
			transition:'all .3s',
			transform:'translateX(0)'
		}).siblings().css({
		transition:'all .3s',
		transform:'translateX(100%)'
		})
		transition:'all .3s'
		returns.hide()
		search.show();
		fav.hide();
		$('header').find("h2").text("孕育宝典");
	}





	e.preventDefault();
	var that = $(this).attr("href");
	$(that).css({
		transition:'all .3s',
		transform:'translateX(0)'
	}).siblings().css({
		transition:'all .3s',
		transform:'translateX(100%)'
	})
	var idx = $(this).index();
	if( this.parentNode.nodeName=='NAV' ){
		$("#mark").css({
			transition:'all .3s',
			left:idx*25+"%"
		})
	}
	//首页效果
	resetHead($(this));
})
function resetHead(dom){
//改变header内容的
	var href = dom.attr('href'),
		returns = $("#return"),
		fav = $("#fav"),
		search = $("#search"),
		id=dom.attr("id");
	if(href=='#favorite'){
		$('header').find("h2").text("收藏");
		returns.show();
		search.hide();
		fav.show();
	}else if(href=='#history'){
		returns.show()
		search.show();
		fav.hide();
		$('header').find("h2").text("历史记录");
	}else if(href=='#home'){
		returns.hide()
		search.show();
		fav.hide();
		$('header').find("h2").text("孕育宝典");
	}else if(href=='#config'){
		returns.show()
		search.hide();
		fav.show();
		$('header').find("h2").text("设置");
	}else if(href=='#list'){
		returns.show();
		search.show();
		fav.hide();
		$('header').find("h2").text(dom.attr("title"));
		var str = '';	
		$.each(Dates[id].fenlei,function(idx,val){
			console.log(idx);
			str+=`
				<div class="ggg">
					<a href='#content' id='${id}_${idx}'>
					<img src="img/tu/${val.img}" alt="" />
					<h2>${val.title}</h2>
					</a>
				</div>
			`
		})
		$("#list_iscroll").append(str);
	}else if(href=='#content'){
		returns.show();
		search.hide();
		fav.show();
		var strs = '';
		var str =  dom.attr("id");
		var arr = str.split("_");

		strs += `${Dates[arr[0]].fenlei[arr[1]].content}`
		$("#content_iscroll").text(strs);
		
		console.log(Dates[arr[0]].fenlei[arr[1]].content);
	}
}

