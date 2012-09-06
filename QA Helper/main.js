$(function() {

    // 执行数据加载
    loadLocalData();

    /**
     * 加载原有数据
     */
    function loadLocalData() {
        // 定义变量
        var tds, // 表格中的每一行的第一个单元格
        forms, // 所有的表单
        pagerLinks, // 翻页链接
        data; // 数据记录

        // 加载数据
        if (localStorage.data) {
            data = JSON.parse(localStorage.data);
        } else {
            data = {};
        }

        // 恢复每一行的颜色设置
        tds = $('#watcherlist>tbody>tr>td:first-child');
        tds.each(function() {
            var _id = $(this).next().text();
            if (data[_id]) {
                $(this).addClass(data[_id]);
            } else {
                $(this).addClass('w-flag-0');
            }
        });

        // 绑定每一行的点击事件
        tds.click(function() {
            var _r = /w-flag-(\d)/;
            var _match = this.className.match(_r);
            var _class = _match[0];
            var _num = parseInt(_match[1]);
            // 更新样式
            $(this).removeClass(_class);
            _num = (_num === 3) ? 0 : (_num + 1);
            var _newClass = 'w-flag-' + _num;
            $(this).addClass(_newClass);
            // 更新数据
            var _id = $(this).next().text();
            data[_id] = _newClass;
            // 存储数据
            localStorage.data = JSON.stringify(data);
        });

        // 绑定form提交的事件
        forms = $('form');
        forms.submit(function() {
            delayedLoad();
        });

        // 绑定翻页事件
        pagerLinks = $('#content .pagination>a');
        pagerLinks.click(function() {
            delayedLoad();
        });
    }

    /**
     * 延迟加载
     */
    function delayedLoad() {
        setTimeout(loadLocalData, 2000);
    }
});