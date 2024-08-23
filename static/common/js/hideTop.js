/*
 * 隐藏/显示表格页面顶部内容
 */
function hideTop(tableName){
    // console.log(tableName)
    $("#hideTop").click(function(){
        $(".top").toggleClass("layui-hide");
        if($(".top").hasClass("layui-hide")){
            $("#hideTop").addClass("down-arrow");
            tableName.reload({
                height: $(window).height()-50
            })
        }else{
            $("#hideTop").removeClass("down-arrow");
            tableName.reload({
                // height: tableHeight()
                height: null
            })
        }
    });
}
function tableHeight(){
    var height = $(window).height()-275;
    if(height < 380){
        height = 380;
    }
    return height;
}

/*
 * 批量操作时置灰单个操作按钮
 */
function disableBtn(tableId,tableDivId,btnName,flag){
    var checkStatus = table.checkStatus(tableId);
    var checkboxCount = checkStatus.data.length;
    if(checkboxCount > 1){
        if(flag){
            var tr = $("#"+tableDivId+" div.layui-table-main table tbody tr");
        }else{
            var tr = $("#"+tableDivId+" div.layui-table-fixed table tbody tr");
        }
        $.each(tr,function(i,v){
            var checkbox = $(v).find("td[data-field='0'] div.laytable-cell-checkbox div.layui-form-checkbox");
            // console.log(i)
            // console.log(v)
            if(checkbox.hasClass("layui-form-checked")){
                $("tr[data-index='"+i+"'] td[data-field='2'] a[lay-event='"+btnName+"']").prop("disabled",true).css("color","#c2c2c2");
            }else{
                $("tr[data-index='"+i+"'] td[data-field='2'] a[lay-event='"+btnName+"']").prop("disabled",false).css("color","#2b67e7");
            }
        });
    }else{
        $("td[data-field='2']").find("a[lay-event='"+btnName+"']").prop("disabled",false).css("color","#2b67e7");
    }
}


layui.use([ 'layer', 'table', 'form' ],function() {
    var layer = layui.layer,table = layui.table,form = layui.form;

    layer._indexTemp = layer._indexTemp || {};
    $(document).on('click','.layui-table-view .layui-select-title',function(e){
        layui.stope(e);
        var titleElem = $(this);
        var dlElem = titleElem.next();
        if(titleElem.parent().prev().hasClass('not-select')){
        	return false;
        }

        var titleElemPosition = getPosition(titleElem, window);
        var topTemp = titleElemPosition.top + titleElem.outerHeight();
        var leftTemp = titleElemPosition.left;

        layer.close(layer._indexTemp['selectInTable']);
        if(titleElem.css({backgroundColor: 'transparent'}).parent().hasClass('layui-form-selectup')){
            topTemp = topTemp - dlElem.outerHeight() - titleElem.outerHeight() - 8;
        }
        var boxHeight = dlElem.outerHeight();
        if(boxHeight < 20){
            boxHeight = 105;
        }
        layer._indexTemp['selectInTable'] = layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            shade: 0,
            anim: -1,
            fixed: false,
            isOutAnim: false,
            offset: [topTemp + 'px', leftTemp + 'px'],
            area: [dlElem.outerWidth() + 'px', boxHeight + 'px'],
            content: '<div class="layui-unselect layui-form-select layui-form-selected layui-table-select"></div>',
            success: function(layero, index){
                dlElem.appendTo(layero.find('.layui-layer-content').css({overflow: 'hidden'}).find('.layui-form-selected'));
                layero.find('dl dd').click(function(){
                    layer.close(index);
                });
            },
            end: function(){
                dlElem.insertAfter(titleElem);
            }
        })
    });
    if(!layui.data('APPLY_EQU_YWLX')['dicData']){
    	putDataInCache('APPLY_EQU_YWLX');
    }
    if(!layui.data('areaList')['areaList']){
    	putEquDataToCache();
    }
    
    //兼容ie，重写startsWith
    if(typeof String.prototype.startsWith === "undefined"){
    	String.prototype.startsWith = function(str){
    		var reg = new RegExp("^" + str);
    		return reg.test(this);
    	}
    }
    //兼容ie，重写endsWith
    if(typeof String.prototype.endsWith === "undefined"){
    	String.prototype.endsWith = function(str){
    		var reg = new RegExp(str + "$");
    		return reg.test(this);
    	}
    }
});

