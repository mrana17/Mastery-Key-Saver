import chalk from "chalk";
import prompts from "prompts";

console.log(chalk.blue("hello world"));

const run = async () => {
  console.log("Generate your Mastery Key Password 🔐");

  const [command] = process.argv.slice(2);

  if (command === "get") {
    console.log("Hi Mark");
  }
  if (command === "set") {
    console.log("Bye Mark");
  }

  const questions = await prompts([
    {
      type: "text",
      name: "username",
      message: "What is your username?",
    },
    {
      type: "number",
      name: "age",
      message: "How old are you?",
    },
    {
      type: "toggle",
      name: "value",
      message: "Tell me your Password or I'll tell you?!",
      initial: true,
      active: "write",
      inactive: "read",
    },
  ]);
};

run();
