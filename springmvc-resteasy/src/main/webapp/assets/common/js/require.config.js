require.config({//第一块，配置
    // baseUrl: '/ui/js/',
    paths: {
        store                       : 'plugins/store',
        md5 						: 'plugins/md5',
        avalon 						: "/assets/common/js/avalon/avalon.shim",
        mmRouter 					: "/assets/common/js/avalon/mmRouter",
        mmHistory 					: "/assets/common/js/avalon/mmHistory",
        text 						: '/assets/common/js/require/text',
        domReady					: '/assets/common/js/require/domReady',
        css                         : '/assets/common/js/require/css',
        when                        : '/assets/common/js/when.min',
        kindeditor                  : '/assets/common/js/plugin/kindeditor/kindeditor-min',
        kindeditorLangZhCN          : '/assets/common/js/plugin/kindeditor/lang/zh_CN',
        lodopApi 			        : '/assets/common/js/lodopApi',

        config                      : "/assets/common/js/config",
        utils                       : "/assets/common/js/app/utils",

        // helper
        app                         : "helpers/app",
        common                      : "helpers/common",

        // libraries
        base                        : "libraries/base",
        baseConstant                : 'libraries/baseConstant',
        request                     : "libraries/request",
        fileStorage                 : "libraries/fileStorage",
        storage                     : "libraries/storage",
        cart                        : "libraries/cart",
        update                      : 'libraries/update',
        paymentChannels             : "libraries/paymentChannels",
        barcode			            : "libraries/barcode",
    },
    waitSeconds: 60,
    urlArgs: 'v=' + Math.random(),
    shim: {
        // kindeditor: {
        //     exports: "kindeditor"
        // },
        // kindeditorLangZhCN: {
        //     exports: "kindeditorLangZhCN",
        //     deps: ['kindeditor']
        // }
    }
});