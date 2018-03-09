class Student{
	fullName:string;
	constructor(public firstName,public middleName,public lastName){
		this.fullName = firstName + middleName + lastName;
	}
}

interface Person{
	firstName:string;
	lastName:string;
}

function greeter(person:Person) {
    return "Hello, " + person.firstName + person.lastName;
}

var user = { firstName:'猪明明',lastName:'吊丝'};
var student = new Student('猪','明','明');

enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;

document.body.innerHTML = greeter(user);