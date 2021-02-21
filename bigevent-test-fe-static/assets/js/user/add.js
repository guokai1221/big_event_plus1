$(function () {
    // 添加用户
    var form = layui.form

    // 添加规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        same: function (value) {
            var uname = $('.layui-form input[name=password]').val()
            if (value !== uname) {
                return "两次输入的密码不一样"
            }
        }
    })

    // 绑定提交事件
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        var fd = $(this).serialize()
        // console.log(fd);
        $.ajax({
            method: 'POST',
            url: 'admin/users',
            data: fd,
            success: function (res) {
                // console.log(res);
                layer.msg(res.message)
                // 跳转页面
                location.href = '../user/user.html'
            }
        })
    })
})