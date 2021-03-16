class Student{
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string){
        this.fullName = firstName + " " + middleInitial + ' ' + lastName;
    }
}


interface Person {
    firstName: string,
    lastName: string,
}

function greeter(person: Person) {
    return "Hello, "+person.firstName + " " + person.lastName;
}

// let user = {firstName: "Min", lastName: 'ByeongChan'};
let user = new Student("ByeongChan", "B", "Min");

interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;

document.body.textContent = greeter(user);