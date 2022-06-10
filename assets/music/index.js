$(document).ready(function () {
    // 竖屏需要把left移动到right后面
    if (getElementStyle(document.getElementById('content'), "display") == 'block') {
        $("#left").insertAfter($("#right"));
        $("#right").show();
    }
});

// 切换列表和控制
function slideToggleContent() {
    /* if (document.getElementById('content').style.display == 'none') {
      
    } */
    $("#content").slideToggle();
    $("#contorller").slideToggle();
    $("#head").slideToggle();
}

// PC端返回false
function isMobile() {
    var viewType = navigator.userAgent.toLowerCase();
    // console.log(viewType);
    return viewType.match(/(phone|pad|pod|midp|iphone|ipod|iphone os|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|rv:1.2.3.4|ucweb|fennec|wosbrowser|browserng|webos|symbian|windows ce|windows mobile|windows phone)/i);
}

// 获取外部CSS属性
function getElementStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}

var imgUrlArray = [
    'https://cdn.dolyw.com/wallpaper/201911/20191101005.jpg',
    'https://cdn.dolyw.com/wallpaper/201911/20191107005.jpg',
    'https://cdn.dolyw.com/wallpaper/201911/20191107010.jpg',
    'https://dolyw.gitee.io/reader/Image/201810/normal/20010.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/01005.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/02015.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/04040.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/05025.png',
    'https://cdn.dolyw.com/wallpaper/201911/20191109005.png'
];

var randomIndex = 2;
// 刷新随机数
function switchRandomIndex() {
    // 随机数不会和上一次重复，如果获取和上一次相同就重新获取，直到不同为止
    var index = Math.floor(imgUrlArray.length * Math.random());
    while (randomIndex == index) {
        index = Math.floor(imgUrlArray.length * Math.random());
    }
    randomIndex = index
}

var switchFlag = true;
var imgUrl = '';
// 切换背景
function switchBg() {
    if (switchFlag) {
        wenkmTips.show('正在切换请稍后');
        return false;
    }
    switchFlag = true;
    wenkmTips.show('切换背景');
    var img = new Image();
    switchRandomIndex();
    img.src = imgUrlArray[randomIndex];
    img.onload = function () {
        $("#bg").hide();
        if (imgUrlArray[randomIndex] == "https://cdn.dolyw.com/wallpaper/201911/20191109005.png") {
            document.getElementById('bg').style.backgroundPosition = "center center";
        } else {
            document.getElementById('bg').style.backgroundPosition = "center 0";
        }
        document.getElementById('bg').style.backgroundImage = "url(" + imgUrlArray[randomIndex] + ")";
        $("#bg").fadeIn(1000);
        wenkmTips.show('切换完成');
        $('#hitokoto').attr("title", "");
        imgUrl = imgUrlArray[randomIndex];
        switchFlag = false;
        // 刷新一言
        gethitokoto();
    }
}
// 切换Bing背景
function switchBing() {
    // wenkmTips.show('功能正在开发中');
    if (switchFlag) {
        wenkmTips.show('正在切换请稍后');
        return false;
    }
    switchFlag = true;
    wenkmTips.show('切换Bing壁纸');
    // 请求接口一
    $.get(bingCDN, function (data) {
        // console.log(data);
        if (data && data.url) {
            data.enddate = data.date;
            data.copyright = data.title + ' ' + data.copyright;
            picLoad(data);
        } else {
            console.log("切换Bing壁纸错误");
            // 请求接口二
            switchBingTo();
        }
    }).fail(function () {
        console.log("切换Bing壁纸错误");
        // 请求接口二
        switchBingTo();
    });
}

function switchBingTo() {
    $.ajax({
        url: bingApi5,
        type: 'get',
        dataType: 'jsonp'
    }).done(function (result) {
        var data = result.data;
        // console.log(data);
        if (data && data.url) {
            picLoad(data);
        } else {
            console.log("切换Bing壁纸错误2");
            wenkmTips.show("切换Bing壁纸错误，请重试");
            switchFlag = false;
        }
    }).fail(function () {
        console.log("切换Bing壁纸错误2");
        wenkmTips.show("切换Bing壁纸错误，请重试");
        switchFlag = false;
    });
}

