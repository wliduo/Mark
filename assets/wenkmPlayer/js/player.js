/* 根据明月浩空音乐播放器-免费版进行二次修改-dolyw.com */
var name = "随心";
var domain = "dolyw.com";

// 获取我自己的歌单
var aplist = getLove();

// wangPalyer
var parent = document.getElementById('wangPlayer');
// 添加wenkmPlayer
var div = document.createElement("div");
div.setAttribute("id", "wenkmPlayer");
div.innerHTML = '<div class="player"><div class="infos"><div class="songstyle"><i class="fa fa-reddit-alien"></i><span class="song"></span></div><div class="timestyle"><i class="fa fa-life-ring"></i><span class="time">00:00/00:00</span></div><div class="artiststyle"><i class="fa fa-heartbeat"></i><span class="artist"></span><span class="moshi"><i class="loop fa fa-random current"></i>&nbsp;<span class="moshi1">随机播放</span></span></div><div class="artiststyle"><i class="fa fa-anchor"></i><span class="artist1"></span><span class="geci"></span></div></div><div class="control"><i class="loop fa fa-share"title="顺序播放"></i><i class="prev fa fa-backward"title="上一首"></i><div class="status"><b><i class="play fa fa-play"title="播放"></i><i class="pause fa fa-pause"title="暂停"></i></b></div><i class="next fa fa-forward"title="下一首"></i><i class="random fa fa-random current"title="随机播放"></i></div><div class="musicbottom"><div class="volume"><i class="mute fa fa-volume-off"></i><i class="volumeup fa fa-volume-up"></i><div class="progress"><div class="volume-on ts5"><div class="drag"title="音量"></div></div></div></div><div class="switch-playlist"><i class="fa fa-bars"title="播放列表"></i></div><div class="switch-ksclrc"><i class="fa fa-toggle-on"title="关闭歌词"></i></div><div class="switch-default"><i class="fa fa-refresh"title="切换默认专辑"></i></div></div><div class="cover"></div></div><div class="playlist"><div class="playlist-bd"><div class="album-list"><div class="musicheader"></div><div class="list"></div></div><div class="song-list"><div class="musicheader"><span></span></div><div class="list"><ul></ul></div></div></div></div><div class="switch-player"><i class="fa fa-angle-right"style="margin-top: 20px;"></i></div>';
parent.appendChild(div);
// 添加wenkmTips
var div = document.createElement("div");
div.setAttribute("id", "wenkmTips");
parent.appendChild(div);
// 添加wenkmLrc
var div = document.createElement("div");
div.setAttribute("id", "wenkmLrc");
parent.appendChild(div);
// 添加myhk_pjax_loading_frame
var div = document.createElement("div");
div.setAttribute("class", "myhk_pjax_loading_frame");
parent.appendChild(div);
// 添加myhk_pjax_loading
var div = document.createElement("div");
div.setAttribute("class", "myhk_pjax_loading");
parent.appendChild(div);

// 第一次打印歌曲信息
var startIndex = true;

