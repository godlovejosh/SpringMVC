package com.web.demo.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by wuxing on 16/8/23.
 */
@Controller
public class GoController {

    private final Log logger = LogFactory.getLog(GoController.class);

    @RequestMapping(value="/",method = RequestMethod.HEAD)
    public String head() {
        return "quickStart.jsp";
    }

    @RequestMapping(value={"/index","/"},method = RequestMethod.GET)
    public String index(Model model) throws Exception {
        logger.info("==========processed by index==========");
        model.addAttribute("msg", "QuickStart");
        return "quickStart.jsp";
    }
}