function picLoad(data) {
    // console.log(data);
    var img = new Image();
    img.src = data.url;
    img.onerror = function () {
        console.log("切换Bing壁纸错误1");
        wenkmTips.show("切换Bing壁纸错误，请重试");
        switchFlag = false;
    }
    img.onload = function () {
        $("#bg").hide();
        document.getElementById('bg').style.backgroundPosition = "center 0";
        document.getElementById('bg').style.backgroundImage = "url(" + data.url + ")";
        $("#bg").fadeIn(1000);
        imgUrl = data.url;
        switchFlag = false;
        // 刷新一言
        var text = data.enddate + ' - ' + data.copyright;
        wenkmTips.show(text);
        $('#source').html(text);
        $('#hitokoto').html(text);
        $('#hitokoto').attr("title", text);
    }
}

function openBg() {
    window.open(imgUrl, "_blank");
}

function switchMinions() {
    if ($('#musicImg').is(":hidden")) {
        $('#musicImg').show();
    } else {
        $('#musicImg').hide();
    }
}

// 初始化加载背景
var img = new Image();
imgUrl = imgUrlArray[randomIndex];
if (isMobile()) {
    imgUrl = "https://dolyw.gitee.io/reader/Image/201901/normal/11005.png";
} else {
    $('#musicImg').show();
}
img.src = imgUrl;
img.onload = function () {
    $("#bg").hide();
    if (imgUrl == "https://cdn.dolyw.com/wallpaper/201911/20191109005.png") {
        document.getElementById('bg').style.backgroundPosition = "center center";
    } else {
        document.getElementById('bg').style.backgroundPosition = "center 0";
    }
    document.getElementById('bg').style.backgroundImage = "url(" + imgUrl + ")";
    $("#bg").fadeIn(1000);
    switchFlag = false;
}

// 播放器列表高度
var listMaxHeight = '18em';
var listMaxHeightSearch = '14.8em';
if (!isMobile()) {
    listMaxHeight = '22em';
    listMaxHeightSearch = '19em';
    $("#content").hide();
    $("#contorller").show();
    $("#head").show();
    try {
        // 加载wenkmPlayerc
        $.ajax({ url: 'https://mark.dolyw.com/assets/wenkmPlayer/js/player.js?v=123', dataType: "script", cache: true, async: false });
    } catch (err) {
        console.log('[Error] JQuery is not defined.')
    } finally {
        $(window).load(function () {
            $('#next').show();
            wenkmTips.show('欢迎访问我的音乐台');
            var arrayInfo = $('#wenkmPlayer .player .infos .song span').attr('title').split('-');
            $('#author').html($.trim(arrayInfo[0]));
            $('#title').html($.trim(arrayInfo[1]));
            // 显示歌词和提示
            document.getElementById('wenkmPlayer').style.display = 'none';
            document.getElementById('wangPlayer').style.display = 'inline';
        });
    }
}

// 我的音乐列表
const ap1 = new APlayer({
    container: document.getElementById('aplayer1'),
    lrcType: 3,
    order: 'random',
    theme: '#000000',
    listMaxHeight: listMaxHeight/* ,
    audio: getLove() */
});

// 网易云音乐默认全部歌曲
const ap2 = new APlayer({
    container: document.getElementById('aplayer2'),
    lrcType: 3,
    order: 'random',
    theme: '#000000',
    listMaxHeight: listMaxHeight
});

// 最近喜欢听的歌
const ap3 = new APlayer({
    container: document.getElementById('aplayer3'),
    lrcType: 3,
    order: 'random',
    theme: '#000000',
    listMaxHeight: listMaxHeight
});

// 搜索
const ap4 = new APlayer({
    container: document.getElementById('aplayer4'),
    lrcType: 3,
    theme: '#000000',
    listMaxHeight: listMaxHeightSearch
});

// 列表存放
var aplist1 = [];
var aplist2 = [];
var aplist3 = [];
var aplist4 = [];

// api
var api = apApi;
// 正在播放记录
var aplaying = 'ap1';

// 初始化
function ap2Init() {
    if (ap2.list.audios.length <= 0) {
        $.ajax({
            // url: api + '?server=netease&type=playlist&id=3778678',
            url: api + '?server=netease&type=playlist&id=601142810',
            success: function (list) {
                neteaseFlag = false;
                try {
                    var array = JSON.parse(list);
                } catch (e) {
                    var array = list;
                }
                if (array.length > 0) {
                    ap2.list.clear();
                    ap2.list.add(array);
                } else {
                    layer.msg('出现错误，请刷新页面');
                }
                aplist2 = array;
            }
        });
    }
}

