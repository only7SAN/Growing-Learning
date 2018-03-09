//new功能
//访问构造函数的属性和构造函数原型的属性

function fakeNew(){
    var obj = new Object();

    var Constructor = Array.prototype.shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    var result = Constructor.apply(obj,arguments);

    return typeof result ==='object'? result : obj ;
}

function Person(age,name,sex){
    this.age = age;
    this.sex = sex;
    this.name = name;
}

Person.prototype.home = 'beijing';

Person.prototype.sayHello = function () {
    console.log('What is your name?');
};

var XiaoMing = fakeNew(Person,18,'XiaoMing','boy');
XiaoMing.sayHello();
