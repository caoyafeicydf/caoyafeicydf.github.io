/**
 * Created by HUCC on 2016/8/22.
 */
//当动画执行完成的时候，我要执行这个回调函数
function animate(obj, json, fn) {

    if (obj.timer) {
        clearInterval(obj.timer);
    }
    obj.timer = setInterval(function () {

        //假设所有的动画都执行完了
        var flag = true;

        for(var k in json) {
            var leader = getStyle(obj, k);
            leader = parseInt(leader) || 0;
            var step = (json[k] - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);

            leader = leader + step;
            obj.style[k] = leader + "px";

            if (leader != json[k]) {
                //还没有到达终点
                flag = false;
            }
        }
        //如果这个时候，flag还是true，说明真的是都执行完动画
        if(flag) {
            clearInterval(obj.timer);

            if(fn){
                fn();
            }

        }

    }, 15);
}


//获取任意对象的任意样式
function getStyle(obj, attr) {
    //能力检测

    //如果支持getComputedStyle，就可以直接
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}
