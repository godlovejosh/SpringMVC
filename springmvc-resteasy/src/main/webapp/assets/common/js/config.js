define('config', function(){
    /**
     * 配置新增/更改的时请通知运维人员更改服务器上的配置文件
     */
    var config = {
        url: {
            www         : 'http://www.500mi.com',
            work        : 'http://work.500mi.com',
            work_crm    : 'http://crm.500mi.com',
            pay         : 'http://pay.500mi.com',
            data        : 'http://data.500mi.com',
            lgc         : 'http://lgc.500mi.com',
            crm      	: 'http://crm.500mi.com:8080',
            res         : 'http://res.500mi.com',
            crm_login	: 'http://crm.500mi.com:8080/common/login',
            login		: 'http://passport.500mi.com/login'
        },
        api: {
            basic    : 'http://basic.api.500mi.com:8080/gateway/api',
            fund     : 'http://fund.api.500mi.com:8080/gateway/api',
            lp       : 'http://lp.api.500mi.com:8080/gateway/api',
            tp       : 'http://tp.api.500mi.com:8080/gateway/api'
        },
        // 是否使用test/mock/目录下的模拟数据
        isUseMock   : false,
        isDebug     : true,
        // log等级 debug info error warnning notice prod, 暂未实现
        logLevel    : 'debug'
    };
    return config;
});