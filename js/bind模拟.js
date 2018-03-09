//bind函数作用
//bind会返回一个函数，除第一个参数作为它运行时的this，其他参数作为形参传入返回的参数
//bind 返回的函数作为构造函数的话，bind指定的this会失效，传入参数依然生效

//模拟bind
Function.prototype.fakeBind = function (obj) {
    var self = this;
    var args = Array.prototype.slice.call(arguments,1);
    var fNOP = function () {};

    var fbound= function(){
        var args2 = Array.prototype.slice.call(arguments);
        //bind 返回的函数作为构造函数的话(new的话)，bind指定的this会失效，传入参数依然生效
        self.apply(this instanceof self ? this : obj,args.concat(args2));
    };

    //使用中转函数防止修改函数原型
    fNOP.prototype = this.prototype;
    fbound.prototype = fNOP.prototype;
    return fbound;
};

var foo = {
    hello:'hello'
};

function test(name,age) {
    console.log(name);
    console.log(age);
    console.log(this.hello);
}

var bindFoo = test.fakeBind(foo,"Nike");
bindFoo(18);