jQuery.cookie = function (name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

if ((top.location != self.location)) {
	$("#wenkmPlayer").hide()
} else {
	var audio = new Audio(),
		$player = $('#wenkmPlayer'),
		$tips = $('#wenkmTips'),
		$lk = $('#wenkmKsc, #wenkmLrc'),
		$player1 = $('.switch-player', $player),
		$btns = $('.status', $player),
		$songName = $('.song', $player),
		$cover = $('.cover', $player),
		$songTime = $(".time", $player),
		$songList = $('.song-list .list', $player);
	$albumList = $('.album-list', $player),
		$songFrom = $('.player .artist', $player),
		$songFrom1 = $('.player .artist1', $player),
		$songFrom2 = $('.player .moshi', $player),
		$songFrom3 = $('.player .geci', $player),
		$songFrom4 = $('.player .switch-ksclrc', $player),
		songFrom33 = '开启',
		songFrom44 = '',
		roundcolor = '#6C6971',
		lightcolor = '#4169E1',
		cur = 'current',
		homeurl = 'https://dolyw.com',
		volume = $.cookie('myhk_player_volume') ? $.cookie('myhk_player_volume') : '.70',
		albumId = 0,
		songId = 0,
		songTotal = 0,
		showLrc = true,
		random = true,
		hasgeci = true,
		ycgeci = true,
		hasdefault = false,
		musicfirsttip = false;

	// 歌词
	var hasLrc = false,
		// 是否有lrc歌词
		hasKsc = false,
		// 是否有ksc歌词
		kscLineNow1 = false,
		// 是否执行到第1行
		kscLineNow2 = false,
		// 是否执行到第2行
		lrcTimeLine = [],
		lrcHeight = $('#wenkmLrc').height(),
		lrcTime = null,
		kscTime = null,
		letterTime1 = null,
		letterTime2 = null,
		lrcCont = '',
		kscCont = '',
		tempNum1 = 0,
		tempNum2 = 0;

	var wenkmLrc = {
		load: function () {
			wenkmLrc.lrc.hide();
			hasLrc = false;
			hasKsc = false;
			$('#wenkmLrc, #wenkmKsc').html('');
			setTimeout(function () {
				if (hasgeci) {
					$songFrom3.html('<i class="fa fa-indent"></i> 歌词' + songFrom33);
				} else {
					$songFrom3.html('<i class="fa fa-outdent"></i> 歌词' + songFrom33);
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
					url: lrcurl,
					success: function (lrctext) {
						if (typeof (lrctext) == 'undefined') {
							songFrom44 = ' - 暂无歌词', $songFrom3.html('<i class="fa fa-outdent"></i> 暂无歌词');
							$(".switch-ksclrc").hide();
							$(".switch-down").css("right", "35px");
							$(".switch-default").css("right", "65px");
						} else {
							if (lrctext.indexOf('[00') >= 0) {
								setTimeout(function () {
									if (!$('#wenkmLrc').hasClass('hide')) {
										songFrom44 = ' - Lrc歌词获取成功'
									} else {
										songFrom44 = ' - Lrc歌词已关闭'
									};
									wenkmLrc.lrc.format(lrctext);
								}, 500);
							} else {
								songFrom44 = ' - 暂无歌词', $songFrom3.html('<i class="fa fa-outdent"></i> 暂无歌词');
								$(".switch-ksclrc").hide();
								$(".switch-down").css("right", "35px");
								$(".switch-default").css("right", "65px");
							}
						}
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						// console.log(XMLHttpRequest.responseText);
						var lrctext = XMLHttpRequest.responseText;
						if (typeof (lrctext) == 'undefined') {
							songFrom44 = ' - 暂无歌词', $songFrom3.html('<i class="fa fa-outdent"></i> 暂无歌词');
							$(".switch-ksclrc").hide();
							$(".switch-down").css("right", "35px");
							$(".switch-default").css("right", "65px");
						} else {
							if (lrctext.indexOf('[00') >= 0) {
								setTimeout(function () {
									if (!$('#wenkmLrc').hasClass('hide')) {
										songFrom44 = ' - Lrc歌词获取成功'
									} else {
										songFrom44 = ' - Lrc歌词已关闭'
									};
									wenkmLrc.lrc.format(lrctext);
								}, 500);
							} else {
								songFrom44 = ' - 暂无歌词', $songFrom3.html('<i class="fa fa-outdent"></i> 暂无歌词');
								$(".switch-ksclrc").hide();
								$(".switch-down").css("right", "35px");
								$(".switch-default").css("right", "65px");
							}
						}
					}
				});
			}, 500);
		},
		lrc: {
			format: function (lrctext) {
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
				lrcTime = setInterval(wenkmLrc.lrc.play, 500)
			},
			play: function () {
				var timeNow = Math.round(audio.currentTime);
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
			},
			hide: function () {
				clearInterval(lrcTime);
				$('#wenkmLrc').removeClass('show');
			}
		}
	}

	function wenkmCicle() {
		$songTime.text(formatSecond(audio.currentTime) + " / " + formatSecond(audio.duration));
		if (audio.currentTime < audio.duration / 2) {
			$btns.css('background-image', 'linear-gradient(90deg, ' + roundcolor + ' 50%, transparent 50%, transparent), linear-gradient(' + (90 + (270 - 90) / (audio.duration / 2) * audio.currentTime) + 'deg, ' + lightcolor + ' 50%, ' + roundcolor + ' 50%, ' + roundcolor + ')');
		} else {
			$btns.css('background-image', 'linear-gradient(' + (90 + (270 - 90) / (audio.duration / 2) * audio.currentTime) + 'deg, ' + lightcolor + ' 50%, transparent 50%, transparent), linear-gradient(270deg, ' + lightcolor + ' 50%, ' + roundcolor + ' 50%, ' + roundcolor + ')')
		}
	}

	function formatSecond(t) {
		return ("00" + Math.floor(t / 60)).substr(-2) + ":" + ("00" + Math.floor(t % 60)).substr(-2)
	}

	var cicleTime = null;
	$cover.html('<img id="headImage" src="https://cdn.jsdelivr.net/gh/wliduo/CDN@master/avatar/01_thn.png">');
	$songName.html('<a style="color:#f00">初始化失败</a>');
	$songFrom.html('<a href="https://dolyw.com" title="随心" target="_blank" style="color:#f00">随心</a>');
	$songFrom1.html('<a style="color:#f00">音乐播放器</a>');
	$songFrom3.html('<i class="fa fa-outdent"></i> 歌词未载入');
	/* $player.css({
		background: '#38343e'
	});
	$player1.css({
		background: '#38343e'
	});
	$tips.css({
		background: '#38343e'
	});
	$lk.css({
		background: '#38343e'
	}); */

	var contEr = '108, 105, 113';
	// var contEr = Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256);
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

	var wenkmMedia = {
		play: function () {
			$player.addClass('playing');
			cicleTime = setInterval(wenkmCicle, 800);
			if (hasLrc) {
				lrcTime = setInterval(wenkmLrc.lrc.play, 500);
				$('#wenkmLrc').addClass('show');
				$(".switch-down").css("right", "65px");
				$(".switch-default").css("right", "95px");
				if (hasdefault) {
					setTimeout(function () {
						$(".switch-ksclrc").show()
					}, 300);
				} else {
					$(".switch-ksclrc").show()
				}
			}
			if (hasKsc) {
				kscTime = setInterval(wenkmLrc.ksc.play, 95);
				$('#wenkmKsc').addClass('showPlayer');
				$(".switch-down").css("right", "65px");
				$(".switch-default").css("right", "95px");
				if (hasdefault) {
					setTimeout(function () {
						$(".switch-ksclrc").show()
					}, 300);
				} else {
					$(".switch-ksclrc").show()
				}
			}
		},
		pause: function () {
			clearInterval(cicleTime);
			$player.removeClass('playing');
			$(".switch-ksclrc").hide();
			$(".switch-down").css("right", "35px");
			$(".switch-default").css("right", "65px");
			if (hasLrc) {
				wenkmLrc.lrc.hide();
			};
		},
		error: function () {
			clearInterval(cicleTime);
			$player.removeClass('playing');
			wenkmTips.show(aplist[songId].author + ' - ' + aplist[songId].title + ' - 资源获取失败');
			setTimeout(function () {
				$cover.removeClass('coverplay')
			}, 1000);
			$(".myhk_pjax_loading_frame,.myhk_pjax_loading").hide();
		},
		seeking: function () {
			clearInterval(cicleTime);
			$player.removeClass('playing');
			wenkmTips.show('加载中...');
		},
		volumechange: function () {
			var vol = parseInt(audio.volume * 100);
			$('.volume-on', $player).width(vol + '%');
		},
		getInfos: function (id) {
			$cover.removeClass('coverplay');
			songId = id;
			netmusic();
		},
		getSongId: function (n) {
			return n >= songTotal ? 0 : n < 0 ? songTotal - 1 : n;
		},
		next: function () {
			if (random) {
				wenkmMedia.getInfos(parseInt(Math.random() * songTotal))
			} else {
				wenkmMedia.getInfos(wenkmMedia.getSongId(songId + 1))
			}
		},
		prev: function () {
			if (random) {
				wenkmMedia.getInfos(parseInt(Math.random() * songTotal))
			} else {
				wenkmMedia.getInfos(wenkmMedia.getSongId(songId - 1))
			}
		}
	};

	var wenkmTipsTime = null;
	var wenkmTips = {
		show: function (cont) {
			clearTimeout(wenkmTipsTime);
			$('#wenkmTips').text(cont).addClass('show');
			this.hide();
		},
		hide: function () {
			wenkmTipsTime = setTimeout(function () {
				$('#wenkmTips').removeClass('show')
				if (musicfirsttip == false) {
					musicfirsttip = true;
				}
			}, 4000)
		}
	};

	audio.addEventListener('play', wenkmMedia.play, false);
	audio.addEventListener('pause', wenkmMedia.pause, false);
	audio.addEventListener('ended', wenkmMedia.next, false);
	audio.addEventListener('playing', wenkmMedia.playing, false);
	audio.addEventListener('volumechange', wenkmMedia.volumechange, false);
	audio.addEventListener('error', wenkmMedia.error, false);
	audio.addEventListener('seeking', wenkmMedia.seeking, false);

	// 播放器开关
	$player1.click(function () {
		$player.toggleClass('show');
	});

	// 播放交互
	$('.pause', $player).click(function () {
		hasgeci = false;
		if (!$('.list', $albumList).html() == '' && $('[data-album=' + albumId + ']').length) {
			// 当前专辑的歌曲列表高亮当前项
			$('[data-album=' + albumId + ']').find('li').eq(songId).addClass(cur).find('.artist').html('暂停播放&nbsp;>&nbsp;').parent().siblings().removeClass(cur).find('.artist').html('').parent();
		};
		wenkmTips.show('暂停播放 - ' + aplist[songId].author + ' - ' + aplist[songId].title);
		$cover.removeClass('coverplay');
		audio.pause()
	});
	$('.play', $player).click(function () {
		hasgeci = true;
		$("#wenkmLrc,#wenkmKsc").show();
		if (!$('.list', $albumList).html() == '' && $('[data-album=' + albumId + ']').length) {
			// 当前专辑的歌曲列表高亮当前项
			$('[data-album=' + albumId + ']').find('li').eq(songId).addClass(cur).find('.artist').html('当前播放&nbsp;>&nbsp;').parent().siblings().removeClass(cur).find('.artist').html('').parent();
		};
		wenkmTips.show('开始播放 - ' + aplist[songId].author + ' - ' + aplist[songId].title);
		$cover.addClass('coverplay');
		audio.play()
	});
	$('.prev', $player).click(function () {
		hasgeci = true;
		$("#wenkmLrc,#wenkmKsc").show();
		wenkmMedia.prev()
		$(".myhk_pjax_loading_frame,.myhk_pjax_loading").show();
	});
	$('.next', $player).click(function () {
		hasgeci = true;
		$("#wenkmLrc,#wenkmKsc").show();
		wenkmMedia.next()
		$(".myhk_pjax_loading_frame,.myhk_pjax_loading").show();
	});
	$('.random', $player).click(function () {
		$(this).addClass(cur);
		$('.loop', $player).removeClass(cur);
		random = true;
		wenkmTips.show('随机播放');
		$songFrom2.html('<i class="random fa fa-random current"></i> 随机播放');
	});
	$('.loop', $player).click(function () {
		$(this).addClass(cur);
		$('.random', $player).removeClass(cur);
		random = false;
		wenkmTips.show('顺序播放');
		$songFrom2.html('<i class="loop fa fa-share"></i> 顺序播放');
	});
	// 音量交互
	var $progress = $('.progress', $player);
	$progress.click(function (e) {
		var progressWidth = $progress.width(),
			progressOffsetLeft = $progress.offset().left;
		volume = (e.clientX - progressOffsetLeft) / progressWidth;
		$.cookie("myhk_player_volume", volume, {
			path: "/",
			expires: 0
		});
		audio.volume = volume;
	});
	var isDown = false;
	$('.drag', $progress).mousedown(function () {
		isDown = true;
		$('.volume-on', $progress).removeClass('ts5');
	});
	$(window).on({
		mousemove: function (e) {
			if (isDown) {
				var progressWidth = $progress.width(),
					progressOffsetLeft = $progress.offset().left,
					eClientX = e.clientX;
				if (eClientX >= progressOffsetLeft && eClientX <= progressOffsetLeft + progressWidth) {
					$('.volume-on', $progress).width((eClientX - progressOffsetLeft) / progressWidth * 100 + '%');
					volume = (eClientX - progressOffsetLeft) / progressWidth;
					audio.volume = volume;
				}
			}
		},
		mouseup: function () {
			isDown = false;
			$('.volume-on', $progress).addClass('ts5');
		}
	});

	// 播放列表交互
	$('.switch-playlist').click(function () {
		$player.toggleClass('showAlbumList')
	});
	$songList.mCustomScrollbar();
	$('.song-list .musicheader,.song-list .fa-angle-right', $player).click(function () {
		$player.removeClass('showSongList');
	});
	$('.switch-ksclrc').click(function () {
		$player.toggleClass('ksclrc');
		$('#wenkmLrc').toggleClass('hide');
		$('#wenkmKsc').toggleClass('hidePlayer');
		if (!$('#wenkmLrc').hasClass('hide')) {
			ycgeci = true;
			if (hasLrc) {
				$songFrom3.html('<i class="fa fa-indent"></i> 歌词开启');
			};
			if (hasKsc) {
				$songFrom3.html('<i class="fa fa-indent"></i> Ksc歌词开启');
			};
			wenkmTips.show('开启歌词显示');
			songFrom33 = '开启', $songFrom4.html('<i class="fa fa-toggle-on" title="关闭歌词"></i>');
		} else {
			ycgeci = false;
			if (hasLrc) {
				$songFrom3.html('<i class="fa fa-outdent"></i> 歌词关闭');
			};
			if (hasKsc) {
				$songFrom3.html('<i class="fa fa-outdent"></i> Ksc歌词关闭');
			};
			wenkmTips.show('歌词显示已关闭');
			songFrom33 = '关闭', $songFrom4.html('<i class="fa fa-toggle-off" title="打开歌词"></i>');
		};
		musictooltip()
	});
	$('.switch-default').click(function () {
		id = 0;
		albumId = 0;
		songId = 0;
		songTotal = 0;
		$player.removeClass('showSongList');
		$(".myhk_pjax_loading_frame,.myhk_pjax_loading").show();
	});

	wenkmPlayer.playList = {
		creat: {
			album: function () {
				// 专辑总数
				var albumTotal = 1,
					albumList = '';
				// 绑定专辑点击事件，得到当前专辑ID
				var id = 0;
				// 生成当前专辑歌曲列表，第二个参数为是否是当前列表，以此判断获取的歌曲列表是否有高亮显示的情况
				wenkmPlayer.playList.creat.song(id, true);
				// 切换到歌曲列表，获取歌曲总数
				songTotal = aplist.length;
				// 获取指定歌曲信息并尝试播放
				wenkmMedia.getInfos(parseInt(Math.random() * songTotal))
			},
			song: function (id, isThisAlbum) {
				songTotal = aplist.length;
				var songList = '';
				// 头部信息
				$('.musicheader', $albumList).html('我的音乐列表' + '' + '(' + songTotal + ')');
				for (var i = 0; i < songTotal; i++) {
					songList += '<li title="' + aplist[i].author + ' - ' + aplist[i].title + '"><span class="index">' + (i + 1) + '</span>' + '<span class="artist"></span>' + aplist[i].title + '</li>';
				};
				$('.list', $albumList).html('<ul>' + songList + '</ul>').mCustomScrollbar();;
				// 标记当前显示的专辑ID（高亮显示时有用）
				$albumList.attr('data-album', id);
				// 更新滚动条
				$albumList.mCustomScrollbar('update');

				// 绑定歌曲点击事件
				$('li', $albumList).click(function () {
					hasgeci = true;
					$("#wenkmLrc,#wenkmKsc").show();
					$(".myhk_pjax_loading_frame,.myhk_pjax_loading").show();
					// 专辑id变为当前歌曲所属的专辑id
					albumId = id;
					// 已选播放状态禁止点击
					if ($(this).hasClass(cur)) {
						$(".myhk_pjax_loading_frame,.myhk_pjax_loading").hide();
						wenkmTips.show('正在播放 - ' + aplist[songId].author + ' - ' + aplist[songId].title);
					} else {
						// 得到歌曲ID
						songId = $(this).index();
						// 获取指定歌曲信息并尝试播放
						wenkmMedia.getInfos(songId);
					}
				});
			}
		}
	};

	var wenkmList = [
		{
			song_album: "dolyw",
			song_album1: "我的音乐列表",
			song_file: "/",
			song_name: "The Nights".split("|"),
			song_id: "35090549wy".split("|")
		}
	];
	wenkmPlayer.playList.creat.album();
};
function LimitStr(str, num, t) {
	num = num || 6;
	// 限制字符数默认为9个，注意，两个英文字符，算一个！
	t = t || '...';
	// 默认在末尾加上省略号
	var re = '';
	var leg = str.length;
	var h = 0;
	for (var i = 0; h < num * 2 && i < leg; i++) {
		h += str.charCodeAt(i) > 128 ? 2 : 1;
		re += str.charAt(i);
	}
	if (i < leg) re += t;
	return re;
}

