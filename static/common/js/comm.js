
/*容灾备用 --start*/
// var stjServerIp = "http://60.166.10.91:28066";   //测试服务器IP、端口
// var stjFilePath = "http://60.166.10.91:28066/files";   //文件上传路径
// var stjIP = "http://60.166.10.91:28066";   //接口工程地址（外网）
/*容灾备用 --end*/

/*测试环境 --start*/
//var stjServerIp = "http://60.173.251.20:28088";   //测试服务器IP、端口
//var stjFilePath = "http://60.173.251.20:28088/files";   //文件上传路径
//var stjIP = "http://60.173.251.20:28088";   //接口工程地址（外网）

//stjIP = "http://127.0.0.1:8088";

// var stjIP = "http://192.168.21.156:10010";   //接口工程地址（内网）
 //var stjIP = "http://60.173.251.20:28088";
/*测试环境 --end*/

/*政务云 --start*/
var stjServerIp = "http://117.68.0.190:9090";   //测试服务器IP、端口
var stjFilePath = "http://117.68.0.190:9090/files";   //文件上传路径
var stjIP = "http://117.68.0.190:9090";   //接口工程地址（外网）
/*政务云 --end*/


/*oa相关配置 --start*/

/*容灾备用*/
// var oaIdAddr="http://60.166.10.91:28066";  /*oa-web*/
// var oaWeb = "http://60.166.10.91:28066/stj-oa"; /*oa-web ip、项目名*/
// var oaInspect="http://60.166.10.91:28066/intfoa";/*oa生产环境接口工程*/

/*正式环境*/
//var oaIdAddr="http://60.173.251.22:28066";  /*oa-web*/
//var oaWeb = "http://60.173.251.22:28066/stj-oa"; /*oa-web ip、项目名*/
//var oaInspect="http://60.173.251.22:28066/intfoa";/*oa生产环境接口工程*/

/*测试环境*/
//var oaIdAddr="http://60.173.251.20:28088";  /*oa-web ip*/
//var oaWeb = "http://60.173.251.20:28088/stj-oa"; /*oa-web ip、项目名*/
//var oaInspect="http://60.173.251.20:28088/intf-oa";/*oa测试环境接口工程*/

/*政务云*/
var oaIdAddr="http://117.68.0.190:9090";  /*oa-web ip*/
var oaWeb = "http://117.68.0.190:9090/stj-oa"; /*oa-web ip、项目名*/
var oaInspect="http://117.68.0.190:9090/intfoa";/*oa测试环境接口工程*/

/*oa相关配置 --end*/

/*安徽省区域代码*/
var ahAreacode = "340000";

