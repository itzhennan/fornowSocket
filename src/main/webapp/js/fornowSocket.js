/*****************************************************************************
 *
 *                      FORNOW PROPRIETARY INFORMATION
 *
 *          The information contained herein is proprietary to ForNow
 *           and shall not be reproduced or disclosed in whole or in part
 *                    or used for any design or manufacture
 *              without direct written authorization from ForNow.
 *
 *            Copyright (c) 2019 by ForNow.  All rights reserved.
 *
 *****************************************************************************/
/**
 * 服诺WebSocket工具类
 *
 * @author zhennan
 * @date 2019-1-24 下午22:04:19
 */
function FastSocket(args) {
    // check args
    if (!args) {
        console.log("参数异常！")
        return null;
    }

    // Default settings
    var settings = {

        /** Whether this instance should log debug messages. */
        debug: false,

        /** Whether or not the websocket should attempt to connect immediately upon instantiation. */
        automaticOpen: false,

        /** The number of milliseconds to delay before attempting to reconnect. */
        reconnectInterval: 3000,
        /** The maximum number of milliseconds to delay a reconnection attempt. */
        maxReconnectInterval: 30000,
        /** The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. */
        reconnectDecay: 1.5,

        /** The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. */
        timeoutInterval: 2000,

        /** The maximum number of reconnection attempts to make. Unlimited if null. */
        maxReconnectAttempts: 5,

        /** The binary type, possible values 'blob' or 'arraybuffer', default 'blob'. */
        binaryType: 'blob',

        /** 授权令牌 */
        authorization: "" ,

        /** 连接地址 */
        url: "",

        onopen : function(event){},
        onclose : function(event){},
        onconnecting : function(event){},
        onerror : function(event){},
    }


    // Overwrite and define settings with options if they exist.
    for (var key in settings) {
        if (typeof args[key] !== 'undefined') {
            this[key] = args[key];
        } else {
            this[key] = settings[key];
        }
    }

    var fs = this;

    var ws;

    this.init = function(){
        if(!this.url){
            console.log('参数 url 必须存在');
            return;
        }

        if(!this.authorization){
            console.log('参数 authorization 必须存在');
            return;
        }
        //一些对浏览器的兼容已经在插件里面完成
        this.ws = new ReconnectingWebSocket(this.url,this.authorization,{automaticOpen:this.automaticOpen});

        this.ws.debug = this.debug;
        this.ws.reconnectInterval = this.reconnectInterval;
        this.ws.maxReconnectAttempts = this.maxReconnectAttempts;

        //连接发生错误的回调方法
        this.ws.onerror = function (event) {
            console.log("------------WS连接错误--------------");
            console.log(event);
            fs.onerror(event);
        };

        //连接成功建立的回调方法
        this.ws.onopen = function (event) {
            console.log("------------WS连接已建立------------");
            fs.onopen(event);
        }

        //重新连接建立的回调方法
        this.ws.onconnecting = function (event) {
            // console.log("------------WS连接中------------");
            fs.onconnecting(event);
        }

        //连接关闭的回调方法
        this.ws.onclose = function (event) {
            fs.ws.close();
            console.log("------------WS已关闭----------------");
            fs.onclose(event);
        }
    }

    // start
    this.init();

    this.open = function(option){
        if(!option.onmessage || typeof option.onmessage !== "function"){
            console.log('参数 onmessage 必须为函数');
            return;
        }

        //接收到消息的回调方法
        this.ws.onmessage = function (event) {
            console.log("------------WS收到消息--------------");
            option.onmessage(event);
        }
        this.ws.open();
    }

    this.send = function(msg){
        if(!this.ws){return;}
        if(this.ws.readyState == WebSocket.OPEN){
            this.ws.send(msg);
        }else{
            console.log("------------WS Send Fail------------");
        }
    }

}
