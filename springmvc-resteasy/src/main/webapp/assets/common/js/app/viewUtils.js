/**
 * 页面展示辅助类
 * @author yihui 2015-8-14
 */
$(document).ready(function() {

	$('#check_all').click(function(){
		$("input[name='checkbox_list']").prop("checked", $(this).is(":checked"));
	});
	
	$('.order_by').click(function(event){
        viewUtils.orderBy(event.target);
    });
    
    $('#pageSize').change(function(event){
    	search = document.location.search;
    	search = search.replace(/\?pageSize=[^&]*&?/gm,'?').replace(/&pageSize=[^&]*/gm,'');
    	var page = 20;
    	if(!StringUtils.isEmpty(event.target.value)){
    		page = event.target.value;
    	}
    	var url= utils.urlSearch(search, 'pageSize='+page);
    	document.location.href = utils.anchorSearch(url, 'top');
    });
    
});

var viewUtils = {
	
	/**
	 * 显示页面
	 */
	modal : function(url, isClose){
		$('.modal').remove();
		var pageHtml = utils.getHtml(url);
		$('body').append(pageHtml);
		if(isClose != null && isClose != undefined && !isClose){
			$('.modal').modal({backdrop: 'static', keyboard: false});
		}else{
			$('.modal').modal('show');
		}
        var search = document.location.search;
        document.location.href = utils.anchorSearch(search, 'top');
	},
		
		
    /**
     * 翻页
     */
    page : function(query){
    	search = document.location.search;
    	search = search.replace(/\?page=[^&]*&?/gm,'?').replace(/&page=[^&]*/gm,'');
    	var url = utils.urlSearch(search, query);
    	document.location.href = utils.anchorSearch(url, 'top');
    },
    
    /**
     * ajax翻页
     */
    ajaxPage : function(query){
    	var formElement = $('#'+$('#formIdValue').data('form'));
    	search = formElement.attr('action')+'?'+formElement.serialize();
    	search = search.replace(/\?page=[^&]*&?/gm,'?').replace(/&page=[^&]*/gm,'');
    	var url = utils.urlSearch(search, query);
    	viewUtils.modal(url, true);
    	if($('.modal-backdrop').length > 1){
			$('.modal-backdrop').get(0).remove();
		}
    },

    orderBy : function(target){
        var order_by_value = $(target).attr('data');
        var raw_value = $('#order_by_value').attr('value');
        $('#order_by_value').attr('value', order_by_value);
        var order_by_type = $('#order_by_type').attr('value');
        if(order_by_value == raw_value && order_by_type == 'desc'){
            $(target).removeClass("desc");
            $('#order_by_type').attr('value', 'asc');
        }else{
            $(target).addClass("desc");
            $('#order_by_type').attr('value', 'desc');
        }
        query_form.action = window.location.href;
        //提交表单
		setTimeout(function(){$("#query_form").submit();},0);
    },
    
    alert : function(msg, time){
    	$('.alert-msg').show();
    	$('.alert-msg .msg').html(msg);
    	document.location.href = utils.anchorSearch(document.location.href, 'top');
    	if(time == null || time == undefined){time=5;}
    	var sec = time;
    	time=time*1000;
    	for(var i=sec;i>0;i--) { 
            setTimeout("$('.alert-msg .remove-sec').html("+i+");", (sec-i) * 1000); 
        }
    	setTimeout(function(){
    		$('.alert-msg').hide();
		}, time);
    },

    error : function(msg, time, url){
    	$('.alert-msg').removeClass('alert-success');
    	$('.alert-msg').removeClass('alert-info');
    	$('.alert-msg').removeClass('alert-warning');
    	$('.alert-msg').addClass('alert-danger');
    	viewUtils.alert(msg, time);
        if(url != null && url != undefined){
            setTimeout(function(){
                window.location = url;
            }, time*1000);
            
        }
    },
    
    success : function(msg, time, url){
    	$('.alert-msg').removeClass('alert-danger');
    	$('.alert-msg').removeClass('alert-info');
    	$('.alert-msg').removeClass('alert-warning');
    	$('.alert-msg').addClass('alert-success');
    	viewUtils.alert(msg, time);
    	if(url != null && url != undefined){
    		setTimeout(function(){
    			window.location = url;
    		}, time*1000);
    		
    	}
    },
    
    info : function(msg, time){
    	$('.alert-msg').removeClass('alert-danger');
    	$('.alert-msg').removeClass('alert-success');
    	$('.alert-msg').removeClass('alert-warning');
    	$('.alert-msg').addClass('alert-info');
    	viewUtils.alert(msg, time);
    },
    
    warning : function(msg, time){
    	$('.alert-msg').removeClass('alert-danger');
    	$('.alert-msg').removeClass('alert-info');
    	$('.alert-msg').removeClass('alert-success');
    	$('.alert-msg').addClass('alert-warning');
    	viewUtils.alert(msg, time);
    }

}