var Base64 = {
	    // 转码表
	    table : [
	            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
	            'I', 'J', 'K', 'L', 'M', 'N', 'O' ,'P',
	            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
	            'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
	            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
	            'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
	            'w', 'x', 'y', 'z', '0', '1', '2', '3',
	            '4', '5', '6', '7', '8', '9', '+', '/'
	    ],
	    UTF16ToUTF8 : function(str) {
	        var res = [], len = str.length;
	        for (var i = 0; i < len; i++) {
	            var code = str.charCodeAt(i);
	            if (code > 0x0000 && code <= 0x007F) {
	                // 单字节，这里并不考虑0x0000，因为它是空字节
	                // U+00000000 – U+0000007F  0xxxxxxx
	                res.push(str.charAt(i));
	            } else if (code >= 0x0080 && code <= 0x07FF) {
	                // 双字节
	                // U+00000080 – U+000007FF  110xxxxx 10xxxxxx
	                // 110xxxxx
	                var byte1 = 0xC0 | ((code >> 6) & 0x1F);
	                // 10xxxxxx
	                var byte2 = 0x80 | (code & 0x3F);
	                res.push(
	                    String.fromCharCode(byte1),
	                    String.fromCharCode(byte2)
	                );
	            } else if (code >= 0x0800 && code <= 0xFFFF) {
	                // 三字节
	                // U+00000800 – U+0000FFFF  1110xxxx 10xxxxxx 10xxxxxx
	                // 1110xxxx
	                var byte1 = 0xE0 | ((code >> 12) & 0x0F);
	                // 10xxxxxx
	                var byte2 = 0x80 | ((code >> 6) & 0x3F);
	                // 10xxxxxx
	                var byte3 = 0x80 | (code & 0x3F);
	                res.push(
	                    String.fromCharCode(byte1),
	                    String.fromCharCode(byte2),
	                    String.fromCharCode(byte3)
	                );
	            } else if (code >= 0x00010000 && code <= 0x001FFFFF) {
	                // 四字节
	                // U+00010000 – U+001FFFFF  11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
	            } else if (code >= 0x00200000 && code <= 0x03FFFFFF) {
	                // 五字节
	                // U+00200000 – U+03FFFFFF  111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
	            } else /** if (code >= 0x04000000 && code <= 0x7FFFFFFF)*/ {
	                // 六字节
	                // U+04000000 – U+7FFFFFFF  1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
	            }
	        }

	        return res.join('');
	    },
	    UTF8ToUTF16 : function(str) {
	        var res = [], len = str.length;
	        var i = 0;
	        for (var i = 0; i < len; i++) {
	            var code = str.charCodeAt(i);
	            // 对第一个字节进行判断
	            if (((code >> 7) & 0xFF) == 0x0) {
	                // 单字节
	                // 0xxxxxxx
	                res.push(str.charAt(i));
	            } else if (((code >> 5) & 0xFF) == 0x6) {
	                // 双字节
	                // 110xxxxx 10xxxxxx
	                var code2 = str.charCodeAt(++i);
	                var byte1 = (code & 0x1F) << 6;
	                var byte2 = code2 & 0x3F;
	                var utf16 = byte1 | byte2;
	                res.push(String.fromCharCode(utf16));
	            } else if (((code >> 4) & 0xFF) == 0xE) {
	                // 三字节
	                // 1110xxxx 10xxxxxx 10xxxxxx
	                var code2 = str.charCodeAt(++i);
	                var code3 = str.charCodeAt(++i);
	                var byte1 = (code << 4) | ((code2 >> 2) & 0x0F);
	                var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
	                utf16 = ((byte1 & 0x00FF) << 8) | byte2
	                res.push(String.fromCharCode(utf16));
	            } else if (((code >> 3) & 0xFF) == 0x1E) {
	                // 四字节
	                // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
	            } else if (((code >> 2) & 0xFF) == 0x3E) {
	                // 五字节
	                // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
	            } else /** if (((code >> 1) & 0xFF) == 0x7E)*/ {
	                // 六字节
	                // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
	            }
	        }

	        return res.join('');
	    },
	    encode : function(str) {
	        if (!str) {
	            return '';
	        }
	        var utf8    = this.UTF16ToUTF8(str); // 转成UTF8
	        var i = 0; // 遍历索引
	        var len = utf8.length;
	        var res = [];
	        while (i < len) {
	            var c1 = utf8.charCodeAt(i++) & 0xFF;
	            res.push(this.table[c1 >> 2]);
	            // 需要补2个=
	            if (i == len) {
	                res.push(this.table[(c1 & 0x3) << 4]);
	                res.push('==');
	                break;
	            }
	            var c2 = utf8.charCodeAt(i++);
	            // 需要补1个=
	            if (i == len) {
	                res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
	                res.push(this.table[(c2 & 0x0F) << 2]);
	                res.push('=');
	                break;
	            }
	            var c3 = utf8.charCodeAt(i++);
	            res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
	            res.push(this.table[((c2 & 0x0F) << 2) | ((c3 & 0xC0) >> 6)]);
	            res.push(this.table[c3 & 0x3F]);
	        }

	        return res.join('');
	    },
	    decode : function(str) {
	        if (!str) {
	            return '';
	        }

	        var len = str.length;
	        var i   = 0;
	        var res = [];

	        while (i < len) {
	            code1 = this.table.indexOf(str.charAt(i++));
	            code2 = this.table.indexOf(str.charAt(i++));
	            code3 = this.table.indexOf(str.charAt(i++));
	            code4 = this.table.indexOf(str.charAt(i++));

	            c1 = (code1 << 2) | (code2 >> 4);
	            c2 = ((code2 & 0xF) << 4) | (code3 >> 2);
	            c3 = ((code3 & 0x3) << 6) | code4;

	            res.push(String.fromCharCode(c1));

	            if (code3 != 64) {
	                res.push(String.fromCharCode(c2));
	            }
	            if (code4 != 64) {
	                res.push(String.fromCharCode(c3));
	            }

	        }

	        return this.UTF8ToUTF16(res.join(''));
	    }
	};

