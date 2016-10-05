/**
 * 表单校验类
 * 
 * @author yihui<yihui,haloashen@gmail.com>
 * @version 2013-8-11
 * 
 */
/*
 * 配置样例
 */
/*
var configs = [
               {
               	   "id":"id",
            	   "checker":"required",
            	   "alert":"",
            	   "error":""
               },
               {
               	   "id":"id",
            	   "checker":"number",
            	   "alert":"",
            	   "error":""
               },
               {
               	   "id":"id",
            	   "checker":"amount",
            	   "alert":"",
            	   "error":""
               },
               {
               	   "id":"id",
            	   "checker":"phone",
            	   "alert":"",
            	   "error":""
               },
               {
               	   "id":"id",
            	   "checker":"zip",
            	   "alert":"",
            	   "error":""
               },
               {
               	   "id":"id",
            	   "checker":"email",
            	   "alert":"",
            	   "error":""
               },
               {
               	   "id":"id",
            	   "checker":"reg",
            	   "alert":"",
            	   "error":"",
            	   "reg":""
               },
               {
               	   "id":"id",
            	   "checker":"length",
            	   "alert":"",
            	   "error":"",
            	   "lt-error":"",
            	   "lt":4
            	   //"gt":128,
            	   //"eq":32
               },
               {
               	   "id":"id",
            	   "checker":"equal",
            	   "alert":"",
            	   "error":"",
            	   "target":"target_id",
               },
               {
               	   "id":"id",
            	   "checker":"function",//用户自定义验证方法
            	   "alert":"",
            	   "error":"",
            	   "function":function(config){}
               }
];

// 校验方法
		"required": FormValidator.prototype.checkRequired,
		"number": FormValidator.prototype.checkNumber,
		"integer": FormValidator.prototype.checkInteger,
		"amount": FormValidator.prototype.checkAmount,
		"phone": FormValidator.prototype.checkPhone,
		"mobile": FormValidator.prototype.checkMobile,
		"fax": FormValidator.prototype.checkFax,
		"zip": FormValidator.prototype.checkZip,
		"url": FormValidator.prototype.checkUrl,
		"email": FormValidator.prototype.checkEmail,
		"reg": FormValidator.prototype.checkReg,
		"length": FormValidator.prototype.checkLength,
		"equal": FormValidator.prototype.checkEqual,
		"function": FormValidator.prototype.checkFunction,
*/
var FormValidator = function(configs, formId, successMsg, successUrl, nextPageName, callback){
	this.configs = configs;
	$(configs).each(function(index,item){
		// 获取表单控件
		var id = item["id"];
		var target = $("#"+id);
		if(target.get(0) == undefined){
			return;
		}
		var rel_target = $(".xrel_"+id);
		// 获取表单控件提示
		var alert_msg = item["alert"];
		// 获取验证函数
		var checkerName = item["checker"];
		var checker = FormValidator.prototype.checkers[checkerName];
		if(checker == undefined){
			alert('this is a undefined checker:' + checkerName);
		}
		var alerter = $("#"+id+"_control .help-inlined");
		alerter.html(alert_msg);
		// 表单控件点击事件
		target.on('click', function(){
			var alerter = $("#"+id+"_control .help-inlined");
			alerter.html(alert_msg);
			alerter.removeClass('error');
		});
		rel_target.on('click', function(){
			var alerter = $("#"+id+"_control .help-inlined");
			alerter.html(alert_msg);
			alerter.removeClass('error');
		});
		// 表单控件获得焦点事件
		target.on('focus', function(){
			if(!target.hasClass('submit_error')){
				var alerter = $("#"+id+"_control .help-inlined");
				alerter.html(alert_msg);
				alerter.removeClass('error');
			}
		});
		rel_target.on('focus', function(){
			var alerter = $("#"+id+"_control .help-inlined");
			alerter.html(alert_msg);
			alerter.removeClass('error');
		});
		// 表单控件失去焦点事件
		target.on('blur', function(){
			var alerter = $("#"+id+"_control .help-inlined");
			if(!alerter.hasClass('error')){
				checker(item);
			}
		});
		rel_target.on('blur', function(){
			var alerter = $("#"+id+"_control .help-inlined");
			if(!alerter.hasClass('error')){
				checker(item);
			}
		});
		target.on('change', function(){
			var alerter = $("#"+id+"_control .help-inlined");
			if(!alerter.hasClass('error') || target.attr('type') == 'hidden'){
				checker(item);
			}
		});
		rel_target.on('change', function(){
			var alerter = $("#"+id+"_control .help-inlined");
			if(!alerter.hasClass('error') || target.attr('type') == 'hidden'){
				checker(item);
			}
		});
		if (target.tagName != undefined && target.tagName != 'INPUT') {
			// select控件改变事件
			$(document).on("change","#"+id+" select",function(){
				var alerter = $("#"+id+"_control .help-inlined");
				if(!alerter.hasClass('error')){
					checker(item);
				}
			});
        }
		
	});
	// 表单提交事件
	$("#"+formId).on('submit', function(){
		$('.controls .error').removeClass('error');
		$('#all-error').removeClass('error');
		$(configs).each(function(index,item){
			// 获取表单控件
			var id = item["id"];
			var target = $("#"+id);
			if(target.get(0) == undefined){
				return;
			}
			var alerter = $("#"+id+"_control .help-inlined");
			// 获取验证函数
			var checkerName = item["checker"];
			var checker = FormValidator.prototype.checkers[checkerName];
			if(checker == undefined){
				alert('this is a undefined checker:' + checkerName);
			}
			if(!alerter.hasClass('error')){
				checker(item);
			}
		});
		if($('.control-group .error').length != 0){
			var error_input = $('.controls .error').prev();
			if(!error_input.is('input'))error_input = error_input.find('input');
			error_input.addClass('submit_error');
			error_input.focus();
			//$('.submit_error').removeClass('submit_error');
			$('#all-error').html('共有'+$('.control-group .error').length+'个错误输入，请修改再提交');
			$('#all-error').addClass('error');
			return false;
		}else{
			$('#all-error').html('');
			$.ajax({
	            type : "post",
	            url : $('#'+formId).attr('action'),
	            data : $('#'+formId).serialize(),
	            async : false,
	            dataType : 'json',
	            success : function(data){
	                if(data.success){
	                	if(successUrl != undefined && successUrl != null){
	                		viewUtils.modal('/common/alert/'+successMsg+'/'+nextPageName+'?url='+successUrl, false);
	                		top.location.href = utils.anchorSearch(top.location.href, 'top');
	                	}else{
	                		viewUtils.success(data.errorMessage);
	                		top.location.href = utils.anchorSearch(top.location.href, 'top');
	                	}
	                }else{
	                    viewUtils.alert(data.errorMessage);
	                    top.location.href = utils.anchorSearch(top.location.href, 'top');
	                }
	                if(callback != undefined && callback != null){
	                	callback(data);
                	}
	            }
	        });
			return false;
		}
	});
}


