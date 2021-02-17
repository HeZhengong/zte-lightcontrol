package cn.stylefeng.guns.rabbitMQ;

import com.rabbitmq.client.*;
import com.rabbitmq.client.QueueingConsumer.Delivery;

import java.util.HashMap;
import java.util.Map;


public class Consumer {

    public static void main(String[] args) {
        Map<String,Object> map =new HashMap<>();
        map.put("deviceType","ycc600");
        //map.put("deviceID","123456");
        map.put("cmd","2C0");
        receive("advsun.electric.upload",map);
    }

    public static void receive(String queueName,Map<String,Object> map) {
        try {
            //创建连接工厂对象
            ConnectionFactory factory = new ConnectionFactory();
            //设置工厂对象的参数，用来连接rabbitmq
            factory.setHost("223.84.147.3");
            factory.setPort(5678);
            factory.setVirtualHost("/");
            factory.setUsername("rabbitmq");
            factory.setPassword("ycc2020");
            //建立程序与rabbitmq的socket连接
            Connection connection = factory.newConnection();
            //创建管道
            Channel channel = connection.createChannel();

            System.out.println("Waiting for messages");
            //创建队列消费对象
            QueueingConsumer consumer = new QueueingConsumer(channel);
            //设置参数
            channel.basicConsume(queueName, false,map, consumer);
            //创建接收对象来接收来自服务端的消息
            Delivery delivery ;
            //循环接收，相当于开启了一个监听
            while (true) {
                delivery = consumer.nextDelivery();
                String message = new String(delivery.getBody());
                System.out.println(" Received " + message);
                }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
