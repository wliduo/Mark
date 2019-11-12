// 我的音乐列表
var apLove = [];

var apList = [];

var myList = [
    {
        title: 'Hope',
        author: 'Namie Amuro',
        url: 'https://dolyw.gitee.io/reader/Music/hope.mp3',
        pic: 'https://dolyw.gitee.io/reader/Music/image/hope.png',
        lrc: 'https://res.dolyw.com/Music/lrc/hope.lrc'
    },
    {
        title: 'unravel',
        author: '凛として時雨',
        url: 'https://dolyw.gitee.io/reader/Music/unravel.mp3',
        pic: 'https://dolyw.gitee.io/reader/Music/image/xxx.png',
        lrc: 'https://res.dolyw.com/Music/lrc/xxx.lrc'
    },
    {
        title: 'unravel - 不插电版',
        author: '凛として時雨',
        url: 'https://dolyw.gitee.io/reader/Music/unravelno.mp3',
        pic: 'https://dolyw.gitee.io/reader/Music/image/xxx.png',
        lrc: 'https://res.dolyw.com/Music/lrc/xxx.lrc'
    },
    {
        title: 'なんでもないや',
        author: 'RADWIMPS',
        url: 'https://dolyw.gitee.io/reader/Music/RADWIMPS.mp3',
        pic: 'https://dolyw.gitee.io/reader/Music/image/xxx.png',
        lrc: 'https://res.dolyw.com/Music/lrc/xxx.lrc'
    },
    {
        title: '烟火里的尘埃',
        author: '郁欢',
        url: 'https://dolyw.gitee.io/reader/Music/yanhuolidechenai.mp3',
        pic: 'https://dolyw.gitee.io/reader/Music/image/yanhuolidechenai.png',
        lrc: 'https://res.dolyw.com/Music/lrc/yanhuolidechenai.lrc'
    }
];

// var apApi = 'https://api.i-meto.com/api/v1/meting'; API地址切换
var apApi = 'https://cloud.i-meto.com/meting/api';
var apApi2 = 'https://api.bzqll.com/music/netease/songList?key=579621905';

// 数组插入方法扩展
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

function getList() {
    try {
        // 步骤一: 创建异步对象
        var ajax = new XMLHttpRequest();
        if (window.XMLHttpRequest) {
            ajax = new XMLHttpRequest();
        } else {
            // IE6及其以下版本浏览器
            ajax = new ActiveXObject('Microsoft.XMLHTTP');
        }
        // 步骤二: 设置请求的url参数 参数一是请求的类型 参数二是请求的url 可以带参数 动态的传递参数starName到服务端
        // ajax.open('get', 'getStar.php?starName='+name);
        ajax.open('get', apApi + '?server=tencent&type=playlist&id=6002914459', false);
        // 步骤三: 注册事件 onreadystatechange 状态改变就会调用 定义返回触发的函数 定义在send之前 不然同步请求就出问题
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                // 步骤五: 如果能够进到这个判断 说明 数据 完美的回来了 并且请求的页面是存在的
                // console.log(ajax.responseText);
                apLove = JSON.parse(ajax.responseText);
                apList = apList.concat(apLove);
            }
        }
        // 步骤四: 发送请求
        ajax.send();
    } catch (err) {

    } finally {

    }
}

function getLove() {
    // apFlag判断是否异步执行完成
    var apFlag = true;
    try {
        // 步骤一: 创建异步对象
        var ajax = new XMLHttpRequest();
        if (window.XMLHttpRequest) {
            ajax = new XMLHttpRequest();
        } else {
            // IE6及其以下版本浏览器
            ajax = new ActiveXObject('Microsoft.XMLHTTP');
        }
        // 步骤二: 设置请求的url参数 参数一是请求的类型 参数二是请求的url 可以带参数 动态的传递参数starName到服务端
        // ajax.open('get', 'getStar.php?starName='+name);
        ajax.open('get', apApi + '?server=netease&type=playlist&id=2553791717', false);
        // 步骤三: 注册事件 onreadystatechange 状态改变就会调用 定义返回触发的函数 定义在send之前 不然同步请求就出问题
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                // 步骤五: 如果能够进到这个判断 说明 数据 完美的回来了 并且请求的页面是存在的
                // console.log(ajax.responseText);
                apList = JSON.parse(ajax.responseText);
                // apList.insert(0, myList[0]);
                apList = apList.concat(myList);
            } else {
                apFlag = false;
            }
        }
        // 步骤四: 发送请求
        ajax.send();

        // 获取QQ音乐歌单
        getList();

        if (apFlag) {
            return apList;
        } else {
            return myList;
        }
    } catch (err) {
        return myList;
    } finally {

    }
}

// Bing每日壁纸获取
var bingPic = {
    "date": 20181228,
    "title": "",
    "copyright": "",
    "url": "https://bing.ioliu.cn/v1/rand?h=1080&w=1920"
};

var bingApi = "https://bing.ioliu.cn/v1";
var bingApi2 = "https://bing.ioliu.cn/v1/rand";
var bingApi3 = "https://cn.bing.com/cnhp/coverstory";
// var bingSize = "?h=1080&w=1920";
// var bingD = Math.floor(1000 * Math.random());
// var bingUrl = bingApi + bingSize + "&d=" + bingD;

// 加速接口
var bingApi4 = "https://api.i-meto.com/api/v1/bing/random";
var bingToday = "https://api.i-meto.com/api/v1/bing/random?new";

function getPic(bingRandom) {
    var bingUrl = bingToday;
    if (bingRandom) {
        bingUrl = bingApi4;
    }
    try {
        // 步骤一: 创建异步对象
        var ajax = new XMLHttpRequest();
        if (window.XMLHttpRequest) {
            ajax = new XMLHttpRequest();
        } else {
            // IE6及其以下版本浏览器
            ajax = new ActiveXObject('Microsoft.XMLHTTP');
        }
        // 步骤二: 设置请求的url参数 参数一是请求的类型 参数二是请求的url 可以带参数 动态的传递参数starName到服务端
        // ajax.open('get', 'getStar.php?starName='+name);
        ajax.open('get', bingUrl, false);
        // 步骤三: 注册事件 onreadystatechange 状态改变就会调用 定义返回触发的函数 定义在send之前 不然同步请求就出问题
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                // 步骤五: 如果能够进到这个判断 说明 数据 完美的回来了 并且请求的页面是存在的
                // console.log(ajax.responseText);
                bingPic = JSON.parse(ajax.responseText);
            }
        }
        // 步骤四: 发送请求
        ajax.send();
    } catch (err) {

    } finally {
        return bingPic;
    }
}

