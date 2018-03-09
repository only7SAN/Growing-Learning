//call和apply作用
//1：改变函数this指向，实现为将函数设置为属性
//2：可传入指定参数，apply为传入一个数组
//3:可传入对象null，this指向变为window

//模拟call
Function.prototype.fakeCall = function(obj){
    //当传入null时指向为window
    var obj = obj||window;
    obj.fn = this;

    //收集参数arguments
    var length = arguments.length;
    var args = [];
    for(var i =1;i<length;i++){
        args.push('arguments[' + i + ']');
    }

    //此处args会调用Array.toString()方法,也可以使用ES6的拓展运算符...
    var result = eval('obj.fn(' + args + ')');

    //删除属性fn和获取返回值
    delete obj.fn;
    return result;
};

//模拟apply
Function.prototype.fakeApply = function(obj,arr){
    //原理同call，apply方法传入的是数组
    var obj = Object(obj)||window;
    obj.fn = this;

    var result;

    if(!arr){
        result = obj.fn();
    }else {
        var length = arguments.length;
        var args = [];
        for (var i = 1; i < length; i++) {
            args.push('arguments[' + i + ']');
        }

        result = eval('obj.fn(' + args + ')');
    }

    delete obj.fn;
    return result;
};

var foo = {
    hello:'hello'
};

function test(name,age) {
    console.log(name);
    console.log(age);
    console.log(this.hello);
}
