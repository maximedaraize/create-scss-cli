#! /usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const glob = require("glob");

let ascii = `
 a88888b.  888888ba   88888888b  .d888888  d888888P  88888888b    .d88888b   a88888b. .d88888b  .d88888b  
d8'    88  88     8b  88        d8'    88     88     88           88.    "' d8'    88 88.    "' 88.    "' 
88        a88aaaa8P' a88aaaa    88aaaaa88a    88    a88aaaa        Y88888b. 88         Y88888b.  Y88888b. 
88         88    8b.  88        88     88     88     88                  8b 88               8b        8b 
Y8.   .88  88     88  88        88     88     88     88           d8'   .8P Y8.   .88 d8'   .8P d8'   .8P 
 Y88888P'  dP     dP  88888888P 88     88     dP     88888888P     Y88888P   Y88888P'  Y88888P   Y88888P  
oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo                                                                      
 `;

inquirer
  .prompt([
    {
      name: "scss_path",
      type: "input",
      message:
        "Where would you like to add the scss directory? (Press enter for root)",
      default: ".",
    },
    {
      name: "scss_structure",
      type: "list",
      message: "What structure would you like?",
      choices: ["default", "blank", "custom"],
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
        "vendor",
      ],
      when: function (answer) {
        // Only run if user answered "custom" to the first prompt
        return answer.scss_structure === "custom";
      },
    },
    // VERSION 2
    {
      type: "confirm",
      name: "updatePackage",
      message:
        "Would you like to add or update an existing package.json with depedencies and script require to compile your scss? 📦",
      default: true,
    },
    {
      type: "input",
      name: "wherePackage",
      message: "where is it located (type 'enter' for root)",
      default: "./",
      when: (a) => a.updatePackage,
      // Only run if user answered "custom" to the first prompt
    },
  ])
  .then((answer) => {
    async function copyFiles() {
      const srcDir = path.join(__dirname, "assets");
      const destDir = answer.scss_path;
      try {
        await fs.copySync(srcDir, destDir, {
          overwrite: false,
          errorOnExist: true,
        });
        console.log(
          "\x1b[32m",
          "Awesome! A new scss folder was added to your project. You are now ready to code something beautiful"
        );
        if (answer.scss_structure == "blank") {
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
                console.log(result);

                //UPDATE FILE WITH NEW DATA
                let updateFile = result.join("\n");
                fs.writeFile(
                  `${answer.scss_path}/scss/main.scss`,
                  updateFile,
                  (err) => {
                    if (err) throw err;
                    console.log("Successfully updated the file data");
                  }
                );
              }
            );
          });
        }
        console.log(
          "\x1b[35m",
          ascii,
          "\x1b[37m",
          ` \n 🎉 Thank you for using create-scss \n 🌎 Website:`,
          "\x1b[36m",
          `https://create-scss.com`
        );
        return true;
      } catch (error) {
        // if a scss folder already exist on the path chose by the user
        if (error.message.includes("already exists")) {
          console.log(
            "\x1b[33m",
            "scss folder already exist at this level. Complementary files were added to it. Happy coding"
          );
          return false;
        }
        // if the path of installation was not define properly
        if (error.message.includes("read-only file system")) {
          console.log(
            "\x1b[31m",
            "The path you chose to install the create-scss structure was not define. \n For root level press enter or write './'"
          );
          return false;
        }
        throw error;
      }
    }
    copyFiles();
  });