// 初始化
function ap3Init() {
    if (ap3.list.audios.length <= 0) {
        $.ajax({
            // url: api + '?server=netease&type=playlist&id=26462279',
            url: api + '?server=netease&type=playlist&id=6835458757',
            success: function (list) {
                loveFlag = false;
                try {
                    var array = JSON.parse(list);
                } catch (e) {
                    var array = list;
                }
                // 获取QQ音乐我喜欢的音乐列表
                $.ajax({
                    url: api + '?server=tencent&type=playlist&id=6804330872',
                    success: function (data) {
                        if (array.length > 0) {
                            try {
                                var array2 = JSON.parse(data);
                            } catch (e) {
                                var array2 = data;
                            }
                            array = array.concat(array2);
                            ap3.list.clear();
                            ap3.list.add(array);
                        } else {
                            layer.msg('出现错误，请刷新页面');
                        }
                        aplist3 = array;
                    }
                });
            }
        });
    }
}

// 监听搜索框回车事件
$("#serachText").keydown(function (e) {
    if (e.keyCode == 13) {
        search(document.getElementById("serachBtn"));
    }
});

/**
 * 搜索
 * @param {*} btn 
 */
function search(btn) {
    // 开始执行，先将按钮置为不可用，执行完后设置可用
    btn.disabled = true;
    var serachType = document.getElementById("serachType").value;
    var serachText = document.getElementById("serachText").value;
    if (serachText.trim() === '') {
        layer.msg('关键字为空');
        btn.disabled = false;
        return;
    }
    var url = api + '?type=search&server=' + serachType + '&id=' + serachText;
    $.ajax({
        url: url,
        success: function (list) {
            serachFlag = false;
            try {
                var array = JSON.parse(list);
            } catch (e) {
                var array = list;
            }
            // console.log(url);
            // console.log(array);
            if (array.length > 0) {
                ap4.list.clear();
                ap4.list.add(array);
            } else {
                layer.msg('没有搜索到任何结果，请切换平台尝试');
            }
            aplist4 = array;
            btn.disabled = false;
        }
    });
}

/**
 * 网易云音乐热歌
 * @param {*} btn 
 */
function neteaseHot(btn) {
    // 开始执行，先将按钮置为不可用，执行完后设置可用
    btn.disabled = true;
    $.ajax({
        url: api + '?server=netease&type=playlist&id=3778678',
        success: function (list) {
            try {
                var array = JSON.parse(list);
            } catch (e) {
                var array = list;
            }
            // console.log(url);
            // console.log(array);
            if (array.length > 0) {
                ap4.list.clear();
                ap4.list.add(array);
            } else {
                layer.msg('获取歌单失败，请重试');
            }
            aplist4 = array;
            btn.disabled = false;
        }
    });
}

function backMusic(btn) {
    // 开始执行，先将按钮置为不可用，执行完后设置可用
    btn.disabled = true;
    if (aplaying == 'ap1') {
        ap1.skipBack();
        ap1.play()
    }
    if (aplaying == 'ap2') {
        ap2.skipBack();
        ap2.play()
    }
    if (aplaying == 'ap3') {
        ap3.skipBack();
        ap3.play()
    }
    if (aplaying == 'ap4') {
        ap4.skipBack();
        ap4.play()
    }
    $('#play').hide();
    $('#pause').show();
    btn.disabled = false;
}

function initController() {
    $('#play').hide();
    $('#pause').show();
    $('#back').show();
    $('#next').show();
}

function forwardMusic(btn) {
    // 开始执行，先将按钮置为不可用，执行完后设置可用
    btn.disabled = true;
    if (aplaying == 'ap1') {
        ap1.skipForward();
        ap1.play()
    }
    if (aplaying == 'ap2') {
        ap2.skipForward();
        ap2.play()
    }
    if (aplaying == 'ap3') {
        ap3.skipForward();
        ap3.play()
    }
    if (aplaying == 'ap4') {
        ap4.skipForward();
        ap4.play()
    }
    initController();
    btn.disabled = false;
}