function Format(datetime,fmt) {
	  if (parseInt(datetime)==datetime) {
	    if (datetime.length==10) {
	      datetime=parseInt(datetime)*1000;
	    } else if(datetime.length==13) {
	      datetime=parseInt(datetime);
	    }
	  }
	  datetime=new Date(datetime);
	  var o = {
	  "M+" : datetime.getMonth()+1,                 //月份
	  "d+" : datetime.getDate(),                    //日
	  "h+" : datetime.getHours(),                   //小时
	  "m+" : datetime.getMinutes(),                 //分
	  "s+" : datetime.getSeconds(),                 //秒
	  "S"  : datetime.getMilliseconds()             //毫秒
	  };
	  if(/(y+)/.test(fmt))
	  fmt=fmt.replace(RegExp.$1, (datetime.getFullYear()+"").substr(4 - RegExp.$1.length));
	  for(var k in o)
	  if(new RegExp("("+ k +")").test(fmt))
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	  return fmt;
}

function getEquclacodeP(equclacode){
	  if(typeof equclacode == "undefined" || equclacode == null || equclacode == ""){
		  return "";
	    }else{
	    	var EquclacodeP="";
	    	var eqmtype = equclacode.substring(0,1);
	    	if(eqmtype == 'O'){
	    		eqmtype = equclacode.substring(1,2);
	    	}
	  		switch(eqmtype){
	        case '1':
	        	EquclacodeP="锅炉";
	        break;
	        case '2':
	        	EquclacodeP="压力容器";
	        break;
	        case '3':
	        	EquclacodeP="电梯";
	        break;
	        case '4':
	        	EquclacodeP="起重机械";
	        break;
	        case '5':
	        	EquclacodeP="场（厂）内专用机动车辆";
	        break;
	        case '6':
	        	EquclacodeP="大型游乐设施";
	        break;
	        case '7':
	        	EquclacodeP="压力管道元件";
	        break;
	        case '8':
	        	EquclacodeP="压力管道";
	        break;
	        case '9':
	        	EquclacodeP="客运索道";
	        break;
	        case 'F':
	        	EquclacodeP="安全附件";
	        case 'T':
	        	EquclacodeP="其他";
	        break;
	      };
	      return EquclacodeP;
	    }
}

function searchUnit(form,fields,columnNames,condition,params,baseUrl){
	 var field=fields.split(",");
	 var columnName = columnNames.split(",");
	 if(field.length!=columnName.length){
	  alert("["+fields+"]和["+columnNames+"]的长度不一致");
	  return false;
	 }
	  columnNames = encodeURI(columnNames);
	  if(params==null || params==undefined || params=='undefined'){params='';}//
	  params=encodeURI(params);
	 var openURL =  baseUrl+"/searchUnit/select?method=begin"+condition+params+"&fields="+fields+"&columnNames="+columnNames+"&supform="+form+"&"+Math.random();
	 if((condition.indexOf("21")>-1)||(condition.indexOf("22")>-1)){
	   openURL = baseUrl+"/index/searchUnit/select?method=select"+condition+params+"&fields="+fields+"&columnNames="+columnNames+"&supform="+form+"&"+Math.random();
	 }
	 var height=500;
	 var width=1000;
	 var top=(screen.height-height)/2 ;
	 var left=(screen.width-width)/2;
	 var result = window.open(openURL,window,"dialogheight="+height+"px; dialogwidth="+width+"px; dialogtop="+top+"px; dialogleft="+left+"px;status:no; directories:yes;scrollbars:no;Resizable=no;");
	 return result;
	}

