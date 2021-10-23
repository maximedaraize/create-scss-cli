#! /usr/bin/env node

import inquirer from "inquirer";
import fs from "fs-extra";
import glob from "glob";
import path from "path";
import latestVersion from "latest-version";
import boxen from "boxen";
import chalk from "chalk";
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
import { dirname } from "path";
import { fileURLToPath } from "url";
const require = createRequire(import.meta.url);
import currentLocalVersion from "../package.json";
const __dirname = dirname(fileURLToPath(import.meta.url));

(async (callback) => {
  const npmLatestVersion = latestVersion("create-scss-cli");
  const npmLatestVersionTrim = (await npmLatestVersion).replaceAll(".", "");
  const localVersionVariableTrim = currentLocalVersion.version.replaceAll(
    ".",
    ""
  );

  if (npmLatestVersionTrim > localVersionVariableTrim) {
    console.log(
      boxen(
        `
    Update available ${chalk.yellow(
      `${currentLocalVersion.version}`
    )} → ${chalk.green.bold(`${await npmLatestVersion}`)}
    Run ${chalk.blueBright.underline("npm i -g create-scss-cli")} to update   
    `,
        { margin: 1, borderStyle: "double", borderColor: "magenta" }
      )
    );
  }
  callback();
})(questions);

function questions() {
  inquirer
    .prompt([
      {
        name: "scss_path",
        type: "input",
        message:
          "Where would you like to add the scss directory (Press enter for root)",
        default: "."
      },
      {
        name: "scss_structure",
        type: "list",
        message: "Which template would you like to install",
        choices: ["complete", "clean", "custom"]
      },
      {
        name: "folder",
        type: "checkbox",
        message: "Which folder would you like to remove",
        choices: [
          "abstracts",
          "base",
          "components",
          "layout",
          "pages",
          "themes",
          "vendor"
        ],
        when: function (answer: {
          scss_path: string;
          scss_structure: string;
          folder: Array<object>;
        }) {
          // Only run if user answered "custom" to the first prompt
          return answer.scss_structure === "custom";
        }
      }
    ])
    .then(
      (answer: {
        scss_path: string;
        scss_structure: string;
        folder: Array<object>;
      }) => {
        async function copyFiles() {
          const srcDir: string = path.join(__dirname, "assets");
          const destDir: string = answer.scss_path;
          const slash = "/";
          try {
            await fs.copySync(srcDir, destDir, {
              overwrite: false,
              errorOnExist: true
            });
            console.log("\x1b[32m", "\n ✨ Done. New scss directory created.");
            if (answer.scss_structure == "clean") {
              glob(
                `${answer.scss_path}${slash}scss/**/_*.scss`,
                {},
                (err: string, files: Array<string>) => {
                  files.forEach(function (item) {
                    fs.writeFile(item, "");
                  });
                }
              );
              // Remove selected folder from create-scss
            } else if (answer.scss_structure == "custom") {
              const folders = answer.folder;
              folders.forEach(function (item) {
                fs.rm(`${answer.scss_path}${slash}scss/${item}`, {
                  recursive: true
                }); // remove folder from create-scss structure base on user selection
                fs.readFile(
                  `${answer.scss_path}/scss/main.scss`,
                  "utf8",

                  function (err: string, data: string) {
                    if (err) throw err;
                    const dataArray: Array<string> = data.split("\n"); // convert file data in an array | each line become an value
                    const searchKeywords: Array<object> = Object.values(
                      answer.folder
                    ); // save the user selection (base, components, themes, vendor, etc...)
                    const keywordToRegex = new RegExp(
                      searchKeywords.join("|"),
                      "i"
                    ); // transform the user selection in a regex | EX: /base|pages/vendor/i
                    const keywordToRegex2 = [keywordToRegex]; // transform the regex into an array | EX: [/base|pages/vendor/i]

                    const result = dataArray.filter(function (
                      dataItem: string
                    ) {
                      // **TODO** fonction trouver le moyen de convertir array searchWords en array de regex (retirer les quotes)
                      return !keywordToRegex2.some(function (regex) {
                        return regex.test(dataItem);
                      });
                    });
                    //UPDATE FILE WITH NEW DATA
                    const updateFile = result.join("\n");
                    fs.writeFile(
                      `${answer.scss_path}/scss/main.scss`,
                      updateFile,
                      (err: string) => {
                        if (err) throw err;
                      }
                    );
                  }
                );
              });
            }
            console.log(
              "\x1b[37m",
              `\n 🌎 Website:`,
              "\x1b[36m",
              `https://createscss.com`,
              "\x1b[37m",
              `\n ⭐️ Github:`,
              "\x1b[36m",
              ` https://github.com/maximedaraize/create-scss-cli-zzz`
            );
            return true;
          } catch (error) {
            // if a scss folder already exist on the path chose by the user
            if (error.message.includes("already exists")) {
              console.log(
                "\x1b[33m",
                "🛑 A scss folder already exist at this level."
              );
              return false;
            }
            // if the path of installation was not define properly
            if (error.message.includes("read-only file system")) {
              console.log(
                "\x1b[31m",
                "❗️ The path you chose to install the create-scss structure was not define. \n For root level press enter or write './'"
              );
              return false;
            }
            throw error;
          }
        }
        copyFiles();
      }
    );
}
