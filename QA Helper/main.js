$(function(){
    //定义变量
    var _tds = $('#watcherlist td:first-child');
    var _data;
    
    //绑定事件
    _tds.click(
        function(){
            var _r = /w-flag-(\d)/;
            var _match = this.className.match(_r);
            var _class = _match[0];
            var _num = parseInt(_match[1]);

            //更新样式
            $(this).removeClass(_class);
            _num = (_num === 3)? 0 : (_num + 1);
            var _newClass = 'w-flag-' + _num;
            $(this).addClass(_newClass);

            //更新数据
            var _id = $(this).next().text();
            _data[_id] = _newClass;

            //存储数据
            localStorage.data = JSON.stringify(_data);
        }
    );
    
    //加载原有数据
    if (localStorage.data) {
        _data = JSON.parse(localStorage.data);
    } else {
        _data = {};
    }
    _tds.each(
        function() {
            var _id = $(this).next().text();
            if (_data[_id]) {
                $(this).addClass(_data[_id]);
            } else {
                $(this).addClass('w-flag-0');
            }
        }
    );
});