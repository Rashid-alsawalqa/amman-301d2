let person = 
  {
    "name":"John",
    "role":"Dad",
    "interests": ["Coaching","Teaching"]
  };

console.log(Object.keys(person));
console.log(Object.values(person));
// console.log(Object.keys(person));

// jkbjb

Object.keys(person).forEach(key => {
  console.log("My "+key+" is "+person[key]);
});

// for loop number of iteration = length of the object
for(let i=0; i<Object.keys(person).length; i++){
  console.log("My "+Object.keys(person)[i]+" is "+Object.values(person)[i]);
}
// every iteration 
// console.log keys[i], values[i]

console.log(Object.entries(person));