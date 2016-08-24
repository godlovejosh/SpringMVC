* servlet采用2.5的版本
* spring采用3.2.5的版本
* 配置xml时,注意观察spring3.2.5提供的xsd有哪几个版本,这里我们选择3.2
* spring-servlet.xml 中 如何选择 adapter,AnnotationMethodHandlerAdaptery已经过时
* spring-webmvc包中包含了javax.servlet-api-3.0.1,还包含了spring-beans和spring-context等,如果有冲突还需要排包
* SpringMVC莫名其妙出现No bean named 'cacheManager' is defined错误 (使用Interiij idea创建SpringMVC项目时，莫名其妙出现了No bean named ‘cacheManager’ is defined错误，但是项目里根本没有用到跟cache有关的东西。百度了很久都没有看到类似的，最后到Stack Overflow终于找到答案了，原来是在使用tx命名空间是，idea默认会引入cache)

        头部可以不指定版本号,自动寻找
        <?xml version="1.0" encoding="UTF-8"?>
        <beans xmlns="http://www.springframework.org/schema/beans"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:context="http://www.springframework.org/schema/context"
               xmlns:mvc="http://www.springframework.org/schema/mvc"
               xsi:schemaLocation="http://www.springframework.org/schema/beans
                http://www.springframework.org/schema/beans/spring-beans.xsd
                http://www.springframework.org/schema/context
                http://www.springframework.org/schema/context/spring-context.xsd
                http://www.springframework.org/schema/mvc
                http://www.springframework.org/schema/mvc/spring-mvc.xsd">
    
* <http://blog.csdn.net/tengdazhang770960436/article/details/48395885>