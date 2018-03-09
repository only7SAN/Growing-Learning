var Student = (function () {
    function Student(firstName, middleName, lastName) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.fullName = firstName + middleName + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + person.lastName;
}
var user = { firstName: '猪明明', lastName: '吊丝' };
var student = new Student('猪', '明', '明');
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
document.body.innerHTML = greeter(user);
