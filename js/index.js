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
// console.log(os);

const aplayer = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    lrcType: 3,
    order: 'random',
    theme: '#000000',
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

/* function loveHitokoto() {
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
} */

// loveHitokoto();
// window.setTimeout(loveHitokoto, 200);

// 跳转书签
/* function bookmarks() {
    window.open("https://mark.dolyw.com/bookmarks");
} */

var imageUrls = ['https://dolyw.gitee.io/reader/Image/201810/normal/20010.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/02015.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/05020.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/05005.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/05030.png',
    'https://dolyw.gitee.io/reader/Image/201810/normal/10005.png',
    'https://dolyw.gitee.io/reader/Image/201810/normal/20030.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/01005.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/01010.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/01020.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/01025.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/04035.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/04040.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/04045.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/04050.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/04055.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/04060.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/05010.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/05015.png',
    'https://dolyw.gitee.io/reader/Image/201811/normal/05025.png',
    'https://dolyw.gitee.io/reader/Image/201901/normal/11010.png'];

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
        var url = "https://dolyw.gitee.io/reader/Image/201903/normal/12005.png";
        if (num == 0) {
            num = 1;
        } else {
            url = "https://dolyw.gitee.io/reader/Image/201812/normal/23005.png";
            num = 0;
        }
        var indexImage = document.getElementsByClassName('background');
        var img = new Image();
        img.src = url;
        img.onload = function () {
            $("#bg").hide();
            indexImage[0].style.backgroundImage = "url(" + url + ")";
            $("#bg").fadeIn(1000);
        };
    }
}

// window.setTimeout(back, 1500);
back2();

