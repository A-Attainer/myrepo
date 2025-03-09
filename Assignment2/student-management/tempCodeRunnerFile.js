function getStudents() {
    let students = [];
    
    for (let i = 0; i < 5; i++) {
        let name = prompt(`Enter the name of student ${i + 1}:`);
        let gender = prompt(`Enter the gender of student ${i + 1} (Male/Female):`);
        let age = Math.floor(Math.random() * (35 - 17 + 1)) + 17; 
        let grade = Math.floor(Math.random() * 101); 
        
        students.push({ name, gender, age, grade });
    }
    
    return students;
}
const students = getStudents();

const getYoungestStudent = students => students.reduce((youngest, student) => student.age < youngest.age ? student : youngest);
const getOldestStudent = students => students.reduce((oldest, student) => student.age > oldest.age ? student : oldest);
const getAverageAge = students => students.reduce((sum, student) => sum + student.age, 0) / students.length;
const getMedianAge = students => {
    const ages = students.map(student => student.age).sort((a, b) => a - b);
    const mid = Math.floor(ages.length / 2);
    return ages.length % 2 === 0 ? (ages[mid - 1] + ages[mid]) / 2 : ages[mid];
};
const getMeanGrade = students => students.reduce((sum, student) => sum + student.grade, 0) / students.length;
const getVarianceGrade = students => {
    const mean = getMeanGrade(students);
    return students.reduce((sum, student) => sum + Math.pow(student.grade - mean, 2), 0) / students.length;
};

const getStudentsByGender = (students, gender) => students.filter(student => student.gender.toLowerCase() === gender.toLowerCase());
const sortStudentsByName = students => [...students].sort((a, b) => a.name.localeCompare(b.name));
const sortStudentsByGradeDesc = students => [...students].sort((a, b) => b.grade - a.grade);
const hasFailingStudents = students => students.some(student => student.grade < 60);
const getTopStudents = students => {
    const maxGrade = Math.max(...students.map(student => student.grade));
    return students.filter(student => student.grade === maxGrade);
};
const getTopFemaleStudents = students => {
    const femaleStudents = getStudentsByGender(students, 'female');
    return getTopStudents(femaleStudents);
};
const getAverageMaleGrade = students => {
    const maleStudents = getStudentsByGender(students, 'male');
    return maleStudents.length ? maleStudents.reduce((sum, student) => sum + student.grade, 0) / maleStudents.length : 0;
};
const addPassingStatus = students => students.map(student => ({ ...student, passing: student.grade >= 60 }));

console.log("Youngest Student:", getYoungestStudent(students));
console.log("Oldest Student:", getOldestStudent(students));
console.log("Average Age:", getAverageAge(students));
console.log("Median Age:", getMedianAge(students));
console.log("Mean Grade:", getMeanGrade(students));
console.log("Variance of Grades:", getVarianceGrade(students));
console.log("Male Students:", getStudentsByGender(students, 'male'));
console.log("Female Students:", getStudentsByGender(students, 'female'));
console.log("Students Sorted by Name:", sortStudentsByName(students));
console.log("Students Sorted by Grade Desc:", sortStudentsByGradeDesc(students));
console.log("Any Failing Students:", hasFailingStudents(students));
console.log("Top Student(s):", getTopStudents(students));
console.log("Top Female Student(s):", getTopFemaleStudents(students));
console.log("Average Male Grade:", getAverageMaleGrade(students));
console.log("Students with Passing Status:", addPassingStatus(students));


const products = [
    { id: 1, name: 'Apple 14 Pro Max', price: 4500},
    { id: 2, name: 'iPad Pro 12.9-inch', price: 5600},
    { id: 3, name: 'Samsung Galaxy S14', price: 3900},
    { id: 4, name: 'Microsoft Surface Book 3', price: 6700},
    { id: 5, name: 'Sony PlayStation 5', price: 3500},
    { id: 6, name: 'Dell XPS 13', price: 4500},
    { id: 7, name: 'LG 65-inch OLED TV', price: 9800},
    { id: 8, name: 'Bose QuietComfort 35 II', price: 1800} ];

const addProductToCart = (productId, quantity) => {
    const product = products.find(p => p.id === productId);
    if (!product) return "Product not found.";
    
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    return "Product added to cart.";
};

const changeQuantity = (productId, quantity) => {
    const cartItem = cart.find(item => item.id === productId);
    if (!cartItem) return "Item not found in cart.";
    
    cartItem.quantity = quantity;
    return "Quantity updated.";
};

const deleteProductFromCart = (productId) => {
    const initialLength = cart.length;
    cart = cart.filter(item => item.id !== productId);
    return initialLength === cart.length ? "Item not found in cart." : "Item removed from cart.";
};

const displayInvoice = () => {
    if (cart.length === 0) return "Cart is empty.";
    
    let total = 0;
    let minItem = cart.reduce((min, item) => item.price < min.price ? item : min, cart[0]);
    let maxItem = cart.reduce((max, item) => item.price > max.price ? item : max, cart[0]);
    
    console.log("Invoice:");
    cart.forEach(item => {
        total += item.price * item.quantity;
        let indicator = item.id === maxItem.id ? " *" : item.id === minItem.id ? " **" : "";
        console.log(`${item.name} - ${item.quantity} x ${item.price} = ${item.quantity * item.price}${indicator}`);
    });
    console.log(`Total: ${total}`);
};



let cart = [];
let contin = true;
while(contin){
let choise = prompt("What would you like to do?\n      1. Add Product\n      2. Change quantity\n      3. Delete product\n      4. Display invoice\n");

if(choise===1){
    console.log(products);
    let product= prompt("Enter desired product id:")
    let quantity= prompt("Enter desired product quantity:")
    console.log(addProductToCart(Number(product),Number(quantity)))
}else if(choise===2){
    console.log(cart);
    let product= prompt("Enter desired item id to update:")
    let quantity= prompt("Enter desired item quantity to update:")
    console.log(changeQuantity(Number(product),Number(quantity)))
}else if(choise===3){
    console.log(cart);
    let product= prompt("Enter desired item id to delete:")
    
    console.log(deleteProductFromCart(Number(product)))
}else if(choise===4){
    displayInvoice();
}else{
    contin=false;
}


}