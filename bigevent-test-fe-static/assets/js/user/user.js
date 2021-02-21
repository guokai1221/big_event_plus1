$(function () {
    var layer = layui.layer
    var laypage = layui.laypage

    var form = layui.form
    // 添加规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        same: function (value) {
            var uname = $('#repwd-form input[name=password]').val()
            //  console.log(value);
            //  console.log(uname);
            if (value !== uname) {
                return "两次输入的密码不一样"
            }
        }
    })

    var q = {
        pagenum: 1,// 分页参数：页码
        pagesize: 3,// 分页参数：每页显示的条数
    }

    // 调用渲染页面的方法
    loadUserList();

    // 获取数据渲染页面
    function loadUserList() {
        $.ajax({
            method: 'GET',
            url: 'admin/users',
            data: q,
            success: function (res) {
                // console.log(res);
                //if (res.status !== 0) {
                 //   return layer.msg('获取分类数据失败！')
               // }
                var Str = template('table-tpl', res)
                $('.layui-table tbody').html(Str)
                // 调用渲染分页的方法
                renderPage(res.total)
            }
        })
    }

    // 定义渲染页面的方法
    function renderPage(total) {
        // console.log(total);
        // 初始化分页效果
        laypage.render({
            // 注意，这里的 articlePage 是 ID，不用加 # 号
            elem: 'articlePage',
            // 数据总数，从服务端得到
            count: total,
            // 每页显示的条数
            limit: q.pagesize,
            // 当前页码
            curr: q.pagenum,
            // 每页显示条数列表
            limits: [3, 5, 10, 20, 50],
            // 分页条布局效果
            layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'],
            // 页面切换是触发的动作
            jump: function (obj, first) {
                // obj 表示分页的所有参数；first用于判断首次加载
                // 这里触发时，需要修改当前页码
                //   console.log(first)
                //   console.log(obj.curr)
                q.pagenum = obj.curr
                // 切换每页显示条数时，修改pagesize
                q.pagesize = obj.limit
                // 重新加载接口数据
                if (!first) {
                    // 首次不触发，切换页码时触发
                    loadUserList()
                }
            }
        });
    }


    // 删除---通过代理的方式
    $('.layui-table tbody').on('click', '.layui-btn-danger', function (e) {
        // console.log("ok");
        var len = $('.layui-btn-danger').length
        var id = $(e.target).data("id")//获取id
        layer.confirm('确认要删除用户吗？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'DELETE',
                url: 'admin/users/' + id,
                success: function (res) {
                    layer.msg(res.message)
                    if (len === 1) {
                        // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    // 渲染页面
                    loadUserList()
                }
            })

            layer.close(index);
        });
    })

    // 重置密码弹出层
    $('.layui-table tbody').on('click', '.layui-btn-normal', function (e) {
        // console.log("ok");
        var id = $(e.target).data("id")//获取id
        // console.log(id);
        // 保存弹出层的索引，方便进行关闭
        var index = null;
        index = layer.open({
            type: 1,
            title: '重置密码',
            area: ['500px', '250px'],
            content: $('#repwd-form-tpl').html(),
        })
        // 发起ajax 重置密码
        $('#repwd-form').on("submit", function (e) {
            e.preventDefault();
            $.ajax({
                method: "PUT",
                url: 'admin/users/' + id,
                data: {
                    password: $('#repwd-form input[name=password]').val()
                },
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg("重置密码失败!")
                    }
                    layer.msg("重置密码成功!")
                    layer.close(index);
                }
            })
        })
    })

})

