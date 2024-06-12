#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(
  chalk.yellowBright(
    "────────────────────────────────────────────────────────────────────────────────\n"
  )
);
console.log(chalk.cyanBright.bold("\t\t Welcome to my TS RapidFire Quiz ✦ \n"));
console.log(
  chalk.yellowBright(
    "─────────────────────────────────────────────────────────────────────────────────"
  )
);

console.log(
  chalk.blueBright(
    "✨🌸✨ In this Timer quiz application you will have only ten seconds to give answer otherwise the answer will did not count ✨🌸✨"
  )
);

let username = await inquirer.prompt([
  {
    name: "name",
    type: "input",
    message: chalk.greenBright("please enter your name"),
  },
]);

let sure_play = await inquirer.prompt([
  {
    name: "play",
    type: "confirm",
    message: chalk.greenBright("Are you sure you want to play this game?"),
  },
]);

interface Question {
  question: string;
  choices: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    question:
      "Which of the following TypeScript features allows you to ensure that a certain property is always present in an object at compile time?",
    choices: [
      "Optional Chaining",
      "Mapped Types",
      "Utility Types",
      "Type Guards",
    ],
    correctAnswer: "Type Guards",
  },
  {
    question:
      "In TypeScript, which utility type would you use to create a type by picking a set of properties from another type?",
    choices: ["Partial<T>", "Pick<T, K>", "Record<K, T>", "Exclude<T, U>"],
    correctAnswer: "Pick<T, K>",
  },
  {
    question: "What does the unknown type represent in TypeScript?",
    choices: [
      "A type that is never assignable to any other type",
      "A type that is the type-safe counter part of `any`",
      "A type that represents a value that can be any string or number",
      "A type that represents the absence of value",
    ],
    correctAnswer: "A type that is the type-safe counter part of `any`",
  },
  {
    question:
      "Which TypeScript feature allows you to define the shape of a data structure and enforce it at compile time?",
    choices: ["Interfaces", "Generics", "Type Aliases", "All of the above"],
    correctAnswer: "All of the above",
  },
  {
    question:
      "Which of the following best describes the purpose of TypeScript's never type?",
    choices: [
      "It represents the type of values that never occur",
      "It represents the type of any value",
      "It represents the type of a function that returns void",
      "It represents the type of optional values",
    ],
    correctAnswer: "It represents the type of values that never occur",
  },
  {
    question:
      "What will be the output of the following TypeScript code? \n type T1 = string & number; \n let val : T1;",
    choices: [
      "val will be of type string",
      "val will be of type number",
      "val will be of type never",
      "val will be of type undefined",
    ],
    correctAnswer: "val will be of type never",
  },
  {
    question:
      "Which of the following constructs is used to create a type that extracts the return type of a function in TypeScript?",
    choices: ["Extract<T, U>", "ReturnType<T>", "Return<T>", "TypeOfReturn<T>"],
    correctAnswer: "ReturnType<T>",
  },
  {
    question:
      "How can you make a property in an interface read-only in TypeScript?",
    choices: [
      "Using the readonly modifier before the property name",
      "Using the immutable modifier before the property name",
      "Using the static modifier before the property name",
      "Using the final modifier before the property name",
    ],
    correctAnswer: "Using the readonly modifier before the property name",
  },
  {
    question: "What does the keyof operator do in TypeScript?",
    choices: [
      "It returns the keys of an object as an array of strings",
      "It creates a union type of the keys of a given type",
      "It maps the keys of an object to their respective values",
      "It creates a new type based on the values of a given type",
    ],
    correctAnswer: "It creates a union type of the keys of a given type",
  },
  {
    question:
      "How can you define a function that accepts a variable number of arguments in TypeScript?",
    choices: [
      "Using ... (spread operator) in the function parameters",
      "Using the Rest type",
      "Using the VariableArgs type",
      "Using the Array type in the function parameters",
    ],
    correctAnswer: "Using ... (spread operator) in the function parameters",
  },
];

if (sure_play.play) {
  async function askQuestionWithTimer(question: Question): Promise<boolean> {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        console.log(chalk.redBright("\nTime is up!"));
        resolve(false);
      }, 10000); // 10 seconds timer

      inquirer
        .prompt([
          {
            name: "userAnswer",
            type: "list",
            message: chalk.cyanBright(question.question),
            choices: question.choices,
          },
        ])
        .then((answer) => {
          clearTimeout(timer);
          if (answer.userAnswer) {
            // Compare answers case-insensitively
            resolve(
              answer.userAnswer.toLowerCase() ===
                question.correctAnswer.toLowerCase()
            );
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          clearTimeout(timer);
          console.error("Error in prompting the question:", error);
          resolve(false);
        });
    });
  }

  async function mainWithTimer() {
    let score = 0;
    for (const question of questions) {
      const correct = await askQuestionWithTimer(question);
      if (correct) {
        console.log(chalk.yellowBright("Correct!"));
        score++;
      } else {
        console.log(chalk.redBright("Incorrect!"));
      }
    }

    if (score === questions.length) {
      console.log(
        chalk.cyanBright(
          `\n═══════════════════════════════════════════════════════════════════════════════`
        )
      );
      console.log(
        chalk.magentaBright(
          `\n Congratulations ${username.name} your all answers are correct \n your score is ${score}/${questions.length}`
        )
      );
      console.log(
        chalk.cyanBright(
          `\n═══════════════════════════════════════════════════════════════════════════════`
        )
      );
    } else {
      console.log(
        chalk.cyanBright(
          `\n═══════════════════════════════════════════════════════════════════════════════ \n`
        )
      );
      console.log(
        chalk.redBright(
          `${username.name} Your final score is: ${score}0 / 100 \n`
        )
      );
      console.log(
        chalk.cyanBright(
          `\n═══════════════════════════════════════════════════════════════════════════════`
        )
      );
    }
  }

  mainWithTimer();
} else {
  console.log(
    chalk.redBright("Thank you for running this Quiz application Thanks! ")
  );
}
