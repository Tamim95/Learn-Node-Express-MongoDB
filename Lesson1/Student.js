//create func with export
// exports.getValue=()=>{
//     return "value:101";
// }
const getName=()=>{
    return "Anisul Islam";
}

const getAge=()=>{
    return "Age:25";
}
const cgpa=3.92;

//exporting one by one 
// exports.getName=getName;
// exports.getAge=getAge;
// exports.result=cgpa;

// Exporting all modules
module.exports={
    getName,
    getAge,
    cgpa
}