// 新建组件
var myDanmakuTpl = Vue.extend({
    template: '#danmakuTpl',
    props: {
        danmus: {
            type: Array,
            required: true
        },
        config: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data: function () {
        return {
            container: null,
            isActive: false,
            timer: null,
            $danmaku: null,
            $danmus: null,
            danmaku: {
                danmus: [],
                width: 0, // danmaku宽度
                channels: 0, // 轨道数量
                loop: false // 是否循环
            },
            danmu: {
                height: 30,
                fontSize: 18,
                speed: 5
            },
            hidden: false,
            paused: false,
            index: 0,
            continue: true,
            danChannel: {}
        }
    },
    // 启动时就执行
    mounted: function () {
        this.$nextTick(() => {
            this.init()
            this.$emit('inited')
        })
    },
    methods: {
        init() {
            this.initCore()
            this.initConfig()
        },
        reset() {
            this.initConfig()
        },
        mouseIn() {
            this.$emit('mouseIn')
        },
        mouseOut() {
            this.$emit('mouseOut')
        },
        initCore() {
            this.$danmaku = this.$refs.danmaku
            this.$danmus = this.$refs.danmus
        },
        initConfig() {
            this.danmaku.width = this.$danmaku.offsetWidth
            this.danmaku.height = this.$danmaku.offsetHeight
            this.danmaku.danmus = this.danmus
            this.danmaku.channels = this.config.channels || parseInt(this.danmaku.height / this.danmu.height)
            this.danmaku.loop = this.config.loop || this.danmaku.loop
            this.danmu.speed = this.config.speed || this.danmu.speed
            this.danmu.fontSize = this.config.fontSize || this.danmu.fontSize
        },
        play() {
            if (this.paused) {
                this.paused = false
                return
            }
            if (!this.timer) {
                this.draw()
            }
        },
        draw() {
            this.$nextTick(() => {
                this.timer = setInterval(() => {
                    if (this.index > this.danmus.length - 1) {
                        // console.log('1')
                        this.config.loop ? this.insert() : this.clear()
                    } else {
                        // console.log('2')
                        this.insert()
                    }
                }, 50)
            })
        },
        insert() {
            const index = this.config.loop ? this.index % this.danmus.length : this.index
            const el = document.createElement(`p`)
            if (this.continue) {
                el.classList.add(`dm`)
                el.classList.add(`move`)
                el.style.animationDuration = `${this.danmu.speed}s`
                el.style.fontSize = `${this.danmu.fontSize}px`
                el.innerHTML = this.danmus[index]
                el.setAttribute('index', this.index)
                this.$danmus.appendChild(el)
            }
            this.$nextTick(() => {
                let channelIndex = this.getChannel(el)
                if (channelIndex >= 0) {
                    this.continue = true
                    const width = el.offsetWidth
                    const height = this.danmu.height > this.danmu.fontSize ? this.danmu.height : this.danmu.fontSize + 4
                    el.style.top = channelIndex * height + 'px'
                    el.style.width = width + 1 + 'px'
                    el.style.transform = `translateX(-${this.danmaku.width}px)`
                    el.addEventListener('animationend', () => {
                        this.$danmus.removeChild(el)
                    })
                    if (el.classList.length > 0) {
                        this.index++
                    }
                } else {
                    if (el.classList.length > 0) {
                        this.$danmus.removeChild(el)
                    }
                }
            })
        },
        getChannel(el) {
            const tmp = this.$danmus.offsetWidth / ((this.$danmus.offsetWidth + el.offsetWidth) / 6)
            for (let i = 0; i < this.danmaku.channels; i++) {
                const items = this.danChannel[i + '']
                if (items && items.length) {
                    for (let j = 0; j < items.length; j++) {
                        const danRight = this.getDanRight(items[j]) - 10
                        if (danRight <= this.$danmus.offsetWidth - tmp * ((this.$danmus.offsetWidth + parseInt(items[j].offsetWidth)) / 6) || danRight <= 0) {
                            break
                        }
                        if (j === items.length - 1) {
                            this.danChannel[i + ''].push(el)
                            el.addEventListener('animationend', () => {
                                this.danChannel[i + ''].splice(0, 1)
                            })
                            return i % this.danmaku.channels
                        }
                    }
                } else {
                    this.danChannel[i + ''] = [el]
                    el.addEventListener('animationend', () => {
                        this.danChannel[i + ''].splice(0, 1)
                    })
                    return i % this.danmaku.channels
                }
            }
            return -1
        },
        // 弹幕到右侧的距离
        getDanRight(el) {
            const eleWidth = el.offsetWidth || parseInt(el.style.width)
            const eleRight = el.getBoundingClientRect().right || this.$danmus.getBoundingClientRect().right + eleWidth
            return this.$danmus.getBoundingClientRect().right - eleRight
        },
        // 添加弹幕
        add(danmu) {
            const index = this.index % this.danmaku.danmus.length
            this.danmaku.danmus.splice(index, 0, danmu)
        },
        pause() {
            this.paused = true
        },
        stop() {
            this.danChannel = {}
            this.$refs.danmus.innerHTML = ''
            this.paused = false
            this.hidden = false
            this.clear()
        },
        clear() {
            clearInterval(this.timer)
            this.timer = null
            this.index = 0
        },
        show() {
            this.hidden = false
        },
        hide() {
            this.hidden = true
        },
        resize() {
            this.initConfig()
            const items = this.$danmaku.getElementsByClassName('dm')
            for (let i = 0; i < items.length; i++) {
                items[i].style.transform = `translateX(-${this.danmaku.width}px)`
            }
        }
    }
});

// 全局注册组件每个Vue实例都可以使用
Vue.component('my-danmaku', myDanmakuTpl);

var myHome = new Vue({
    el: '#app',
    data: {
        config: {
            channels: 5,
            loop: true,
            speed: 15,
            fontSize: 18
        },
        data: [
            '看到这条弹幕你已经不是前1000了~＞ω＜',
            '大军还有一秒到达现场~⊙﹏⊙',
            "红红火火恍恍惚惚，韩红会画画后悔画韩寒~(●'◡'●)",
            '开心的像个200多斤的孩子~⊙０⊙',
            'B站看片指日可待~∩０∩',
            '此生无悔入海贼，来世愿做船上人~●ω●',
            'BGM~爱的自杀，再问供养，唉，我都要哭了~∪ω∪',
            "牛顿的棺材板压不住了~(●'◡'●)",
            '教练我想学这个~o(*////▽////*)o'
        ],
        danmus: []
    },
    // 启动时就执行
    mounted: function () {
        this.$nextTick(() => {
            // 判断手机还是PC
            var viewType = navigator.userAgent.toLowerCase()
            viewType = viewType.match(/(phone|pad|pod|midp|iphone|ipod|iphone os|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|rv:1.2.3.4|ucweb|fennec|wosbrowser|browserng|webos|symbian|windows ce|windows mobile|windows phone)/i)
            if (viewType) {
                this.config.speed = 8
                this.$refs.myDanmaku.reset()
            }
            this.getHitokoto()
            this.loveHitokoto()
        })
    },
    methods: {
        loveHitokoto() {
            fetch("https://v1.hitokoto.cn?encode=json").then(function (response) {
                return response.json();
            }).then((data) => {
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
                this.$refs.myDanmaku.add(data.hitokoto)
                // window.setTimeout(this.loveHitokoto(), 8888);
                setTimeout(() => {
                    this.loveHitokoto()
                }, 8888);
            }).catch((err) => {
                console.error(`在更新一言时捕获错误， 错误信息: ${err.message}. 当前时间: ${new Date().toISOString()}`);
                setTimeout(() => {
                    this.loveHitokoto()
                }, 3333);
            });
        },
        getHitokoto () {
            fetch("https://v1.hitokoto.cn?encode=json").then(function (response) {   
                return response.json();
            }).then((data) => {
                // console.log(data)
                this.$refs.myDanmaku.add(data.hitokoto)
                setTimeout(() => {
                    if (this.danmus.length > 2) {
                        this.$refs.myDanmaku.play()
                    }
                    if (this.danmus.length < 30) {
                        this.getHitokoto()
                    }
                }, 500)
            }).catch((err) => {
                console.log(err)
                this.$refs.myDanmaku.add(this.data[Math.floor(this.data.length * Math.random())])
                setTimeout(() => {
                    if (this.danmus.length > 2) {
                        this.$refs.myDanmaku.play()
                    }
                    if (this.danmus.length < 30) {
                        this.getHitokoto()
                    }
                }, 500)
            });
        }
    }
});