$(function () {
    var form = layui.form

    //获取轮播图列表数据
    function loadSwiperList() {
        //发送Ajax请求
        $.ajax({
            type: 'get',
            url: 'admin/swipers',
            success: function (res) {
                //使用模板引擎渲染页面
                var tags = template('table-tpl', res)
                $('.layui-table tbody').html(tags)
            }
        })
    }
    loadSwiperList();

    //轮播图状态切换
    $('.layui-table tbody').on('click', '.layui-badge', function (e) {
        //轮播图当前状态
        let status = $(e.target).data('status')
        //轮播图的id
        let id = $(e.target).data('id')
        //发送ajax请求
        $.ajax({
            type: 'put',
            url: 'admin/swipers/' + id,
            data: {
                status: status
            },
            success: function (res) {
                //判断  当status为0时 修改状态成功
                if (res.status === 0) {
                    layer.msg(res.message)
                    loadSwiperList()
                }
            }
        })
    })

    //删除图片
    $('.layui-table tbody').on('click', '.delete', function (e) {
        //轮播图id
        var id = $(e.target).data('id')
        //询问框
        layer.confirm('确认要删除吗?', function (index) {
            //发送Ajax请求
            $.ajax({
                type: 'delete',
                url: 'admin/swipers/' + id,
                success: function (res) {
                    // 判断
                    if (res.status === 0) {
                        //关闭询问框
                        layer.close(index)
                        loadSwiperList()
                    }
                }
            })
        })
    })

    //上传轮播图按钮点击事件
    $('#uploadSwiper').click(function () {
        $('#myfile').click()
    })

    //监听图片上传
    $('#myfile').change(function (e) {
        let files = e.target.files
        //创建FormData 对象
        var fd = new FormData()
        //遍历files
        $.each(files, function (index, item) {
            //追加
            fd.append('swipers', item)
        })
        //发送ajax请求
        $.ajax({
            type: 'post',
            url: 'admin/swipers',
            data: fd,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.status === 0) {
                    layer.msg(res.message)
                    loadSwiperList();
                }
            }
        })
    })
})