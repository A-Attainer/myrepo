console.log("hellow");

var name="jhon";
const id= 11111;       //nonmodifiable
let isMarried= "true"; //modifiable


let person ={
    name: "ali",
    sal: 2222,
    gender: "male",
    toString: function(){
        return this.name+" "+this.gender
    }

}

let noarry= [1,23,"emmmm",true,person];
console.log(noarry[1],noarry[3],noarry[2])
console.log(`my name is ${noarry[1]} emmmmm no ${noarry[2]}`)
