Imagepreview<br/>
============<br/>
<br/>
图片预览，兼容各浏览器<br/>

注意：<br/>
	1.对谷歌或火狐浏览器是创建了一个img标签，为了保证唯一，需要一个ID属性，所以，File表单必须有一个唯一的ID属性，创建
	img标签的时候会用到<br/>
	2.显示图片函数，请注意参数顺序<br/>

首先需要创建预览对象<br/>
	&nbsp;&nbsp;&nbsp;&nbsp;var imgPr = new ImagePreview()<br/>
	&nbsp;&nbsp;&nbsp;&nbsp;此函数接受一个对象参数，设置全局的属性<br/>
	&nbsp;&nbsp;&nbsp;&nbsp;{Width: 120, Height: 120,ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],Callback:function(){ alert("我是回调函数");}]<br/>

然后就是调用对象的显示函数<br/>
	imgPr.imgView();<br/>
	此函数接受三个三处<br/>
	arg1: file表单的DOM对象，采用jquery获取的，请自行转换<br/>
	arg2: 图片显示的位置，不需要的请输入空，false,"",undefined，默认放到当前file元素的上。函数是根据参数的位置来定位功能，不能缺省<br/>
	arg3: 单个file表单规则, 格式请参照上面的全局参数， 注意大小写<br/>

具体使用<br/>
	1：jquery后绑定<br/>
	var imagePreviewParam = {Callback:imageGlobalCallBackFun};  //回调函数<br/>
	("#up").change(function(){<br/>
        imgPr.imgView(this, $("#show1")[0], imagePreviewParam);<br/>
    });<br/>

    2：onchange事件	<br/>
    onchange="javascript:imgPr.imgView(this, $('#ImgPr'), imagePreviewParam);"<br/>

 现在想到的只有这两种方法了，如果您有更多需求可以来信告知 zengzqlliang@sina.com


