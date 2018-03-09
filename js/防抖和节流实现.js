window.onLoad = (function(){
    var container1 = document.getElementById('container1');
    var container2 = document.getElementById('container2');
    var count1 = 0,count2 = 0;

    container1.addEventListener('mousemove',debounce(function(){
        count1++;
        container1.innerHTML = '<span id="timesCount">' + count1 + '</span>';
    },2000,true),false)

    container2.addEventListener('mousemove',throttle(function(){
        count2++;
        container2.innerHTML = '<span id="timesCount">' + count2 + '</span>';
    },2000,true),false)
})();

//防抖函数,原理设置发生实践一段时间后才可以触发事件
function debounce(func,wait,immediate) {
    var timeout;
    return function(){
        if(timeout) clearTimeout(timeout);
        if(immediate && !timeout) {
            //修复this和event对象在函数中的获取
            func.apply(this, arguments);
            //执行过不再执行
            timeout = setTimeout(function(){
                timeout = null;
            },wait);
        }else {
            timeout = setTimeout(function () {
                //修复this和event对象在函数中的获取
                func.apply(this, arguments);
            }, wait);
        }
    }
}

//节流函数,html5 api有个requestAnimationFrame
function throttle(func,wait) {
    var timeout,context,args,result;
    var previous = 0;
    var later =function(){
        previous = +new Date();
        timeout = null;
        func.apply(context,args);
    };
    var throttled = function(){
        var now = +new Date();
        //下次出发func的实践
        var remaining = wait - ( now - previous);
        context = this;
        args = arguments;
        //如果没有剩余时间或者你改了系统设定
        if(remaining <= 0 || remaining > wait){
            if(timeout){
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context,args);
        }else if(!timeout){
            timeout = setTimeout(later,remaining);
        }
    };

    return throttled;
}