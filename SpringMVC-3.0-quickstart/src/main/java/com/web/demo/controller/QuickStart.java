package com.web.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by wuxing on 16/8/23.
 */
@Controller
@RequestMapping("/welcome")
public class QuickStart {

    @RequestMapping(value="/hello",method = RequestMethod.GET)
    public ModelAndView handleRequest(
            HttpServletRequest request,
            HttpServletResponse response) {
        System.out.println("--------------hello world! 世界你好！--------------------");
        return new ModelAndView("/helloWorld");
    }
}