/**
 * 正则表达式验证
 */
FormValidator.prototype.reg = function(config, reg){
	// 获取表单控件
	var id = config["id"];
	var target = $("#"+id);
	// 获取表单控件提示
	var alert = config["alert"];
	var error = config["error"];
	
	var alerter = $("#"+id+"_control .help-inlined");
	var value = utils.getInputValue(target);
	if(!(value == null || value == '' || value == undefined) && !reg.test(value)){
		alerter.html(error);
		alerter.addClass('error');
	}else{
		alerter.html(alert);
		alerter.removeClass('error');
	}
}


/**
 * 必填校验
 */
FormValidator.prototype.checkRequired = function(config){
	// 获取表单控件
	var id = config["id"];
	var target = $("#"+id);
	// 获取表单控件提示
	var alert = config["alert"];
	var error = config["error"];
	
	var alerter = $("#"+id+"_control .help-inlined");
	var value = utils.getInputValue(target);
	if(value == null || value == '' || value == undefined){
		alerter.html(error);
		alerter.addClass('error');
	}else{
		alerter.html(alert);
		alerter.removeClass('error');
	}
}

/**
 * 相等校验
 */
FormValidator.prototype.checkEqual = function(config){
	// 获取表单控件
	var id = config["id"];
	var target = $("#"+id);
	// 获取表单控件提示
	var alert = config["alert"];
	var error = config["error"];
	
	var operator = config["target"];
	var operatorNum = $("#"+operator).val();
	
	var alerter = $("#"+id+"_control .help-inlined");
	var value = utils.getInputValue(target);
	if(value != operatorNum){
		alerter.html(error);
		alerter.addClass('error');
	}else{
		alerter.html(alert);
		alerter.removeClass('error');
	}
}

/**
 * 数字校验-非负非零整数
 */
FormValidator.prototype.checkNumber = function(config){
	var reg = /^(\s+)?[1-9][0-9]*(\s+)?$/;
	FormValidator.prototype.reg(config, reg);
}

/**
 * 正整数
 */