function pauseMusic(btn) {
    // 开始执行，先将按钮置为不可用，执行完后设置可用
    btn.disabled = true;
    if (aplaying == 'ap1') {
        ap1.pause();
    }
    if (aplaying == 'ap2') {
        ap2.pause()
    }
    if (aplaying == 'ap3') {
        ap3.pause()
    }
    if (aplaying == 'ap4') {
        ap4.pause()
    }
    $('#pause').hide();
    $('#play').show();
    btn.disabled = false;
}

function playMusic(btn) {
    // 开始执行，先将按钮置为不可用，执行完后设置可用
    btn.disabled = true;
    if (aplaying == 'ap1') {
        ap1.play();
    }
    if (aplaying == 'ap2') {
        ap2.play();
    }
    if (aplaying == 'ap3') {
        ap3.play();
    }
    if (aplaying == 'ap4') {
        ap4.play();
    }
    $('#play').hide();
    $('#pause').show();
    btn.disabled = false;
}

function lrcCurrentAp1() {
    var timeNow = Math.round(ap1.audio.currentTime);
    if ($.inArray(timeNow, lrcTimeLine) > 0) {
        var $lineNow = $('.wenkmLrc' + timeNow);
        if (!$lineNow.hasClass(cur)) {
            $lineNow.addClass(cur).siblings().removeClass(cur);
            $('#wenkmLrc').animate({
                scrollTop: lrcHeight * $lineNow.index()
            })
        }
    } else {
        lrcCont = '';
    }
}

function lrcCurrentAp2() {
    var timeNow = Math.round(ap2.audio.currentTime);
    if ($.inArray(timeNow, lrcTimeLine) > 0) {
        var $lineNow = $('.wenkmLrc' + timeNow);
        if (!$lineNow.hasClass(cur)) {
            $lineNow.addClass(cur).siblings().removeClass(cur);
            $('#wenkmLrc').animate({
                scrollTop: lrcHeight * $lineNow.index()
            })
        }
    } else {
        lrcCont = '';
    }
}

function lrcCurrentAp3() {
    var timeNow = Math.round(ap3.audio.currentTime);
    if ($.inArray(timeNow, lrcTimeLine) > 0) {
        var $lineNow = $('.wenkmLrc' + timeNow);
        if (!$lineNow.hasClass(cur)) {
            $lineNow.addClass(cur).siblings().removeClass(cur);
            $('#wenkmLrc').animate({
                scrollTop: lrcHeight * $lineNow.index()
            })
        }
    } else {
        lrcCont = '';
    }
}

function lrcCurrentAp4() {
    var timeNow = Math.round(ap4.audio.currentTime);
    if ($.inArray(timeNow, lrcTimeLine) > 0) {
        var $lineNow = $('.wenkmLrc' + timeNow);
        if (!$lineNow.hasClass(cur)) {
            $lineNow.addClass(cur).siblings().removeClass(cur);
            $('#wenkmLrc').animate({
                scrollTop: lrcHeight * $lineNow.index()
            })
        }
    } else {
        lrcCont = '';
    }
}

