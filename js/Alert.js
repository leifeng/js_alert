/**
 * Created by chuanlong on 2014/6/9.
 */
//var addEvent = function (obj, eType, fn) {
//
//}


function Alert(obj) {
    this.obj = obj;
    this.options = {
        title: 'title',
        context: '',
        style: {
            width: '200'
        },
        actions: {
            drag: true,//是否可以拖拽
            moveIn: true,//是否有动画
            html: false//是否html模式
        }
    }

}
Alert.prototype.init = function (opt) {
    this.extend(this.options, opt || {});
    this.addElement();

}
Alert.prototype.addElement = function () {
    var title, x, context;
    if (this.options.actions.html) {
        title = this.obj.getElementsByTagName('H3')[0];
        x = title.getElementsByTagName('A')[0];
        context = this.obj.getElementsByTagName('DIV')[0];
    } else {
        title = document.createElement('h3');
        x = document.createElement('a');
        context = document.createElement('div');
        x.innerText = 'X';
        title.innerText = this.options.title;
        context.innerHTML = this.options.context;
    }
    this.addClass(x, title, context);

}
Alert.prototype.addClass = function (x, title, context) {

    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var obj = this.obj;

    obj.style.position = 'absolute';
    obj.style.display = 'block';
    if (this.options.actions.moveIn) {

        obj.style.top = '0px';
        obj.style.opacity = '0';
        this.addMoveIn();

    } else {
        obj.style.top = clientHeight / 2 - 100 + 'px';
        obj.style.opacity = '1';
    }
    if (this.obj.innerText && !this.options.actions.html) {
        return;
    }

//obj.style.cssText='word-break: break-word;left: '+clientWidth / 2 - this.options.style.width / 2 + 'px;border: 1px solid #E3E3E3;border-radius: 6px;width: '+this.options.style.width + 'px;box-shadow: #5A5A5A 1px 2px 20px;';
    obj.style.wordBreak = 'break-word';
    obj.style.left = clientWidth / 2 - this.options.style.width / 2 + 'px';
    obj.style.border = '1px solid #e3e3e3';
    obj.style.borderRadius = '6px';
    obj.style.width = this.options.style.width + 'px';
    obj.style.boxShadow = '1px 2px 20px #5a5a5a';

    title.style.lineHeight = '30px';
    title.style.margin = '0';
    title.style.borderBottom = '2px solid #949494';
    title.style.textIndent = '1em';
    title.style.position = 'relative';

    x.style.position = 'absolute';
    x.style.right = '8px';
    x.style.textIndent = '0';
    x.style.cursor = 'pointer';
    x.style.color = 'black';
    x.style.fontSize = '2em';

    context.style.cssText = 'background-color:#e3e3e3;padding:1em;';


    if (this.options.actions.drag) {
        title.style.cursor = 'move';
        this.objDrag(title);
    }
    this.objClose(x);
    this.make(x, title, context);
}
Alert.prototype.objClose = function (x) {
    var obj = this.obj;
    this.addEvent(x, 'click', function () {
        obj.style.display = 'none';
    });
    this.addEvent(x, 'mouseover', function () {
        x.style.color = 'red';
    });
    this.addEvent(x, 'mouseout', function () {
        x.style.color = 'black';
    });

}
Alert.prototype.objDrag = function (title) {
    var x, y, pagex, pagey;
    var obj = this.obj;
    this.addEvent(title, 'mousedown', function (e) {
        e = event || window.event;
        var target = e.target || e.srcElement;
        x = e.offsetX;
        y = e.offsetY;
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        e.cancelBubble = true;
        if (target.nodeName !== 'A') {
            document.onmousemove = function (e) {
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                pagex = e.pageX || e.clientX + document.body.scrollLeft - document.body.clientLeft;
                pagey = e.pageY || e.clientY + document.body.scrollTop - document.body.clientTop;
                obj.style.top = pagey - y + 'px';
                obj.style.left = pagex - x + 'px';
            }
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }


    });

}
Alert.prototype.make = function (x, title, context) {
    title.appendChild(x);
    this.obj.appendChild(title);
    this.obj.appendChild(context);

}

Alert.prototype.addMoveIn = function () {
    var t = -1;
    var obj = this.obj;

    t = setInterval(function () {
        if (obj.style.opacity < 1) {
            var _opacity = obj.style.opacity - 0 + 0.2;
            var _top = obj.style.top.replace('px', '') - 0;
            if (_top < 150) {
                _top += 30;
            }
            obj.style.opacity = _opacity;
            obj.style.top = _top + 'px';
        } else {
            clearInterval(t);
        }
    }, 30)

}
Alert.prototype.addEvent=function(obj,eType,fn){
    if (obj.addEventListener) {
        obj.addEventListener(eType, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + eType, fn);
    } else {
        obj['on' + eType] = fn;
    }
}
Alert.prototype.close = function () {
    this.obj.style.display = 'none';
}
Alert.prototype.extend = function (a, b) {
    for (var attr in b) {
        a[attr] = b[attr];
    }
}