if($){
	$.commafy = function(num, cent, isThousand) {
		if (num.toString().indexOf('E') != -1 || num.toString().indexOf('e') != -1) {
			num = convertNUMFromScientific(num);
		}
		num = num.toString().replace(/\$|\,/g, '');
		if (isNaN(num))
			num = "0";
		if (isNaN(cent))
			cent = 0;
		cent = parseInt(cent);
		cent = Math.abs(cent);
		if (isNaN(isThousand))
			isThousand = 0;
		isThousand = parseInt(isThousand);
		if (isThousand < 0)
			isThousand = 0;
		if (isThousand >= 1)
			isThousand = 1;
		sign = (num == (num = Math.abs(num)));
		num = Math.floor(num * Math.pow(10, cent) + 0.50000000001);
		cents = num % Math.pow(10, cent);
		num = Math.floor(num / Math.pow(10, cent)).toString();
		cents = cents.toString();
		while (cents.length < cent) {
			cents = "0" + cents;
		}
		if (isThousand == 0)
			return (((sign) ? '' : '-') + num + '.' + cents);
		for ( var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
			num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
		return (((sign) ? '' : '-') + num + '.' + cents);
	};
}
function convertNUMFromScientific(beforevalue) {
	if (beforevalue.toString().indexOf('E') == -1 && beforevalue.toString().indexOf('e') == -1) {
		return "0";
	}
	var tempValueStr = new String(beforevalue);
	var regExp = new RegExp('^((\\d+.?\\d+)[Ee]{1}(\\d+))$', 'ig');
	var result = regExp.exec(beforevalue);
	var resultValue = "";
	var power = "";
	if (result != null) {
		resultValue = result[2];
		power = result[3];
		result = regExp.exec(tempValueStr);
	}
	if (resultValue != "") {
		if (power != "") {
			var powVer = Math.pow(10, power);
			resultValue = resultValue * powVer;
		}
	}
	return resultValue;
}
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
}

function startLoading(){
	layui.use('layer',function(){
		var index = layer.load(2, {time: 10*1000});
		$.data(document.body,"loadIndex",index);
	});
}
function endLoading(){
	layui.use('layer',function(){
		layer.close($.data(document.body,"loadIndex"));
	});
}

function startLoadingNoTime(){
	layui.use('layer',function(){
		var index = layer.load(2);
		$.data(document.body,"loadIndexNoTime",index);
	});
}

function endLoadingNoTime(){
	layui.use('layer',function(){
		layer.close($.data(document.body,"loadIndexNoTime"));
	});
}

function htmlEncodeJQ(str) {
    return $('<span/>').text(str).html();
}

function htmlDecodeJQ(str) {
    return $('<span/>').html(str).text();
}

if($){
	$.ajaxSetup({
		beforeSend: function(jqXHR, settings) {
			try{
				var data = JSON.parse(settings.data);
				if(!data.noFilter){
					settings.data = htmlEncodeJQ(JSON.stringify(data));
				}
			}catch(e){}
		}
	});
}

//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1,arg2) {
    var m = 0, s1 = (1 * arg1).toString(), s2 = (1 * arg2).toString();
    try{
    	m += s1.split(".")[1].length
    }catch(e){
	}
    try{
    	m += s2.split(".")[1].length
    }catch(e){
	}
    // return Number(s1.replace(".",""))* Number(s2.replace(".","")) / Math.pow(10,m);
    var ss = Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    return Math.round(ss * 100) / 100;
}

//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = (1 * arg1).toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = (1 * arg2).toString().split(".")[1].length;
    }
    catch (e) {
    }
    with (Math) {
        r1 = Number((1 * arg1).toString().replace(".", ""));
        r2 = Number((1 * arg2).toString().replace(".", ""));
        var ss = (r1 / r2) * pow(10, t2 - t1);
        return Math.round(ss * 100) / 100;
    }
}