function loadLrc(lrctext, typeNo) {
    if (typeof (lrctext) == 'undefined') {
        songFrom44 = ' - 暂无歌词!', $songFrom3.html('<i class="fa fa-times-circle"></i> 暂无歌词');
        $(".switch-ksclrc").hide();
        $(".switch-down").css("right", "35px");
        $(".switch-default").css("right", "65px");
    } else {
        if (lrctext.indexOf('[00') >= 0) {
            setTimeout(function () {
                if (!$('#wenkmLrc').hasClass('hide')) {
                    songFrom44 = ' - Lrc歌词获取成功!'
                } else {
                    songFrom44 = ' - Lrc歌词已关闭！'
                };
                hasLrc = true;
                function formatTime(t) {
                    var sp = t.split(':'),
                        min = +sp[0],
                        sec = +sp[1].split('.')[0],
                        ksec = +sp[1].split('.')[1];
                    return min * 60 + sec + Math.round(ksec / 1000);
                };
                var lrcCont = lrctext.replace(/\[[A-Za-z]+:(.*?)]/g, '').replace('\\n', '').split(/[\]\[]/g),
                    lrcLine = '';
                lrcTimeLine = [];
                for (var i = 1; i < lrcCont.length; i += 2) {
                    var timer = formatTime(lrcCont[i]);
                    lrcTimeLine.push(timer);
                    if (i == 1) {
                        lrcLine += '<li class="wenkmLrc' + timer + ' current">' + lrcCont[i + 1] + '</li>'
                    } else {
                        lrcLine += '<li class="wenkmLrc' + timer + '">' + lrcCont[i + 1] + '</li>'
                    }
                }
                $('#wenkmLrc').html('<ul>' + lrcLine + '</ul>');
                setTimeout(function () {
                    $('#wenkmLrc').addClass('show');
                }, 500);
                // console.log(typeNo);
                if (typeNo == 1) {
                    lrcTime = setInterval(lrcCurrentAp1, 500);
                } else if (typeNo == 2) {
                    lrcTime = setInterval(lrcCurrentAp2, 500);
                } else if (typeNo == 3) {
                    lrcTime = setInterval(lrcCurrentAp3, 500);
                } else if (typeNo == 4) {
                    lrcTime = setInterval(lrcCurrentAp4, 500);
                }

            }, 500);
        } else {
            songFrom44 = ' - 暂无歌词!', $songFrom3.html('<i class="fa fa-times-circle"></i> 暂无歌词');
            $(".switch-ksclrc").hide();
            $(".switch-down").css("right", "35px");
            $(".switch-default").css("right", "65px");
        }
    }
}

function lrcLoad(lrcTempUrl, typeNo) {
    wenkmLrc.lrc.hide();
    hasLrc = false;
    hasKsc = false;
    $('#wenkmLrc, #wenkmKsc').html('');
    setTimeout(function () {
        if (hasgeci) {
            $songFrom3.html('<i class="fa fa-check-circle"></i> 歌词' + songFrom33);
        } else {
            $songFrom3.html('<i class="fa fa-times-circle"></i> 歌词' + songFrom33);
        };
        $(".switch-down").css("right", "65px");
        $(".switch-default").css("right", "95px");
        if (hasdefault) {
            setTimeout(function () {
                $(".switch-ksclrc").show()
            }, 300);
        } else {
            $(".switch-ksclrc").show()
        }
        $.ajax({
            url: lrcTempUrl,
            success: function (lrctext) {
                loadLrc(lrctext, typeNo);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                loadLrc(XMLHttpRequest.responseText, typeNo);
            }
        });
    }, 500);
}

// 获取当前路径图片颜色
function colorChange(imgUrl) {
    // 封面图案
    var coverImg = new Image();
    coverImg.src = imgUrl;
    coverImg.onload = function () {
        // 刷新随机数
        randomColorIndex();
        var contEr = contErArray[colorIndex];
        $player.css({
            background: 'rgba(' + contEr + ',.8)'
        });
        $player1.css({
            background: 'rgba(' + contEr + ',.3)'
        });
        $tips.css({
            background: 'rgba(' + contEr + ',.6)'
        });
        $lk.css({
            background: 'rgba(' + contEr + ',.3)'
        });
    };
}

$('.menu a').click(function () {
    target = $(this).attr('goto');
    switchTo(target);
    $('.menu li a').each(function () {
        $(this).removeClass('active');
    });
    $(this).addClass('active');
});

var loveFlag = true;
var neteaseFlag = true;
var serachFlag = true;
function switchTo(target) {
    // console.log(target);
    if (target == '#love' && loveFlag) {
        // 初始化我的喜欢
        ap3Init();
    } else if (target == '#netease' && neteaseFlag) {
        // 初始化网易云热歌
        ap2Init();
    } else if (target == '#serach' && serachFlag) {
        // 初始化搜索列表
        search(document.getElementById("serachBtn"));
    }
    $('.left section').each(function () {
        $(this).removeClass('active');
    });
    $(target).addClass('active');
}

// 初始化我的列表
var ap1Array = getLove();
if (ap1Array.length > 0) {
    ap1.list.clear();
    ap1.list.add(ap1Array);
} else {
    layer.msg('出现错误，请刷新页面');
}
aplist1 = ap1Array;

var typing = new Typing({
    source: document.getElementById('source'),
    output: document.getElementById('hitokoto'),
    delay: 120
});

function gethitokoto() {
    $.ajax({
        url: "https://v1.hitokoto.cn",
        success: function (result) {
            write(result.hitokoto);
        }
    });
}