var contErArray = [
	'17, 16, 45',
	'5,40,70',
	'103, 82, 116',
	'8, 164, 151',
	'78, 92, 149',
	'74, 72, 75',
	/* '206, 192, 203', */
	'57, 62, 40',
	'114, 121, 168',
	'81, 102, 114',
	'106, 65, 56',
	'50, 59, 85',
	'23, 46, 82',
	/* '39, 168, 226', */
	'1,59,123'
];
var colorIndex = 0;
// 刷新随机数
function randomColorIndex() {
	// 随机数不会和上一次重复，如果获取和上一次相同就重新获取，直到不同为止
	var index = Math.floor(contErArray.length * Math.random());
	while (colorIndex == index) {
		index = Math.floor(contErArray.length * Math.random());
	}
	colorIndex = index
}

function netmusic() {
	if (startIndex) {
		// console.log(aplist[songId]);
		startIndex = false;
	}
	audio.src = aplist[songId].url;
	lrcurl = aplist[songId].lrc;
	// 歌曲名称
	$songName.html('<span title="' + aplist[songId].author + ' - ' + aplist[songId].title + '">' + LimitStr(aplist[songId].title + '</span>'));
	// 歌手及专辑
	$songFrom.html('<span title="' + aplist[songId].author + '">' + LimitStr(aplist[songId].author) + '</span>');
	$songFrom1.html('<span title="' + aplist[songId].author + '">' + LimitStr(aplist[songId].author) + '</span>');
	allmusic();
	// 封面图案
	var coverImg = new Image();
	// 跨域
	// coverImg.crossOrigin = 'Anonymous';
	coverImg.src = aplist[songId].pic;
	$cover.addClass('changing');
	coverImg.onload = function () {
		setTimeout(function () {
			$(".myhk_pjax_loading_frame,.myhk_pjax_loading").hide();
		}, 800);
		setTimeout(function () {
			$cover.removeClass('changing');
		}, 100);

		// 刷新随机数
		randomColorIndex();
		// var contEr = contErArray[0];
		var contEr = contErArray[colorIndex];

		/* var colorThief = new ColorThief();
		// 获取主颜色
		var colorArray = colorThief.getColor(document.querySelector('#headImage'));
		var contEr = colorArray.join(','); */

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
		$(".myhk_pjax_loading_frame,.myhk_pjax_loading").hide();

		/* var coverImgTemp = new Image();
		// 跨域
		coverImgTemp.crossOrigin = 'Anonymous';
		coverImgTemp.src = coverImg.src;

		coverImgTemp.onload = function () {
			try {
				var cont = '108, 105, 113';
				var colorThief = new ColorThief();
				// 获取主颜色
				var colorArray = colorThief.getColor(document.querySelector('#img'));
				cont = colorArray.join(',');
				// console.log(cont);
				$player.css({
					background: 'rgba(' + cont + ',.8)'
				});
				$player1.css({
					background: 'rgba(' + cont + ',.3)'
				});
				$tips.css({
					background: 'rgba(' + cont + ',.6)'
				});
				$lk.css({
					background: 'rgba(' + cont + ',.3)'
				});
			} catch (e) {
				console.log(e);
				// var contEr = '108, 105, 113';
				var contEr = Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256);
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
				$(".myhk_pjax_loading_frame,.myhk_pjax_loading").hide();
			}
		}

		coverImgTemp.error = function () {
			// var contEr = '108, 105, 113';
			var contEr = Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256);
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
			$(".myhk_pjax_loading_frame,.myhk_pjax_loading").hide();
		} */

	};
	coverImg.error = function () {
		setTimeout(function () {
			$(".myhk_pjax_loading_frame,.myhk_pjax_loading").hide();
		}, 800);
		coverImg.src = "https://cdn.jsdelivr.net/gh/wliduo/CDN@master/avatar/01_thn.png";
		setTimeout(function () {
			wenkmTips.show(aplist[songId].author + ' - ' + aplist[songId].title + ' - 图片获取失败');
		}, 4000);
	};
	coverImg.id = "headImage";
	$cover.html(coverImg);
	// 设置音量
	audio.volume = volume;
	// 开始播放
	wenkmTips.show('开始播放 - ' + aplist[songId].author + ' - ' + aplist[songId].title);
	playPromise = audio.play();
	if (playPromise) {
		playPromise.then(() => {
			// 音频加载成功，音频的播放需要耗时
			// var t = audio.duration;
			// console.log('当前播放 - ' + aplist[songId].author + ' - ' + aplist[songId].title + ' - ' + Math.floor(t / 60) + ":" + (t % 60 / 100).toFixed(2).slice(-2));
		}).catch((e) => {
			// 音频加载出现问题
			wenkmTips.show('浏览器限制音乐自动播放(需要点击播放) - ' + aplist[songId].author + ' - ' + aplist[songId].title);
			console.log('浏览器限制音乐自动播放(需要点击播放)');
		});
	}
	//获取LRC
	$cover.addClass('coverplay')
	wenkmLrc.load();
}
function allmusic() {
	musictooltip()
	// 如果歌曲列表内容不为空（因为初始化时歌曲列表为空的会报错）且歌曲列表为播放的专辑时
	if (!$('.list', $albumList).html() == '' && $('[data-album=' + albumId + ']').length) {
		// 当前专辑的歌曲列表高亮当前项
		$('[data-album=' + albumId + ']').find('li').eq(songId).addClass(cur).find('.artist').html('当前播放&nbsp;>&nbsp;').parent().siblings().removeClass(cur).find('.artist').html('').parent();
		// 重置滚动条让高亮项居中
		$('.list', $albumList).mCustomScrollbar('scrollTo', ($('li.current', $albumList).position().top) - 120);
	};
}
function playercolor() {
	if (typeof cont != 'undefined') {
		console.log('err:' + cont)
	} else {
		console.log('err:' + cont)
		var cont = '108, 105, 113';
	}
	$player.css({
		background: 'rgba(' + cont + ',.8)'
	});
	$player1.css({
		background: 'rgba(' + cont + ',.3)'
	});
	$tips.css({
		background: 'rgba(' + cont + ',.6)'
	});
	$lk.css({
		background: 'rgba(' + cont + ',.3)'
	});
}