FormValidator.prototype.checkInteger = function(config){
	var reg = /^[1-9]\d*|0$/;
	FormValidator.prototype.reg(config, reg);
}

/**
 * 金额校验
 */
FormValidator.prototype.checkAmount = function(config){
	// 获取表单控件
	var id = config["id"];
	var target = $("#"+id);
	// 获取表单控件提示
	var alert = config["alert"];
	var error = config["error"];
	
	var alerter = $("#"+id+"_control .help-inlined");
	var value = utils.getInputValue(target);
	var reg_amount = /^([1-9]\d*\.\d*|0\.\d+|[1-9]\d*)$/;
    var reg_zero = /^[0\.]+$/;
	if(!reg_amount.test(value) || reg_zero.test(value)){
		alerter.html(error);
		alerter.addClass('error');
	}else{
		alerter.html(alert);
		alerter.removeClass('error');
	}
}

/**
 * 电话校验 简化
 */
FormValidator.prototype.checkPhone = function(config){
	var reg = /^(\s+)?[0-9]*(-)?[0-9]*(-)?[0-9]*(\s+)?$/;
	FormValidator.prototype.reg(config, reg);
} 

/**
 * 手机校验
 */
FormValidator.prototype.checkMobile = function(config){
	var reg = /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|15[0-9]\d{8}$/;
	FormValidator.prototype.reg(config, reg);
} 

/**
 * 传真校验
 */
FormValidator.prototype.checkFax = function(config){
	var reg = /^((\+?[0-9]{2,4}\-[0-9]{3,4}\-)|([0-9]{3,4}\-))?([0-9]{7,8})(\-[0-9]+)?$/;
	FormValidator.prototype.reg(config, reg);
}

/**
 * 邮编校验
 */
FormValidator.prototype.checkZip = function(config){
	var reg = /^[1-9][0-9]{5}$/;
	FormValidator.prototype.reg(config, reg);
}

/**
 * url校验
 */
FormValidator.prototype.checkUrl = function(config){
	var reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
	FormValidator.prototype.reg(config, reg);
}

/**
 * 邮箱校验
 */
FormValidator.prototype.checkEmail = function(config){
	var reg = /^\w{3,}\.?\w*[@|#]\w+(\.\w+)+$/;
	FormValidator.prototype.reg(config, reg);
}

/**
 * 正则表达式校验
 */
FormValidator.prototype.checkReg = function(config){
	var reg = config["reg"];
	FormValidator.prototype.reg(config, reg);
}

/**
 * 长度校验
 */
FormValidator.prototype.checkLength = function(config){
	// 获取表单控件
	var id = config["id"];
	var target = $("#"+id);
	// 获取表单控件提示
	var alert = config["alert"];
	var lt_error = config["lt-error"];
	var gt_error = config["gt-error"];
	var eq_error = config["eq-error"];
	
	var alerter = $("#"+id+"_control .help-inlined");
	var value = utils.getInputValue(target);
	var lt = config["lt"];
	var gt = config["gt"];
	var eq = config["eq"];
	if(value == null || value == undefined){
		alerter.html(alert);
		alerter.removeClass('error');
	}else{
		var len = utils.getLength(value);
		if(lt != null && lt != undefined && len >= lt){
			alerter.html(lt_error);
			alerter.addClass('error');
		}else if(gt != null && gt != undefined && len <= gt){
			alerter.html(gt_error);
			alerter.addClass('error');
		}else if(eq != null && eq != undefined && len != eq){
			alerter.html(eq_error);
			alerter.addClass('error');
		}else{
			alerter.html(alert);
			alerter.removeClass('error');
		}
	}
}

/**
 * 自定义函数校验
 */
FormValidator.prototype.checkFunction = function(config){
	var checker = config["function"];
	checker(config);
}


/**
 * 验证方法列表
 */
FormValidator.prototype.checkers = {
		"required": FormValidator.prototype.checkRequired,
		"number": FormValidator.prototype.checkNumber,
		"integer": FormValidator.prototype.checkInteger,
		"amount": FormValidator.prototype.checkAmount,
		"phone": FormValidator.prototype.checkPhone,
		"mobile": FormValidator.prototype.checkMobile,
		"fax": FormValidator.prototype.checkFax,
		"zip": FormValidator.prototype.checkZip,
		"url": FormValidator.prototype.checkUrl,
		"email": FormValidator.prototype.checkEmail,
		"reg": FormValidator.prototype.checkReg,
		"length": FormValidator.prototype.checkLength,
		"equal": FormValidator.prototype.checkEqual,
		"function": FormValidator.prototype.checkFunction
}
	

	
	
	
	