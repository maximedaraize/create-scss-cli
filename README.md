![create scss logo](https://res.cloudinary.com/mdaraize/image/upload/v1632068278/create-scss-cli/LOGO_create-scss-cli_sztji2.png)

![npm version](https://img.shields.io/npm/v/create-scss-cli)
![npm license](https://img.shields.io/npm/l/create-scss-cli?color=%2321bab3)
![npm downloads](https://img.shields.io/npm/dt/create-scss-cli)

### A command line interface for a quick and easy way structure your scss ⚡️

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Structure](#structure)
4. [Faq](#faq)
5. [Contribution and support](#contribution)

## Installation

Install globally the cli

```sh
npm i -g create-scss-cli
```

## Usage

Choose between 3 options: [Learn more](https://createscss.com)

- **Default**: Original structure with code 💫
- **Blank**: Original structure without code 📂
- **Custom**: Remove directory you do not need 🎯

Type the command below to get started

```sh
create-scss-cli
```

## Structure

```bash
     scss
        │
        ├── abstracts
        │   ├── functions.scss
        │   ├── helpers.scss
        │   ├── mixins.scss
        │   └── variables.scss
        │
        ├── base
        │   ├── global.scss
        │   ├── reset.scss
        │   ├── shame.scss
        │   └── typography.scss
        │
        ├── components
        │   ├── alert.scss
        │   ├── banner.scss
        │   ├── buttons.scss
        │   ├── card.scss
        │   ├── forms.scss
        │   ├── icons.scss
        │   ├── menu.scss
        │   ├── modal.scss
        │   ├── progress.scss
        │   └── table.scss
        │
        ├── layout
        │   ├── footer.scss
        │   ├── grid.scss
        │   ├── header.scss
        │   ├── navigation.scss
        │   └── sidebar.scss
        │
        ├── pages
        │   └── home.scss
        │
        ├── themes
        │   └── theme.scss
        │
        ├── vendor
        │
        └── main.scss

```

## Faq

**Q:** Why did you publishing `create-scss-cli` when [create-scss](https://github.com/maximedaraize/create-scss) already exists ?<br>
**A:** The first iteration of this project [create-scss](https://github.com/maximedaraize/create-scss) was created to solve one problem. Create a unify scss structure for our developer team. Having the same scss structure help us to maintain our style with more cohesion. The **CLI** version give use more flexibility, by giving us options of which structure we want to install, and it is also easier to integrate in existing project, because we can now choose where to install inside our projects.

<hr>

**Q:** Can i still use [create-scss](https://www.npmjs.com/package/create-scss) even if it is deprecated ?<br>
**A:** YES. I do not have any plan to release new version in the future. The final version of this package is ![npm version](https://img.shields.io/npm/v/create-scss). If it helps you in any way, please continue to use it.👍

<hr>

**Q:** What is your plan for the cli ?<br>
**A:** You can see here the **create scss cli** [roadmap](https://www.npmjs.com/package/create-scss-cli) 🗺

<hr>

**Q:** I do not see a **packge.json**, what depedencies or command should i use ?<br>
**A:** Giving the user an option to create or update an existing packge.json is in our plan [see here](https://www.npmjs.com/package/create-scss-cli). Meanwhile here's a list of depedencies we recommand to compile your scss and scripts we regularly uses ourselves.

#### Depedencies

- **autoprefixer**: Use to add vendor prefix to your css [Learn more](https://github.com/postcss/autoprefixer)
- **postcss-cli**: Use to transform your css [Learn more](https://postcss.org)
- **sass**: Primary implementation of Sass [Learn more](https://sass-lang.com/dart-sass) \*node-sass is deprecated

```json
"dependencies": {
    "autoprefixer": "^9.7.4",
    "postcss-cli": "^7.1.0",
    "sass": "^1.27.0"
  }

```

#### Scripts

- watch: compile your scss on save
- build: compile your scss into css and then minified it, remove any source map and add vendor prefix

```json
"scripts": {
    "watch": "sass scss/main.scss css/style.css --watch",
    "build": "sass scss/main.scss 1/css/style.css --style=compressed --no-source-map && postcss css/style.css -o css/style.css --use autoprefixer -b 'last 4 versions'"
  },

```

<hr>

## Contribution

If you want to contribute to this project go to the [create-scss-cli](https://github.com/maximedaraize/create-scss-cli/issues) repo and open an issue ✏️

Show your support by giving a ⭐️ on [Github](https://github.com/maximedaraize/create-scss-cli)

## 🙋‍♂️ Author

#### Maxime Daraize

[Github](https://github.com/maximedaraize/)
