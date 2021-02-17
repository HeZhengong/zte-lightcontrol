package cn.stylefeng.guns.rabbitMQ;

import com.alibaba.fastjson.JSON;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeoutException;

public class Sender {

    public static void main(String[] args) {
        Map<String,Object> map =new HashMap<>();
        map.put("deviceType","ycc600");
        map.put("deviceID","123");
        map.put("cmd","080");
        map.put("loop1","0");
        map.put("loop2","0");
        map.put("loop3","1");
        map.put("loop4","1");
        String message= JSON.toJSONString(map);
        send("ElectricExchange","electric_command",message);
    }

    public static void send(String exchange,String routingKey ,String message){
        ConnectionFactory factory = new ConnectionFactory();
        Connection connection=null;
        Channel channel=null;
        try {
            factory.setHost("223.84.147.3");
            factory.setPort(5678);
            factory.setVirtualHost("/");
            factory.setUsername("rabbitmq");
            factory.setPassword("ycc2020");
            connection = factory.newConnection();
            channel = connection.createChannel();
            //channel.queueDeclare("advsun.electric.command", false, false, false, null);
            channel.basicPublish(exchange,routingKey,null,message.getBytes("UTF-8"));
            System.out.println("已经发送消息....."+message);
        } catch (IOException | TimeoutException e) {
            e.printStackTrace();
        } finally{
            try {
                if(channel!=null)
                channel.close();
                if(connection!=null)
                connection.close();
            } catch (IOException | TimeoutException e) {
                e.printStackTrace();
            }
        }
    }
}
