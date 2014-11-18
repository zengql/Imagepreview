/**
 * 图片预览类（基于jquery）
 * 使用方法：
 *   var imgShow = new ImagePreViewNew({Width: 120, Height: 120,ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],Callback:function(){ alert("23");} }, obj);}, 
 *   imgShow.imgView("image1",null, file的DOM对象)
 *   //Callback为回调函数
 * @param globalOpts ={Width: 120, Height: 120,ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],Callback:function(){ alert("23");} }
 * 
 */
function ImagePreview(globalOpts){
    //设置全局属性
    var opts = {
      Width : 120,
      Height : 120,
      ImgType :  ["gif", "jpeg", "jpg", "bmp", "png"],
      Callback : function(){}
    }
    if(globalOpts){
        opts = jQuery.extend(opts, globalOpts || {});
    }
    
    //查询URL
    this.getObjectURL = function (file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }
    /*显示主方法
    * 注意调用顺序，第一个是file DOM对象，第二个是包含预览图片的容器（上一层DOM元素）,第三个是此次预览图片的参数，格式参考全局参数
    */
    this.imgView = function(obj, imgContiner, optsNew) {

        var _self = obj, _this = $(obj);

      //设置局部属性，重复的会替换掉全局的
        if(opts){
          opts = jQuery.extend(opts, optsNew || {});
        }
        
      
          //检查参数，如果当前Img元素不存在，重新创建一个
        var imageElement = jQuery("#j_img_"+_this.attr("id"));
        if(imageElement.length <= 0 ){
            imageElement = $("<img width='"+opts.Width+"' id='j_img_"+_this.attr("id")+"' height='"+opts.Height+"' style=''display: inherit;' />");
             try {
                   imageElement.attr('src', this.getObjectURL(obj.files[0]));
                } catch (e) {
                  imageElement = $("<div id='j_img_"+_this.attr("id")+"'></div>");  
                }
            //当image容器存在的时候，存到容器，不存在的时候，放到当前OBJ的上面
            if(imgContiner){
                $(imgContiner).append(imageElement)
            } else {
                //obj.insertAdjacentHTML("beforeBegin",imageElement.get(0));
                _this.before(imageElement.get(0));
            }
        }
        if (obj.value) {
        	
            if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(_self.value.toLowerCase())) {
                alert("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "中的一种");
                _self.value = "";
                return false;
            }
            if (navigator.userAgent.indexOf("MSIE") > -1) {
                try {
                   imageElement.attr('src', this.getObjectURL(obj.files[0]));
                } catch (e) {
                    var src = "";
                    _self.select();
                    if (top != self) {
                        window.top.document.body.focus();
                    } else {
                        _self.blur();
                    }
                    src = document.selection.createRange().text;
                    document.selection.empty();
                   imageElement.css({
                        'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)',
                        'width': opts.Width + 'px',
                        'height': opts.Height + 'px'
                    });
                    imageElement.get(0).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                }
            } else {
                imageElement.attr('src',this.getObjectURL(obj.files[0]));
            }
            opts.Callback(obj, imageElement[0]);
        }
    }
    //主体结束
}