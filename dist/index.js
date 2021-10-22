#! /usr/bin/env node
import inquirer from "inquirer";
import fs from "fs-extra";
import glob from "glob";
import path from "path";
import latestVersion from "latest-version";
import boxen from "boxen";
import chalk from "chalk";
import { createRequire } from "module";
import { dirname } from "path";
import { fileURLToPath } from "url";
const require = createRequire(import.meta.url);
const currentLocalVersion = require("../package.json");
const __dirname = dirname(fileURLToPath(import.meta.url));
(async (callback) => {
    let npmLatestVersion = latestVersion("create-scss-cli");
    let npmLatestVersionTrim = (await npmLatestVersion).replaceAll(".", "");
    let localVersionVariableTrim = currentLocalVersion.version.replaceAll(".", "");
    if (npmLatestVersionTrim > localVersionVariableTrim) {
        console.log(boxen(`
    Update available ${chalk.yellow(`${currentLocalVersion.version}`)} → ${chalk.green.bold(`${await npmLatestVersion}`)}
    Run ${chalk.blueBright.underline("npm i -g create-scss-cli")} to update   
    `, { margin: 1, borderStyle: "double", borderColor: "magenta" }));
    }
    callback();
})(questions);
function questions() {
    inquirer
        .prompt([
        {
            name: "scss_path",
            type: "input",
            message: "Where would you like to add the scss directory (Press enter for root)",
            default: ".",
        },
        {
            name: "scss_structure",
            type: "list",
            message: "Which template would you like to install",
            choices: ["complete", "clean", "custom"],
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
                console.log("\x1b[32m", "\n ✨ Done. New scss directory created.");
                if (answer.scss_structure == "clean") {
                    glob(`${answer.scss_path}${slash}scss/**/_*.scss`, {}, (err, files) => {
                        files.forEach(function (item) {
                            fs.writeFile(item, "");
                        });
                    });
                }
                else if (answer.scss_structure == "custom") {
                    let folders = answer.folder;
                    folders.forEach(function (item) {
                        fs.rm(`${answer.scss_path}${slash}scss/${item}`, {
                            recursive: true,
                        });
                        fs.readFile(`${answer.scss_path}/scss/main.scss`, "utf8", function (err, data) {
                            if (err)
                                throw err;
                            let dataArray = data.split("\n");
                            let searchKeywords = Object.values(answer.folder);
                            let keywordToRegex = new RegExp(searchKeywords.join("|"), "i");
                            let keywordToRegex2 = [keywordToRegex];
                            let result = dataArray.filter(function (dataItem) {
                                return !keywordToRegex2.some(function (regex) {
                                    return regex.test(dataItem);
                                });
                            });
                            let updateFile = result.join("\n");
                            fs.writeFile(`${answer.scss_path}/scss/main.scss`, updateFile, (err) => {
                                if (err)
                                    throw err;
                            });
                        });
                    });
                }
                console.log("\x1b[37m", `\n 🌎 Website:`, "\x1b[36m", `https://createscss.com`, "\x1b[37m", `\n ⭐️ Github:`, "\x1b[36m", ` https://github.com/maximedaraize/create-scss-cli`);
                return true;
            }
            catch (error) {
                if (error.message.includes("already exists")) {
                    console.log("\x1b[33m", "🛑 A scss folder already exist at this level.");
                    return false;
                }
                if (error.message.includes("read-only file system")) {
                    console.log("\x1b[31m", "❗️ The path you chose to install the create-scss structure was not define. \n For root level press enter or write './'");
                    return false;
                }
                throw error;
            }
        }
        copyFiles();
    });
}
