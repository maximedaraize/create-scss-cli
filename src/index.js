#! /usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs-extra");
const glob = require("glob");
const path = require("path");
const latestVersion = require('latest-version');
const currentLocalVersion = require('../package.json');
const boxen = require('boxen');
const chalk = require ('chalk');

(async (callback) => {
	let npmLatestVersion = latestVersion('create-scss-cli');
  let npmLatestVersionTrim = (await npmLatestVersion).replaceAll('.','');
  let localVersionVariableTrim = currentLocalVersion.version.replaceAll('.','')

  if(npmLatestVersionTrim > localVersionVariableTrim) {
    console.log(boxen(`
    Update available ${chalk.yellow(`${currentLocalVersion.version}`)} → ${chalk.green.bold(`${await npmLatestVersion}`)}
    Run ${chalk.blueBright.underline('npm i -g create-scss-cli')} to update   
    `,
    {margin: 1, borderStyle: 'double', borderColor: 'magenta'}))
  }
  callback();
})(questions);

function questions(){
inquirer
  .prompt([
    {
      name: "scss_path",
      type: "input",
      message:
        "Where would you like to add the scss directory (Press enter for root) 🔍",
      default: ".",
    },
    {
      name: "scss_structure",
      type: "list",
      message: "What structure would you like 🎨",
      choices: ["complete", "clean", "custom"],
    },
    {
      name: "folder",
      type: "checkbox",
      message: "Which folder would you like to remove 🗑 ",
      choices: [
        "abstracts",
        "base",
        "components",
        "layout",
        "pages",
        "themes",
        "vendor",
      ],
      when: function (answer) {
        // Only run if user answered "custom" to the first prompt
        return answer.scss_structure === "custom";
      },
    },
  ])
  .then((answer) => {
    async function copyFiles() {
      const srcDir = path.join(__dirname, "assets");
      const destDir = answer.scss_path;
      let slash = "/";
      try {
        await fs.copySync(srcDir, destDir, {
          overwrite: false,
          errorOnExist: true,
        });
        console.log(
          "\x1b[32m",
          "\n 👍 Awesome! A new scss folder was added to your project."
        ); 
        if (answer.scss_structure == "clean") {
          glob(
            `${answer.scss_path}${slash}scss/**/_*.scss`,
            {},
            (err, files) => {
              files.forEach(function (item) {
                fs.writeFile(item, "");
              });
            }
          );
          // Remove selected folder from create-scss
        } else if (answer.scss_structure == "custom") {
          let folders = answer.folder;
          folders.forEach(function (item) {
            fs.rm(`${answer.scss_path}${slash}scss/${item}`, {
              recursive: true,
            }); // remove folder from create-scss structure base on user selection
            fs.readFile(
              `${answer.scss_path}/scss/main.scss`,
              "utf8",

              function (err, data) {
                if (err) throw err;
                let dataArray = data.split("\n"); // convert file data in an array | each line become an value
                let searchKeywords = Object.values(answer.folder); // save the user selection (base, components, themes, vendor, etc...)
                let keywordToRegex = new RegExp(searchKeywords.join("|"), "i"); // transform the user selection in a regex | EX: /base|pages/vendor/i
                let keywordToRegex2 = [keywordToRegex]; // transform the regex into an array | EX: [/base|pages/vendor/i]

                let result = dataArray.filter(function (dataItem) {
                  // **TODO** fonction trouver le moyen de convertir array searchWords en array de regex (retirer les quotes)
                  return !keywordToRegex2.some(function (regex) {
                    return regex.test(dataItem);
                  });
                });
                //UPDATE FILE WITH NEW DATA
                let updateFile = result.join("\n");
                fs.writeFile(
                  `${answer.scss_path}/scss/main.scss`,
                  updateFile,
                  (err) => {
                    if (err) throw err;
                  }
                );
              }
            );
          });
        }
        console.log(
          "\x1b[37m",
          ` \n 🎉 Thank you for using create-scss-cli \n 🌎 Website:`,
          "\x1b[36m",
          `https://createscss.com`,
          "\x1b[37m",
          `\n ⭐️ Github:`,
          "\x1b[36m",
          `https://github.com/maximedaraize/create-scss-cli`,
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
  });
}
