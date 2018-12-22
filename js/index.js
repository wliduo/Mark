var imageUrls = ['https://wang926454.gitee.io/reader/Image/201810/normal/20010.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/02015.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/05020.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/05005.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/05030.png',
                    'https://wang926454.gitee.io/reader/Image/201810/normal/10005.png',
                    'https://wang926454.gitee.io/reader/Image/201810/normal/20030.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/01005.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/01010.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/01020.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/01025.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/04035.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/04040.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/04045.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/04050.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/04055.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/04060.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/05010.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/05015.png',
                    'https://wang926454.gitee.io/reader/Image/201811/normal/05025.png'];
var indexImage = document.getElementById('web_bg');
var img = new Image();
var url = imageUrls[Math.floor(imageUrls.length * Math.random())];
    img.src = url;
    img.onload = function () {
    indexImage.style.backgroundImage = "url(" + url + ")";
}

layui.use('element', function () {
    var $ = layui.jquery
        // Tab的切换功能，切换事件监听等，需要依赖element模块
        , element = layui.element;

    // 触发事件
    var active = {
        tabAdd: function () {
            // 新增一个Tab项
            element.tabAdd('demo', {
                title: '新选项' + (Math.random() * 1000 | 0),
                content: '内容' + (Math.random() * 1000 | 0),
                // 实际使用一般是规定好的id，这里以时间戳模拟下
                id: new Date().getTime()
            })
        }
        , tabDelete: function (othis) {
            // 删除指定Tab项
            element.tabDelete('demo', '44');
            othis.addClass('layui-btn-disabled');
        }
        , tabChange: function () {
            // 切换到指定Tab项
            element.tabChange('demo', '22');
        }
    };
});