function write(text) {
    /* if (text.length < 25) {
        $('#hitokoto').html('');
        $('#source').html(text);
        typing.start();
    } else {
        gethitokoto();
    } */
    $('#hitokoto').html('');
    $('#source').html(text);
    typing.start();
}

gethitokoto();

if (!isMobile()) {
    ap1.on('play', function () {
        if (audio) {
            audio.pause();
        }
        aplaying = 'ap1';
        var index1 = ap1.list.index;
        colorChange(aplist1[index1].cover);
        // 给歌词地址赋值
        lrcurl = aplist1[index1].lrc;
        lrcLoad(lrcurl, 1);
        $('#author').html(aplist1[index1].artist);
        $('#title').html(aplist1[index1].name);
        wenkmTips.show('歌词加载中 - ' + aplist1[index1].artist + ' - ' + aplist1[index1].name);
        // 刷新一言
        gethitokoto();
        initController();
    });

    ap2.on('play', function () {
        if (audio) {
            audio.pause();
        }
        aplaying = 'ap2';
        var index2 = ap2.list.index;
        colorChange(aplist2[index2].cover);
        // 给歌词地址赋值
        lrcurl = aplist2[index2].lrc;
        lrcLoad(lrcurl, 2);
        $('#author').html(aplist2[index2].artist);
        $('#title').html(aplist2[index2].name);
        wenkmTips.show('歌词加载中 - ' + aplist2[index2].artist + ' - ' + aplist2[index2].name);
        // 刷新一言
        gethitokoto();
        initController();
    });

    ap3.on('play', function () {
        if (audio) {
            audio.pause();
        }
        aplaying = 'ap3';
        var index3 = ap3.list.index;
        colorChange(aplist3[index3].cover);
        // 给歌词地址赋值
        lrcurl = aplist3[index3].lrc;
        lrcLoad(lrcurl, 3);
        $('#author').html(aplist3[index3].artist);
        $('#title').html(aplist3[index3].name);
        wenkmTips.show('歌词加载中 - ' + aplist3[index3].artist + ' - ' + aplist3[index3].name);
        // 刷新一言
        gethitokoto();
        initController();
    });

    ap4.on('play', function () {
        if (audio) {
            audio.pause();
        }
        aplaying = 'ap4';
        var index4 = ap4.list.index;
        colorChange(aplist4[index4].cover);
        // 给歌词地址赋值
        lrcurl = aplist4[index4].lrc;
        lrcLoad(lrcurl, 4);
        $('#author').html(aplist4[index4].artist);
        $('#title').html(aplist4[index4].name);
        wenkmTips.show('歌词加载中 - ' + aplist4[index4].artist + ' - ' + aplist4[index4].name);
        // 刷新一言
        gethitokoto();
        initController();
    });

    ap1.on('pause', function () {
        clearInterval(lrcTime);
        $('#wenkmLrc').removeClass('show');
        wenkmTips.show('暂停播放');
        $('#pause').hide();
        $('#play').show();
    });

    ap2.on('pause', function () {
        clearInterval(lrcTime);
        $('#wenkmLrc').removeClass('show');
        wenkmTips.show('暂停播放');
        $('#pause').hide();
        $('#play').show();
    });

    ap3.on('pause', function () {
        clearInterval(lrcTime);
        $('#wenkmLrc').removeClass('show');
        wenkmTips.show('暂停播放');
        $('#pause').hide();
        $('#play').show();
    });

    ap4.on('pause', function () {
        clearInterval(lrcTime);
        $('#wenkmLrc').removeClass('show');
        wenkmTips.show('暂停播放');
        $('#pause').hide();
        $('#play').show();
    });
}

function aboutMusic() {
    var QQBtn = '<a href="https://y.qq.com/n/yqq/playlist/6002914459.html" target="_blank"><button type="button" class="btn btn-warning">QQ音乐</button></a>';
    var homeBtn = '<a href="https://dolyw.com" target="_blank"><button type="button" class="btn btn-info active">我的主页</button></a>';
    var neteaseBtn = '<a href="https://music.163.com/#/playlist?id=2553791717" target="_blank"><button type="button" class="btn btn-danger">网易云音乐</button></a>';
    layer.msg(homeBtn + neteaseBtn + QQBtn);
}