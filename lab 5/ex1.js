const cars = ["Toyota", "Honda", "BMW"];
cars.push("Volvo");
cars.unshift("Mercedes");


function disply(array){

    for(let number of array){
        console.log(number);
    }
    console.log("\n")

}
disply(cars);

cars.sort();
disply(cars);