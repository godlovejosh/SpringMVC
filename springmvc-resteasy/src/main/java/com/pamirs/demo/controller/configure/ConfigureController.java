package com.pamirs.demo.controller.configure;

import com.pamirs.configure.client.Configure;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by wuxing on 16/9/19.
 */
@Controller
@Path("/configure")
public class ConfigureController {

    @GET
    @Path("/index")
    public ModelAndView index() {
        Map<String, Object> model = new HashMap<>();
        return new ModelAndView("/configure/index", model);
    }

    @POST
    @Path("/publish")
    public Boolean publish(@Context HttpServletRequest request,
                           @Context HttpServletResponse response,
                           @FormParam("dataId") String dataId,
                           @FormParam("group") String group,
                           @FormParam("content") String content,
                           @FormParam("serverId") String serverId) {

        return Configure.publishSingle(dataId, group, content);
    }

    @POST
    @Path("/pull")
    public String pull(@Context HttpServletRequest request,
                       @Context HttpServletResponse response,
                       @FormParam("dataId") String dataId,
                       @FormParam("group") String group) {

        String configInfo = "";
        try {
            configInfo = Configure.getConfig(dataId, group, 1000L);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return configInfo;
    }
}
