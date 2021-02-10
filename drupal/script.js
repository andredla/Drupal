var images = {};

function preload(imgs, cb){
	var img = imgs.pop();
	if(img != undefined){
		var obj = new Image();
		obj.onload = function(){
			images[img] = obj;
			preload(imgs, cb);

		}
		obj.src = browser.runtime.getURL("images/"+img);
		//console.log(obj);
	}
		if(img == undefined){
			cb();
		}
		return false;
}

function fix(){
	var adm_bar = $(".toolbar-tray");
	var adm_btn = $(".toolbar-icon-menu");
	var adm_toolbar =  $(".toolbar-bar");
	var body = $("body");
//	var adm_toolbar_x = parseInt($(".toolbar-bar .toolbar-tray-horizontal").css("height")) || 0;
	//adm_btn.removeClass("is-active");
	//adm_bar.removeClass("is-active");
	//$("body").removeClass("toolbar-tray-open");
	//pad_top = parseInt(body.css("padding-top"));

	if(adm_bar.hasClass("is-active")){
		$(".toolbar-bar .toolbar-tab .toolbar-icon-menu")[0].click();
		$(".settings-tray-editable .tabs").css({display: "none"});
		adm_toolbar.hide();
		//body.addClass("dx8_dev_adm_toolbar");
		body.css({"padding-top": 0});
		dev();
	}else{
		$(".toolbar-bar .toolbar-tab .toolbar-icon-menu")[0].click();
		$(".settings-tray-editable .tabs").css({display: "block"});
		adm_toolbar.show();
		$(".tabs-wrapper ul").css({"display": "inherit"});
		//body.removeClass("dx8_dev_adm_toolbar");
		var adm_toolbar_x = parseInt($(".toolbar-bar .toolbar-tray-horizontal").css("height")) || 0;
		var pad_top = parseInt(parseInt(adm_toolbar.css("height")) + adm_toolbar_x);
		body.css({"padding-top": pad_top});
		$(".dx8_dev").remove();
	}
}

function dev(){
	$(".dx8_dev").remove();
	var toolbar = $(".toolbar-bar");
	var dx8_dev = $("<div class='dx8_dev'></div>");
	var dx8_dev_wrap = $("<div class='dx8_dev_wrap'></div>");
	//dx8_dev.css({position: "fixed", display: "block", padding: "10px", top: toolbar.height(), left: 0, height: "100%", color: toolbar.css("color"), "background-color": toolbar.css("background-color"), "z-index": 9999 });
	//dx8_dev_wrap.css({position: "relative", display: "block", height: "100%", overflow: "auto"});
	var code = $("code");
	if(code.length <= 0){
		return false;
	}
	code.each(function(index){
		var t = $(this);
		var item = $("<div class='dx8_dev_item' style='position: relative; display: flex;'></div>");
		var texto = $("<div class='dx8_dev_texto' style='padding: 5px;'>"+t.html()+"</div>");
		var ico = tint(images["copy.svg"], 25, 25, toolbar.css("color")).css({padding: "5px", cursor: "pointer"});
		ico.bind("click", function(){ copy(t.html(), index); });
		item.append(ico);
		item.append(texto);
		dx8_dev_wrap.append(item);
	});
	//console.log( dx8_dev );
	dx8_dev.append( dx8_dev_wrap );
	$("body").append( dx8_dev );
	//style_css("css/animated.css");
}

/*
function style_css(link){
	var style = $("<link class='dx8_dev_css' rel='stylesheet' href='"+browser.runtime.getURL(link)+"'></style>");
	$("body").append( style );
	return false;
}
*/

function tint(img, w, h, cor){
		var canvas = $("<canvas></canvas>");
		canvas.attr({width: w, height: h});
		var ctx = canvas[0].getContext("2d");

		//var img = new Image();
		//img.src = browser.runtime.getURL(img_src);
		//console.log(img);

		ctx.beginPath();
		ctx.drawImage(img, 0, 0, w, h);
		ctx.globalCompositeOperation = "source-atop";
		ctx.fillStyle = cor;
		ctx.fillRect(0, 0, w, h);
		ctx.closePath();
		//console.log(canvas[0]);
		return canvas;
}

function copy(item, index){
	var clip = $("<textarea class='dx8_dev_textarea'>"+item+"</textarea>")[0];
	$(".dx8_dev").append(clip);
	clip.value = item;
	clip.select();
	//var range = clip.setSelectionRange(0, 99999);
	document.execCommand("Copy");
	$(".dx8_dev_textarea").remove();

	alerta("Copiado para o clipboard!", index);
	return true;
}

function alerta(txt, index){
	var div = $("<div class='dx8_dev_alerta animated'><span>"+txt+"</span></div>");
	var item = $($(".dx8_dev .dx8_dev_item")[index]);
	item.append(div);
	//div.addClass("slideInLeft").bind("animationend", function(){ $(".dx8_dev_alerta").remove(); });
	div.addClass("slideInLeft");
	setTimeout(function(){$(".dx8_dev_alerta").remove();}, 1000);
	return false;
}

$(function(){
	preload(["copy.svg"],function(){ fix(); });
});