package cn.zznlin.fornowSocket.socket;

import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.websocketx.WebSocketFrame;

/**
 * @Author zhennan
 * @Date 2019/1/22 23:53
 * @Description
 */
public interface WebSocketService {
    void handleFrame(ChannelHandlerContext ctx, WebSocketFrame frame);
}
