$(function () {
    var form = layui.form

    //获取轮播图列表数据
    function loadSwiperList() {
        $.ajax({
            type: 'get',
            url: 'admin/swipers',
            success: function (res) {
                var tags = template('table-tpl', res)
                $('.layui-table tbody').html(tags)
            }
        })
    }
    loadSwiperList();

    //轮播图状态切换
    $('.layui-table tbody').on('click', '.layui-badge', function (e) {
        let status = $(e.target).data('status')
        let id = $(e.target).data('id')
        $.ajax({
            type: 'put',
            url: 'admin/swipers/' + id,
            data: {
                status: status
            },
            success: function (res) {
                if (res.status === 0) {
                    layer.msg(res.message)
                    loadSwiperList()
                }
            }
        })
    })

    //删除图片
    $('.layui-table tbody').on('click', '.delete', function (e) {
        console.log(1);
        var id = $(e.target).data('id')
        layer.confirm('确认要删除吗?', function (index) {
            $.ajax({
                type: 'delete',
                url: 'admin/swipers/' + id,
                success: function (res) {
                    if (res.status === 0) {
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
        var fd = new FormData()
        $.each(files, function (index, item) {
            fd.append('swipers', item)
        })
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