//数据置放缓存
function putDataInCache(dicType){
	$.ajax({
		type:'post',
		url:stjIP+'/intf/sysDict/listSysDictByCategoryCodeParentCode',
		data:JSON.stringify({data:{categoryCode:dicType}}),
		headers : {'token':window.localStorage.getItem("token")},
		contentType:'application/json' ,
		async:true,
		success:function(rst){
			if(rst.rt.status == 200){
				var dicData = [];
				$.each(rst.data,function(index, row){
					if(row.children){
						dicData = dicData.concat(row.children);
					}
				})
				layui.data(dicType, {
                    key: 'dicData',
                    value: JSON.stringify(dicData)
                });
			}
		}
	});
}
//存放设备区域缓存
function putEquDataToCache() {
	$.ajax({
		type:'post',
		url:stjIP + "/intf/sys/area/showAreaList",
		headers : {'token':window.localStorage.getItem("token")},
		contentType:'application/json' ,
		async:true,
		success:function(rst){
			if(rst.rt.status == 200){
				layui.data('areaList', {
                    key: 'areaList',
                    value: JSON.stringify(rst.data)
                });
			}
		}
	});
}
function getDataFromCache(param){
	var returnData = [];
	var dicData = [];
	var dicDataStr = layui.data(param.categoryCode)['dicData'];
	if(dicDataStr){
		dicData = JSON.parse(dicDataStr);
	}
	$.each(dicData,function(index, row){
		if(row.categoryName == param.categoryName && row.parentCode == param.parentCode){
			returnData.push(row);
		}
	})
	return returnData;
}

function getDictLabelFromCache(param){
	var dictLabel = "";
	var dicData = [];
	var dicDataStr = layui.data(param.categoryCode)['dicData'];
	if(dicDataStr){
		dicData = JSON.parse(dicDataStr);
	}
	$.each(dicData,function(index, row){
		if(row.value == param[param.field]){
			dictLabel = row.name;
			return false;
		}
	})
	return dictLabel;
}

function getAreaNameFromCache(areacode, deepth){
	if(!areacode){
		return "";
	}
	var areaList = [];
	var areaDataStr = layui.data('areaList')['areaList'];
	if(areaDataStr){
		areaList = JSON.parse(areaDataStr);
	}
	return getAreaNameIterator(areaList, areacode, deepth, deepth);
}

/**
 * @param areaList 区域列表
 * @param areacode 区域代码
 * @param maxDeepth 最大深度
 * @param deepth 递归深度
 * @returns 区域代码所指名称
 */
function getAreaNameIterator(areaList, areacode, maxDeepth, deepth){
	var areaName = "";
	var endIndex = (maxDeepth - deepth + 1)*2;
	deepth--;
	$.each(areaList,function(index, item){
		if(areacode.substring(0,endIndex) == item.value.substring(0,endIndex)){
			if(item.value == areacode){
				areaName = item.text;
			}else{
				if(deepth>0){
					areaName = item.text + " " + getAreaNameIterator(item.children, areacode, maxDeepth, deepth);
				}
			}
			return
		}
	})
	return areaName;
}

$(document).on('table.select.dl.hide', function(event, elem){
    if($(elem).closest('.layui-form-select').length){
        return;
    }
    layui.use('layer',function(layer){
    	if(layer._indexTemp){
        	layer.close(layer._indexTemp['selectInTable']);
        }
    })
});

$(document).on('click', function(event){
    $(document).trigger('table.select.dl.hide',this.activeElement);
});

$(window).on('resize', function(event){
    $(document).trigger('table.select.dl.hide', this.activeElement);
});


function getPosition(elem, _window){
    _window = _window || window;
    var $ = _window ? _window.layui.$ : layui.$;
    var offsetTemp = {};
    /*if(parent != window){
        if(!parent.layui.tablePlug){
            console.log('改功能必须依赖tablePlug请先引入');
        }else{
            offsetTemp = parent.layui.tablePlug.getPosition($(window.frames.frameElement), parent);
        }
    }*/
    return {
        top: (offsetTemp.top || 0) + elem.offset().top - $('body').offset().top - $(document).scrollTop(),left: (offsetTemp.left || 0) + elem.offset().left - $('body').offset().left - $(document).scrollLeft()
    }
}

//判断是否电梯部门--电梯一、电梯二
function isElevatorOffice(officeId){
	var flag = false;
	if(officeId == "14828325951057239" || officeId == "14828891204498042"){
		flag = true;
	}
	return flag;
}

