var playerID; // 播放器id
var playerWidth; // 播放器宽
var playerHeight; // 播放器高
var oWebControl = null; // 插件对象
var bIE = (!!window.ActiveXObject || 'ActiveXObject' in window); // 是否为IE浏览器
var pubKey = '';

var iLastCoverLeft = 0;
var iLastCoverTop = 0;
var iLastCoverRight = 0;
var iLastCoverBottom = 0;
var initCount = 0;

// 显示信息
function showCBInfo(txt, type) {
    if (type === 'error') {
        console.error(txt);
    } else {
        console.log(txt);
    }
}

// RSA加密
function setEncrypt(value) {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(pubKey);
    return encrypt.encrypt(value);
}

// 初始化插件
function initPlugin({ id, width, height, callback }) {
    oWebControl = new WebControl({
        szPluginContainer: id,
        iServicePortStart: 15900,
        iServicePortEnd: 15909,
        cbConnectSuccess: function() {
            setCallbacks();

            oWebControl.JS_StartService('window', {
                dllPath: './VideoPluginConnect.dll'
                    //dllPath: './DllForTest-Win32.dll'
            }).then(function() {
                oWebControl.JS_CreateWnd('playWnd', width, height).then(function() {
                    console.log('JS_CreateWnd success');
                    callback();
                });
            }, function() {

            });
        },
        cbConnectError: function() {
            console.log('cbConnectError');
            oWebControl = null;
            showCBInfo('插件未启动，正在尝试启动，请稍候...');
            WebControl.JS_WakeUp('VideoWebPlugin://');
            initCount++;
            if (initCount < 3) {
                setTimeout(function() {
                    initPlugin({ id, width, height, callback });
                }, 3000)
            } else {
                showCBInfo('插件启动失败，请检查插件是否安装！');
            }
        },
        cbConnectClose: function() {
            console.log('cbConnectClose');
            oWebControl = null;
        }
    });
}

// 设置窗口控制回调
function setCallbacks() {
    oWebControl.JS_SetWindowControlCallback({
        cbIntegrationCallBack: cbIntegrationCallBack
    });
}

// 推送消息
function cbIntegrationCallBack(oData) {
    showCBInfo(JSON.stringify(oData.responseMsg));
}

// 获取公钥
function getPubKey(callback) {
    oWebControl.JS_RequestInterface({
        funcName: 'getRSAPubKey',
        argument: JSON.stringify({
            keyLength: 1024
        })
    }).then(function(oData) {
        if (oData.responseMsg.data) {
            pubKey = oData.responseMsg.data
            callback()
        }
    })
}

/**
 * 反初始化
 */
export function uninit(callback) {
    oWebControl.JS_RequestInterface({
        funcName: 'uninit'
    }).then(function(oData) {
        showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));

        oWebControl.JS_RequestInterface({
            funcName: 'destroyWnd'
        }).then(function(oData) {
            showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
            callback && callback();
        });
    });
}

/**
 * 初始化视频控件
 * 播放窗口容器id, 默认playWnd
 * 端口 port: 443 || 80, 决定是否使用HTTPS协议
 * 播放模式 playMode: 0-预览, 1-录像播放
 * 窗口布局 layout: '1x1'、'2x2'、'3x3'、'4x4'
 * 抓图存储路径 snapDir
 * 紧急录像或录像剪辑存储路径 videoDir
 * 加密字段 encryptedFields: 对多个字段加密存在初始化耗时问题
 */
