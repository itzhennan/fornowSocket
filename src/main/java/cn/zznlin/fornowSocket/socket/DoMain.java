package cn.zznlin.fornowSocket.socket;

/**
 * @Author zhennan
 * @Date 2019/1/22 23:56
 * @Description
 */
public class DoMain {
    public static void main(String[] args) {
        WebSocketServerImpl socket = new WebSocketServerImpl("127.0.0.1", 9999);
        socket.start();
    }
}
