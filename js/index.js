// CheckOS
var os = function () {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox &&
            /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    };
}();
console.log(os);

const aplayer = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    lrcType: 3,
    order: 'random',
    theme: '#000000',
    volume: 2.0,
    audio: getLove()
});

if (!os.isPc) {
    aplayer.lrc.toggle();
    $(".aplayer-icon-lrc").addClass("aplayer-icon-lrc-inactivity");
}

// Animate
$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = (function (el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});

// 获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seconds = date.getSeconds();
    return String(seconds).length < 2 ? (seconds = "0" + seconds) : seconds;
}

function loveHitokoto() {
    fetch("https://v1.hitokoto.cn?encode=json").then(function (response) {
        return response.json();
    }).then(function (data) {
        var secondsTemp = getNowFormatDate();
        $("#like_number1").attr("data-badge", secondsTemp);
        $("#like_number2").attr("data-badge", secondsTemp);
        if ($('#hitokoto').hasClass("animated")) {
            $('#hitokoto').removeClass("animated");
            $('#hitokoto').removeClass("fadeIn");
        }
        $('#hitokoto').animateCss('bounce');
        $('#hitokoto_text').text(data.hitokoto);
        var author = !!data.from ? data.from : "无名氏"
        $('#hitokoto_author').text("-「" + author + "」");
        window.setTimeout(loveHitokoto, 8888);
    }).catch(function (err) {
        console.error(`在更新一言时捕获错误， 错误信息: ${err.message}. 当前时间: ${new Date().toISOString()}`);
        loveHitokoto();
    });
}

loveHitokoto();
// window.setTimeout(loveHitokoto, 200);

// 跳转
function bookmarks() {
    window.open("https://mark.wang64.cn/bookmarks");
}

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
                    'https://wang926454.gitee.io/reader/Image/201811/normal/05025.png',
                    'https://wang926454.gitee.io/reader/Image/201901/normal/11010.png'];

function back() {
    var indexImage = document.getElementsByClassName('background');
    var img = new Image();
    var url = imageUrls[Math.floor(imageUrls.length * Math.random())];
    img.src = url;
    img.onload = function () {
    indexImage[0].style.backgroundImage = "url(" + url + ")";
    }
}

var num = 0;
function back2() {
    if (os.isPc) {
        var url = "https://wang926454.gitee.io/reader/Image/201812/normal/23005.png";
        if (num == 0) {
            num = 1;
        } else {
            url = "https://wang926454.gitee.io/reader/Image/201812/normal/21005.png";
            num = 0;
        }
        var indexImage = document.getElementsByClassName('background');
        var img = new Image();
        img.src = url;
        img.onload = function () {
            indexImage[0].style.backgroundImage = "url(" + url + ")";
        };
    }
}

// window.setTimeout(back, 1500);