export function init({
    id = 'playWnd',
    appkey = '25932839',
    secret = 'l8G8gnoRISKKBVZuqlL8',
    ip = '192.168.7.56',
    port = 443,
    playMode = 0,
    layout = '2x2',
    snapDir = 'C:\\hik\\SnapDir',
    videoDir = 'C:\\hik\\VideoDir',
    encryptedFields = ['secret'],
    callback
}) {
    var playerWin = document.getElementById(id);
    if (!playerWin) {
        showCBInfo(id + ' 播放器元素不存在', 'error');
        return;
    }
    playerID = id;
    playerWidth = playerWin.clientWidth;
    playerHeight = document.getElementById(id).clientHeight;
    port += ''; // 端口转换成字符串

    initPlugin({
        id,
        width: playerWidth,
        height: playerHeight,
        callback: function() {
            getPubKey(function() {
                appkey = appkey.replace(/(^\s*)/g, '');
                appkey = appkey.replace(/(\s*$)/g, '');

                secret = secret.replace(/(^\s*)/g, '');
                secret = secret.replace(/(\s*$)/g, '');

                ip = ip.replace(/(^\s*)/g, '');
                ip = ip.replace(/(\s*$)/g, '');

                port = port.replace(/(^\s*)/g, '');
                port = port.replace(/(\s*$)/g, '');

                snapDir = snapDir.replace(/(^\s*)/g, '');
                snapDir = snapDir.replace(/(\s*$)/g, '');

                videoDir = videoDir.replace(/(^\s*)/g, '');
                videoDir = videoDir.replace(/(\s*$)/g, '');

                if (!appkey) {
                    showCBInfo('appkey不能为空！', 'error');
                    return
                }
                if (!secret) {
                    showCBInfo('secret不能为空！', 'error');
                    return
                }
                if (!ip) {
                    showCBInfo('ip不能为空！', 'error');
                    return
                }
                if (!port) {
                    showCBInfo('端口不能为空！', 'error');
                    return
                } else if (!/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/.test(port)) {
                    showCBInfo('端口错误！', 'error');
                    return
                }

                // secret固定加密，其它选加密
                secret = setEncrypt(secret);

                if (encryptedFields.includes('appkey')) {
                    appkey = setEncrypt(appkey)
                }
                if (encryptedFields.includes('ip')) {
                    ip = setEncrypt(ip)
                }
                if (encryptedFields.includes('layout')) {
                    layout = setEncrypt(layout)
                }
                if (encryptedFields.includes('snapDir')) {
                    snapDir = setEncrypt(snapDir)
                }
                if (encryptedFields.includes('videoDir')) {
                    videoDir = setEncrypt(videoDir)
                }

                var param = {
                    appkey,
                    secret,
                    ip,
                    playMode,
                    port: +port,
                    snapDir,
                    videoDir,
                    layout,
                    enableHTTPS: port == 443 ? 1 : 0,
                    encryptedFields: encryptedFields.join(',')
                };

                console.log(param);

                oWebControl.JS_RequestInterface({
                    funcName: 'init',
                    argument: JSON.stringify(param)
                }).then(function(oData) {
                    showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));

                    bindEvents();

                    callback && callback();
                });
            })
        }
    });
}
// 绑定事件
function bindEvents() {
    // 页面关闭
    window.onunload = function() {
        // 此处请勿调反初始化
        if (oWebControl != null) {
            oWebControl.JS_Disconnect().then(function() {}, function() {});
        }
    }

    // 窗口resize
    window.onresize = function() {
        if (oWebControl != null) {
            var playerWin = document.getElementById(playerID);

            playerWidth = playerWin.clientWidth;
            playerHeight = playerWin.clientHeight;

            oWebControl.JS_Resize(playerWidth, playerHeight);
            setWndCover();
        }
    };

    // 滚动条scroll
    window.onscroll = function() {
        if (oWebControl != null) {
            var playerWin = document.getElementById(playerID);

            playerWidth = playerWin.clientWidth;
            playerHeight = playerWin.clientHeight;

            oWebControl.JS_Resize(playerWidth, playerHeight);
            setWndCover();
        }
    }
}

// 设置窗口遮挡
function setWndCover() {
    var iWidth = window.offsetWidth;
    var iHeight = window.offsetHeight;
    var oDivRect = document.getElementById(playerID).getBoundingClientRect();

    var iCoverLeft = (oDivRect.left < 0) ? Math.abs(oDivRect.left) : 0;
    var iCoverTop = (oDivRect.top < 0) ? Math.abs(oDivRect.top) : 0;
    var iCoverRight = (oDivRect.right - iWidth > 0) ? Math.round(oDivRect.right - iWidth) : 0;
    var iCoverBottom = (oDivRect.bottom - iHeight > 0) ? Math.round(oDivRect.bottom - iHeight) : 0;

    iCoverLeft = (iCoverLeft > 700) ? 700 : iCoverLeft;
    iCoverTop = (iCoverTop > 400) ? 400 : iCoverTop;
    iCoverRight = (iCoverRight > 700) ? 700 : iCoverRight;
    iCoverBottom = (iCoverBottom > 400) ? 400 : iCoverBottom;

    if (iLastCoverLeft != iCoverLeft) {
        console.log('iCoverLeft: ' + iCoverLeft);
        iLastCoverLeft = iCoverLeft;
        oWebControl.JS_SetWndCover('left', iCoverLeft);
    }
    if (iLastCoverTop != iCoverTop) {
        console.log('iCoverTop: ' + iCoverTop);
        iLastCoverTop = iCoverTop;
        oWebControl.JS_SetWndCover('top', iCoverTop);
    }
    if (iLastCoverRight != iCoverRight) {
        console.log('iCoverRight: ' + iCoverRight);
        iLastCoverRight = iCoverRight;
        oWebControl.JS_SetWndCover('right', iCoverRight);
    }
    if (iLastCoverBottom != iCoverBottom) {
        console.log('iCoverBottom: ' + iCoverBottom);
        iLastCoverBottom = iCoverBottom;
        oWebControl.JS_SetWndCover('bottom', iCoverBottom);
    }
}

