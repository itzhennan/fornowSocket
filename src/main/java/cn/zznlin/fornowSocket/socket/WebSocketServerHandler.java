package cn.zznlin.fornowSocket.socket;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.websocketx.WebSocketFrame;

/**
 * @Author zhennan
 * @Date 2019/1/22 23:54
 * @Description
 */
public class WebSocketServerHandler extends SimpleChannelInboundHandler<Object> {
    private WebSocketService webSocketServiceImpl;

    private HttpService httpServiceImpl;

    public WebSocketServerHandler(WebSocketService webSocketServiceImpl,
                                  HttpService httpServiceImpl) {
        super();
        this.webSocketServiceImpl = webSocketServiceImpl;
        this.httpServiceImpl = httpServiceImpl;
    }

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, Object msg)
            throws Exception {
        // TODO Auto-generated method stub
        if(msg instanceof FullHttpRequest){

            httpServiceImpl.handleHttpRequset(ctx, (FullHttpRequest)msg);
        }else if(msg instanceof WebSocketFrame){

            webSocketServiceImpl.handleFrame(ctx, (WebSocketFrame)msg);
        }
    }

    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
        // TODO Auto-generated method stub
        ctx.flush();
    }

}