//判断是否电梯三中心
function isThirdElevatorOffice(officeId){
	var flag = false;
	if(officeId == "8728365792d24307a14f444df36b146b"){
		flag = true;
	}
	return flag;
}

//判断是否压力容器部门
function isContainerOffice(officeId){
	var flag = false;
	if(officeId == "14828874890743042"){
		flag = true;
	}
	return flag;
}

//判断是否罐车中心
function isTankerOffice(officeId){
	var flag = false;
	if(officeId == "14828320553866181"){
		flag = true;
	}
	return flag;
}

//判断是否起重部门
function isCraneOffice(officeId){
	var flag = false;
	if(officeId == "14828956420743590"){
		flag = true;
	}
	return flag;
}

//判断是否业务管理部门
function isManagDepartment(officeId){
	var flag = false;
	if(officeId == "aad247a2f99945578afc722f47409d0d"){
		flag = true;
	}
	return flag;
}

//判断是否两工地部门
function isTwoSite(officeId){
	var flag = false;
	if(officeId == "14829812018395392"){
		flag = true;
	}
	return flag;
}

//个人桌面指标列表加载完成后通用回调
function commonCallBack(res, curr, count, that){
	colorBackTask(res, that);
	colorOverTask(res, that);
}

//退回任务标记颜色
function colorBackTask(res, elem){
	if(res && Array.isArray(res.data) && elem){
		res.data.forEach(function (item, index) {
			if(item.backFlag == 1){
				$.each(elem.find(".layui-table-box tbody tr td[data-field='workId']"),function(v_index, td){
					if($(td).text() == item.workId){
						var trIndex = $(td).parent('tr').attr('data-index');
						elem.find(".layui-table-box tbody tr[data-index='" + trIndex + "']").find('td').css("color", "#e15d5d");
						return;
					}
				})
			}
		});
	}
}

//预警超期标记颜色
function colorOverTask(res, elem){
	if(res && Array.isArray(res.data) && elem){
		res.data.forEach(function (item, index) {
			if(item.warnTimeLimitDay > 0){
				$.each(elem.find(".layui-table-box tbody tr td[data-field='workId']"),function(v_index, td){
					if($(td).text() == item.workId){
						var trIndex = $(td).parent('tr').attr('data-index');
						elem.find(".layui-table-box tbody tr[data-index='" + trIndex + "']").css("background-color", "rgb(236 183 85)");
						return;
					}
				})
			}
			if(item.overTimeLimitDay > 0){
				$.each(elem.find(".layui-table-box tbody tr td[data-field='workId']"),function(v_index, td){
					if($(td).text() == item.workId){
						var trIndex = $(td).parent('tr').attr('data-index');
						elem.find(".layui-table-box tbody tr[data-index='" + trIndex + "']").css("background-color", "rgb(239 197 199)");
						return;
					}
				})
			}
		});
	}
}

function getPreview(appNo){
    var formCode = "declaration_report";
    // 存放所有的介质检测业务类别
    var bussSortArr = [];
	$.ajax({
		type:'post',
		data: null,
		url: '/stj-web/index/businessHandling/getBussSortByAppNo?appNo='+appNo,
		contentType:'application/json',
		dataType: 'json',
		async: false,//同步加载
		headers : {'token':window.localStorage.getItem("token")},
		success:function(res){
			console.log("当前申报单业务类别>>>>> "+res);
			$.ajax({
				type:'post',
				url:stjIP+'/intf/sysDict/listSysDictByCategoryCodeParentCode',
				data:JSON.stringify({data:{categoryCode:'JZJCYW',parentCode:'JZJCYW'}}),
				headers : {'token':window.localStorage.getItem("token")},
				contentType:'application/json' ,
				async:false,
				success:function(rst){
					if(rst.rt.status == 200){
						if(rst.data.length>0){
							$.each(rst.data, function (i,v) {
								bussSortArr.push(v.value);
							})
							console.log("介质检测业务类别>>>>> ");
							console.log(bussSortArr);
						}
					}
				},
				error:function(data){
					layer.msg("数据请求异常",{icon:5});
				}
			});
			if(bussSortArr.indexOf(""+res) > -1){
				formCode = "apply_form";
			}
			//console.log("formCode === "+formCode);
			window.open("http://"+window.location.host+"/stj-web/index/report/view?formCode="+formCode+"&appNo="+appNo,"_blank");
		},
		error:function(data){
			layer.msg("数据请求异常",{icon:5});
		}
	});
}