console.log("Generate your Mastery Key Password 🔐");

const [command] = process.argv.slice(2);

if (command === "get") {
  console.log("Hi Mark");
}
if (command === "set") {
  console.log("Bye Mark");
}

// const get = console.log("Hi Mark");
// const set = console.log("Bye Mark");

// function GetSet() {
//   if (get) {
//     console.log("Hi Mark");
//   }
//   if (set) {
//     console.log("Bye Mark");
//   }
// }
// GetSet();