//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = (1 * arg1).toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = (1 * arg2).toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    // return (arg1 * m + arg2 * m) / m;   // accAdd(132476.05,32188.51) 计算不精确
    return (accMul(arg1, m) + accMul(arg2, m)) / m;
}

//说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
//调用：accSub(arg1,arg2)
//返回值：arg1减上arg2的精确结果
function accSub(arg1, arg2) {
    return accAdd(arg1, -arg2);
}

// 重写map方法，兼容ie低版本
function Map() {
    this.elements = new Array();
    // 获取Map元素个数
    this.size = function() {
        return this.elements.length;
    },
        // 判断Map是否为空
        this.isEmpty = function() {
            return (this.elements.length < 1);
        },
        // 删除Map所有元素
        this.clear = function() {
            this.elements = new Array();
        },
        // 向Map中增加元素（key, value)
        this.put = function(_key, _value) {
            if (this.containsKey(_key) == true) {
                if (this.containsValue(_value)) {
                    if (this.remove(_key) == true) {
                        this.elements.push({
                            key : _key,
                            value : _value
                        });
                    }
                } else {
                    this.elements.push({
                        key : _key,
                        value : _value
                    });
                }
            } else {
                this.elements.push({
                    key : _key,
                    value : _value
                });
            }
        },
        // 向Map中增加元素（key, value)
        this.set = function(_key, _value) {
            if (this.containsKey(_key) == true) {
                if (this.containsValue(_value)) {
                    if (this.remove(_key) == true) {
                        this.elements.push({
                            key : _key,
                            value : _value
                        });
                    }
                } else {
                    this.elements.push({
                        key : _key,
                        value : _value
                    });
                }
            } else {
                this.elements.push({
                    key : _key,
                    value : _value
                });
            }
        },
        // 删除指定key的元素，成功返回true，失败返回false
        this.remove = function(_key) {
            var bln = false;
            try {
                for (i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].key == _key) {
                        this.elements.splice(i, 1);
                        return true;
                    }
                }
            } catch (e) {
                bln = false;
            }
            return bln;
        },
        // 删除指定key的元素，成功返回true，失败返回false
        this.delete = function(_key) {
            var bln = false;
            try {
                for (i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].key == _key) {
                        this.elements.splice(i, 1);
                        return true;
                    }
                }
            } catch (e) {
                bln = false;
            }
            return bln;
        },
        // 获取指定key的元素值value，失败返回null
        this.get = function(_key) {
            try {
                for (i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].key == _key) {
                        return this.elements[i].value;
                    }
                }
            } catch (e) {
                return null;
            }
        },
        // set指定key的元素值value
        this.setValue = function(_key, _value) {
            var bln = false;
            try {
                for (i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].key == _key) {
                        this.elements[i].value = _value;
                        return true;
                    }
                }
            } catch (e) {
                bln = false;
            }
            return bln;
        },
        // 获取指定索引的元素（使用element.key，element.value获取key和value），失败返回null
        this.element = function(_index) {
            if (_index < 0 || _index >= this.elements.length) {
                return null;
            }
            return this.elements[_index];
        },
        // 判断Map中是否含有指定key的元素
        this.containsKey = function(_key) {
            var bln = false;
            try {
                for (i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].key == _key) {
                        bln = true;
                    }
                }
            } catch (e) {
                bln = false;
            }
            return bln;
        },
        // 判断Map中是否含有指定key的元素
        this.has = function(_key) {
            var bln = false;
            try {
                for (i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].key == _key) {
                        bln = true;
                    }
                }
            } catch (e) {
                bln = false;
            }
            return bln;
        },
        // 判断Map中是否含有指定value的元素
        this.containsValue = function(_value) {
            var bln = false;
            try {
                for (i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].value == _value) {
                        bln = true;
                    }
                }
            } catch (e) {
                bln = false;
            }
            return bln;
        },
        // 获取Map中所有key的数组（array）
        this.keys = function() {
            var arr = new Array();
            for (i = 0; i < this.elements.length; i++) {
                arr.push(this.elements[i].key);
            }
            return arr;
        },
        // 获取Map中所有value的数组（array）
        this.values = function() {
            var arr = new Array();
            for (i = 0; i < this.elements.length; i++) {
                arr.push(this.elements[i].value);
            }
            return arr;
        };

    /**
     * map遍历数组
     * @param callback [function] 回调函数；
     * @param context [object] 上下文；
     */
    this.forEach = function forEach(callback,context){
        context = context || window;
        //IE6-8下自己编写回调函数执行的逻辑
        var newAry = new Array();
        for(var i = 0; i < this.elements.length;i++) {
            if(typeof  callback === 'function') {
                var val = callback.call(context,this.elements[i].value,this.elements[i].key,this.elements);
                newAry.push(this.elements[i].value);
            }
        }
        return newAry;
    }
}

