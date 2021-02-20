$(function () {
    var layer = layui.layer


    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }

    // 渲染页面
    loadUserList(q);

    function loadUserList(q) {
        // console.log(q);
        $.ajax({
            method: 'GET',
            url: '/admin/users',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取失败")
                }
                var tags = template('tpl-table', res)
                $('.layui-table tbody').html(tags)
            }
        })
    }

    
    
})