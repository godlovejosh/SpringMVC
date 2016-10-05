/**
 * Created by wuxing on 16/9/23.
 */
$(function () {
    index.confPull("app01", "DEFAULT_GROUP");
    index.init();

    $('#changeApp').change(function () {
        var appName = $('#changeApp').val().trim();
        $('#config').val("");
        index.confPull(appName);
    });

    $('#publishBtn').click(function () {
        var appName = $('#changeApp').val().trim(),
            config = $('#config').val().trim();
        index.publish(appName, "DEFAULT_GROUP", config);
    });
});

var lock = false;

var index = {

    init: function () {
        index.app01ConfPull();
        index.app02ConfPull();
        index.app03ConfPull();
        index.app04ConfPull();
    },

    // 发布
    publish: function (dataId, group, content) {
        if (lock) {
            return;
        }
        lock = true;
        if ("app01" == dataId) {
            $('.lines div').addClass("boxNo1");
        } else if ("app02" == dataId) {
            $('.lines div').addClass("boxNo2");
        } else if ("app03" == dataId) {
            $('.lines div').addClass("boxNo3");
        } else if ("app04" == dataId) {
            $('.lines div').addClass("boxNo4");
        }

        setTimeout(function () {
            $('.lines div').removeClass("boxNo1 boxNo2 boxNo3 boxNo4");
            $.ajax({
                type: "post",
                url: "/configure/publish",
                data: {
                    "dataId": dataId,
                    "group": group,
                    "content": content
                },
                async: false,
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        alert("发布成功");
                        index.init();
                        lock = false;
                    } else {
                        alert("发布失败");
                        lock = false;
                    }
                },
                error: function () {
                    alert("网络异常");
                    lock = false;
                }
            });
        }, 3000);
    },
    confPull: function (appName) {
        $.ajax({
            type: "post",
            url: "/configure/pull",
            data: {
                "dataId": appName,
                "group": "DEFAULT_GROUP"
            },
            async: false,
            success: function (data) {
                $('#config').val(data);
            },
            error: function () {
                alert("网络异常");
            }
        });
    },
    app01ConfPull: function () {
        $.ajax({
            type: "post",
            url: "/configure/pull",
            data: {
                "dataId": "app01",
                "group": "DEFAULT_GROUP"
            },
            async: false,
            success: function (data) {
                $('.app01Conf').val(data);
            },
            error: function () {
                alert("网络异常");
            }
        });
    },
    app02ConfPull: function () {
        $.ajax({
            type: "post",
            url: "/configure/pull",
            data: {
                "dataId": "app02",
                "group": "DEFAULT_GROUP"
            },
            async: false,
            success: function (data) {
                $('.app02Conf').val(data);
            },
            error: function () {
                alert("网络异常");
            }
        });
    },
    app03ConfPull: function () {
        $.ajax({
            type: "post",
            url: "/configure/pull",
            data: {
                "dataId": "app03",
                "group": "DEFAULT_GROUP"
            },
            async: false,
            success: function (data) {
                $('.app03Conf').val(data);
            },
            error: function () {
                alert("网络异常");
            }
        });
    },
    app04ConfPull: function () {
        $.ajax({
            type: "post",
            url: "/configure/pull",
            data: {
                "dataId": "app04",
                "group": "DEFAULT_GROUP"
            },
            async: false,
            success: function (data) {
                $('.app04Conf').val(data);
            },
            error: function () {
                alert("网络异常");
            }
        });
    }
};