function musictooltip() {
	$("#wenkmPlayer span,#wenkmPlayer i").each(function () {
		$("#tooltip").remove();
		if (this.title) {
			var a = this.title;
			$(this).mouseover(function (b) {
				this.title = "";
				$("body").append('<div id="tooltip">' + a + "</div>");
				$("#tooltip").css({
					left: b.pageX - 15 + "px",
					top: b.pageY + 30 + "px",
					opacity: "0.8"
				}).fadeIn(250)
			}).mouseout(function () {
				this.title = a;
				$("#tooltip").remove()
			}).mousemove(function (b) {
				$("#tooltip").css({
					left: b.pageX - 15 + "px",
					top: b.pageY + 30 + "px"
				})
			})
		}
	})
}

$(document).ready(function () {
	$(window).keydown(function (event) {
		var key = event.keyCode;
		if (key == 192) {
			auto = '';
			if (audio.paused) {
				$('.play', $player).click();
			} else {
				$('.pause', $player).click();
			}
		}
	});
});

$(window).scroll(function () {
	var scrollTop = $(this).scrollTop();
	var scrollHeight = $(document).height();
	var windowHeight = $(this).height();
	if (scrollTop + windowHeight == scrollHeight) {
		if (hasgeci) {
			if (ycgeci) {
				$player.addClass('ksclrc');
				$('#wenkmLrc').addClass('hide');
				$('#wenkmKsc').addClass('hidePlayer');
				$songFrom3.html('<i class="fa fa-outdent"></i> 歌词暂时隐藏');
				$songFrom4.html('<i class="fa fa-toggle-off" title="歌词暂时隐藏"></i>');

				if (hasLrc) {
					wenkmTips.show("Lrc歌词自动隐藏");
				};
				if (hasKsc) {
					wenkmTips.show("Ksc歌词自动隐藏");
				};
			}
		}
	} else {
		if (hasgeci) {
			if (ycgeci) {
				$player.removeClass('ksclrc');
				$('#wenkmLrc').removeClass('hide');
				$('#wenkmKsc').removeClass('hidePlayer');
				if (hasLrc) {
					$songFrom3.html('<i class="fa fa-indent"></i> 歌词开启');
				};
				if (hasKsc) {
					$songFrom3.html('<i class="fa fa-indent"></i> Ksc歌词开启');
				};
				$songFrom4.html('<i class="fa fa-toggle-on" title="关闭歌词"></i>');
			}
		}
	} musictooltip()
});