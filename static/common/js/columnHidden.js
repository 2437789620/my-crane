/*
 * 隐藏表格中指定列（包括表头）
 */

function hideColumn(){
//	console.log("start hiding")
	$("[data-field='isApply']").addClass('layui-hide');
	var dataKey = $("[data-field='isApply']").attr("data-key");
    var colIndex = 0;
//	if(dataKey.length < 6){
//        colIndex = dataKey.substr(dataKey.length-1,1);
//	}else if(dataKey.length == 6){
//        colIndex = dataKey.substr(dataKey.length-2,2);
//	}else if(dataKey.length > 6){
//        colIndex = dataKey.substr(dataKey.length-3,3);
//	}
	colIndex = dataKey.substr(dataKey.lastIndexOf("-")+1);
	return colIndex;
}