//表头冻结
function fozenTablleHeader(){
	var $style = $("<style></style>");
	$style.html('.layui-table-header-fixed{top:0;left:0;right:0;z-index:1000;position:fixed;}.layui-table-header-fixed-1{position: fixed;left: 0;top: 0;z-index: 1000;}');
	$('head').append($style);
    var $table = $(".layui-form.layui-border-box.layui-table-view:eq(0)");
    var $box = $table.children('.layui-table-box');
    var $header = $table.children('.layui-table-box').children('.layui-table-header').not('.frozen-copy-header');
    var $copyHeader = $header.clone().css('visibility','hidden').addClass('layui-hide').addClass('frozen-copy-header');
    $('.frozen-copy-header').remove();
    $box.prepend($copyHeader);
    var $fixedHeader = $table.find('.layui-table-fixed>.layui-table-header').not('.frozen-copy-fixed-header');
    var $copyFixedHeader = $fixedHeader.clone().css('visibility','hidden').addClass('layui-hide').addClass('frozen-copy-fixed-header');
    $('.frozen-copy-fixed-header').remove();
    $fixedHeader.parent().prepend($copyFixedHeader);
    var topDistance = $box.offset()?$box.offset().top:0;
	var leftDistance = $box.offset()?$box.offset().left:0;
	var tableWidth = $table[0]?$table[0].offsetWidth:'auto';

	function debounce(func, delay){
		var timeout;
		return function(){
			if(timeout){
				clearTimeout(timeout);
			}
			timeout = setTimeout(function(){
				func();
			}, delay);
		}
	}

	function realFunc(){
		tableWidth = $table[0]?$table[0].offsetWidth:'auto';
    	topDistance = $box.offset()?$box.offset().top:0;
    	var scrollTop = $(window).scrollTop();
    	if(scrollTop > topDistance){
    		$copyHeader.removeClass('layui-hide');
    		$header.addClass('layui-table-header-fixed');
    		$('.layui-table-header-fixed').css('left', leftDistance);
    		$('.layui-table-header-fixed').css('width', tableWidth);
    		if($fixedHeader.length>0){
    			$copyFixedHeader.removeClass('layui-hide');
    			$fixedHeader.addClass('layui-table-header-fixed-1');
    			$('.layui-table-header-fixed-1').css('left', leftDistance);
    			$header.find('.laytable-cell-checkbox').parent().css('visibility','hidden');
    		}
    	}else{
    		$copyHeader.addClass('layui-hide');
    		$('.layui-table-header-fixed').css('width', 'auto');
    		$header.removeClass('layui-table-header-fixed');
    		if($fixedHeader.length>0){
    			$copyFixedHeader.addClass('layui-hide');
    			$fixedHeader.removeClass('layui-table-header-fixed-1');
    			$header.find('.laytable-cell-checkbox').parent().css('visibility','unset');
    		}
    	}
    }

    $(window).unbind('scroll');

    window.addEventListener('scroll', debounce(realFunc, 50));
}

//根据cookie名称获取cookie
function getCookie(cookieName) {
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for(var i = 0; i < arrCookie.length; i++){
		var arr = arrCookie[i].split("=");
		if(cookieName == arr[0]){
			 return arr[1];
		}
	}
	return "";
}
