/**
 * 工具类
 * @author yihui 2015-8-14
 */
var utils = {
	

    /**
     * 获取字符串真实长度
     */
    getLength : function(str){
    	if(str == undefined || str == null){
    		return 0;
    	}
        return str.replace(/[^\u0000-\u007f]/g,"**").replace(/[\r\n,\n]/g,"**").length;
    },
    
    /**
     * 往url的queryString添加参数
     */
    urlSearch : function(url, query){

    	question = '';
    	sharp = '';
    	
    	urls0 = url.split('#');
    	urls1 = urls0[0].split('?');
    	
    	if(urls0[1] == undefined || urls0[1] == ''){
    		sharp = '';
    	}else{
    		sharp = '#' +  urls0[1];
    	}
    	
    	if(urls1[1] == undefined || urls1[1] == ''){
    		question = '?' + query;
    	}else{
    		question = '?' + urls1[1] + '&' + query;
    	}
    	return urls1[0] + question + sharp;
    },
    
    /**
     * 往url添加anchor
     */
    anchorSearch : function(url, query){

    	question = '';
    	sharp = '';
    	
    	urls = url.split('#');
    	return urls[0] + '#' +  query;;
    },
    
    // 获取网页内容
    getHtml : function(url) {
        var data = $.ajax({
            url: utils.urlSearch(url, "t="+new Date().getTime()),
            async: false
        }).responseText;
        return data;
    },

	// 获取json
	getJson : function(url) {
		var data = $.ajax({
			url: utils.urlSearch(url, "t="+new Date().getTime()),
			async: false,
			dataType: 'json'
		}).responseText;
		return JSON.parse(data);
	},

    getUrlParams: function (url){
		if(url == undefined || null == url || url.length == 0) {
	        url = window.location.href;
	    }
		var querystr = url.split("?"),
			GET = {};
		if(querystr[1]){
			var GETs = querystr[1].split("&");
			for(var i = 0; i < GETs.length; i++){
				var tmp_arr = GETs[i].split("="),
					key = tmp_arr[0];
				GET[key] = decodeURI(tmp_arr[1]);
			}
		}
		return GET;
	},
	getUrlParam : function(param, url){
		var urlParams = this.getUrlParams(url);
		for (var key in urlParams) {
			if (key == param) {
				return urlParams[key];
			}
		}
		return "";
	},
	paramToUrl : function(param) {
		var urlparam = [];
		for (var i in param) {
			urlparam.push(i + '=' + param[i]);
		}
		return urlparam.join('&');
	},
	getHost : function (url) {
	    var host = "null";
	    if(typeof url == "undefined"|| null == url) {
	        url = window.location.href;
	    }
	    var regex = /^\w+\:\/\/([^\/]*).*/;
	    var match = url.match(regex);
	    if(typeof match != "undefined" && null != match) {
	        host = match[1];
	    }
	    return host;
	},
	isArrayRepeat : function(arr){
	     var hash = {};
	     for(var i in arr) {
	         if(hash[arr[i]])
	              return true;
	         hash[arr[i]] = true;
	     }
	     return false;
	},
	getInputValue : function(target){
		if($(target).get(0) != undefined){
			if ($(target).get(0).tagName == 'INPUT') {
	            return $(target).val();
	        } else {
	            return $(target).find('option:selected').val();
	        }
		}
		return null;
	}
};

// 字符串处理类
var StringUtils = {
	isMobilePhone: function(mobilePhone){
		var patrn = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))\d{8})$/;
		if (patrn.exec(mobilePhone) == null || mobilePhone == "") {
	        return false
	    } else {
	        return true
	    }
	},
	isNum : function(num){
		if(!isNaN(num)){
			return true;
		}else{
			return false;
		}
	},
	isAlpha : function(str){
		var reg= /^[A-Za-z]+$/;
		return reg.test(str);
	},
	// 检测汉字长度
	strlen: function(str){
		if (!str) return 0;
		return str.replace(/[^\x00-\xff]/g, "**").length;
	},
	isEmpty: function(str){
		return (str == undefined || str == null || str.length == 0) ? true : false;
	},
	substr: function(str, len) {
	    var temp;
	    var icount = 0;
	    var patrn = /[^\x00-\xff]/;
	    var strre = "";
	    for (var i = 0; i < str.length; i++) {
	        if (icount < len - 1) {
	            temp = str.substr(i, 1);
	            if (patrn.exec(temp) == null) {
	                icount += 1;
	            } else {
	                icount += 2;
	            }
	            strre += temp;
	        } else {
	            break;
	        }
	    }
	    return strre;
	},
	endWith : function(str, match){
		if(match==null||match==""||str.length==0||match.length>str.length)
		  	return false;
		if(str.substring(str.length-match.length)==match)
		  	return true;
		else
		  	return false;
		return true;
	}
};