/**
 * 开始预览
 * @param {*} param0 
 * 监控点编号 cameraIndexCode
 * 主子码流 streamMode: 0-主码流, 1-子码流
 * 传输协议 transMode: 0-UDP, 1-TCP
 * 是否启用GPU硬解 gpuMode: 0-不启用, 1-启用
 * 播放窗口 wndId: -1-空闲窗口, 0-选中窗口
 * 
 */
export function preview({
    cameraIndexCode = '3edb505c8dc74a0d94954b0df2344a18',
    streamMode = 0,
    transMode = 1,
    gpuMode = 0,
    wndId = -1
}) {
    cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, '').replace(/(\s*$)/g, '');

    if (!cameraIndexCode) {
        showCBInfo('监控点编号不能为空！', 'error');
        return;
    }

    oWebControl.JS_RequestInterface({
        funcName: 'startPreview',
        argument: JSON.stringify({
            cameraIndexCode: cameraIndexCode,
            streamMode: streamMode,
            transMode: transMode,
            gpuMode: gpuMode,
            wndId: wndId
        })
    }).then(function(oData) {
        showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
    });
}

/**
 * 停止所有视频预览
 */
export function stopAllPreview() {
    oWebControl.JS_RequestInterface({
        funcName: 'stopAllPreview'
    }).then(function(oData) {
        showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
    });
}

/**
 * 录像回放
 * 监控点编号 cameraIndexCode
 * 录像查询开始时间戳 startTimeStamp: 
 * 录像查询结束时间戳 endTimeStamp
 * 录像存储类型 recordLocation: 0-中心存储 1-设备存储
 * 传输协议 transMode: 0-UDP, 1-TCP
 * 是否启用GPU硬解 gpuMode: 0-不启用, 1-启用
 * 播放窗口 wndId: -1-空闲窗口, 0-选中窗口
 */
export function playback({
    cameraIndexCode = '3edb505c8dc74a0d94954b0df2344a18',
    startTimeStamp = new Date('2020/2/25 00:00:00').getTime(),
    endTimeStamp = new Date('2020/2/26 00:00:00').getTime(),
    recordLocation = 1,
    transMode = 1,
    gpuMode = 0,
    wndId = -1
}) {
    if (!cameraIndexCode) {
        showCBInfo("监控点编号不能为空！", 'error');
        return;
    }

    if (Number.isNaN(+startTimeStamp) || Number.isNaN(+endTimeStamp)) {
        showCBInfo("时间格式有误！", 'error');
        return;
    }

    cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "");

    var param = {
        cameraIndexCode: cameraIndexCode,
        startTimeStamp: Math.floor(startTimeStamp / 1000),
        endTimeStamp: Math.floor(endTimeStamp / 1000),
        recordLocation: recordLocation,
        transMode: transMode,
        gpuMode: gpuMode,
        wndId: wndId
    };

    console.log(JSON.stringify(param));

    oWebControl.JS_RequestInterface({
        funcName: 'startPlayback',
        argument: JSON.stringify(param)
    }).then(function(oData) {
        showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
    });
}
/**
 * 停止所有录像回放
 */
export function stopAllPlayback() {
    oWebControl.JS_RequestInterface({
        funcName: 'stopAllPlayback'
    }).then(function(oData) {
        showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
    });
}

/**
 * 获取当前布局
 * 回调参数 { layout: '2x2', wndNum: 4 }
 */
export function getLayerOut(callback) {
    oWebControl.JS_RequestInterface({
        funcName: 'getLayout'
    }).then(function(oData) {
        callback && callback(JSON.parse(oData.responseMsg.data.replace('"{', "{").replace('}"', "}")));
    });
}

/**
 * 设置当前布局
 * layout可选值有 '1x1'、'2x2'、'3x3'、'4x4'
 */
export function setLayerOut(layout, callback) {
    oWebControl.JS_RequestInterface({
        funcName: 'setLayout',
        argument: JSON.stringify({
            layout: layout
        })
    }).then(function(oData) {
        callback && callback(oData);
    });
}