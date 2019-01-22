package cn.zznlin.fornowSocket.socket;

import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;

/**
 * @Author zhennan
 * @Date 2019/1/22 23:54
 * @Description
 */
public interface HttpService {
    void handleHttpRequset(ChannelHandlerContext ctx, FullHttpRequest request);
}
