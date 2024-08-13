//Değişkenler
// {
//   let value = 0;
//   const name = "Mehmet";
// }

// value = "Mehmet Civril";

/** console.log(value);
console.log(name);

//Foonksiyonlar
function first() {
  console.log(value);
}

const second = () => {};

//Value Tipleri
//String, Number, Boolean
let sampleString = "";
let sampleString2 = "";
let sampleNumber = 28;
let sampleBoolean = true;

let sampleArray = [];
let sampleObject = {}; **/

let sampleObject2 = {
  key: value,
  personel: "mehmet",
  age: 28,
  hobbies: ["running", 22, "coding"],
  adress: {
    city: "istanbul",
    plate: 34,
    street: ["Üsküdar", "Bulgurlu"],
  },
  sayHello: () => {
    console.log("Ben Javascript")
    return "Merhaba Javascript"
  },
}

console.log(sampleObject2.personel)
console.log(sampleObject2.adress.plate)

let selam = sampleObject2.sayHello()
console.log(selam)
