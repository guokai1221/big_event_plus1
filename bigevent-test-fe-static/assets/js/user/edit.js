$(function () {
    var layer = layui.layer
    var form = layui.form

    // 获取用户id
    let id = new URLSearchParams(location.search).get('id')
    // console.log(id);

    // 调用
    loadUserInfo();

    // 封装
    function loadUserInfo() {
        $.ajax({
            method: "GET",
            url: 'admin/users/' + id,
            success: function (res) {
                // console.log(res);
                if (res.status === 0) {
                    form.val('editForm', res.data)
                  } else {
                    layer.msg(res.message)
                  }
            }
        })
    }

    // 绑定提交事件
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        var fd = $(this).serialize();
        // console.log(fd);
        $.ajax({
            method: 'PUT',
            url: 'admin/users',
            data: fd,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('编辑用户失败!')
                }
                layer.msg('编辑用户成功!')
                // 跳转页面
                location.href = '../user/user.html'
            }
        })
    })

})