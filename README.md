![create scss logo](https://res.cloudinary.com/mdaraize/image/upload/c_scale,h_320/v1633914336/create-scss-cli/logo.png)

# CREATE SCSS CLI

![npm version](https://img.shields.io/npm/v/create-scss-cli)
![npm license](https://img.shields.io/npm/l/create-scss-cli?color=%2321bab3)
![npm downloads](https://img.shields.io/npm/dt/create-scss-cli)

A command-line interface for a quick and easy way to organize your scss.

Generate an scss folder structure anywhere you want in your application.
Choose which template you want to use (complete, clean, custom). Manage your file the same way in every project, and save time doing it.

<hr>

## Documentation

To learn more about **create-scss-cli**, visit [createscss.com](https://www.createscss.com/)

## Table of Contents

1. [Installation](#installation)
2. [Structure](#structure)
3. [Contribution and support](#contribution)

## Installation

### Prerequisites

- [Node 14](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com)

You can install the package globally or execute it right away with npx.

### Global install

```sh
npm i -g create-scss-cli
```

After that, you'll be able to use the create-scss-cli command in your project loke so:

```sh
cs-cli
```

### NPX

```sh
npx create-scss-cli
```

You will then be prompt with a series of questions to make sure the cli generate the files you want and where you want them.

<img src="https://res.cloudinary.com/mdaraize/image/upload/v1633280171/create-scss-cli/cscli.png" alt="create-scss-cli setup example">

## Structure

```bash
scss
    │
    ├── abstracts
    │   ├── colors
    │   ├── fonts
    │   ├── index
    │   ├── mixins
    │   ├── spacing
    │   └── helper
    │
    ├── base
    │   ├── global.scss
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
    │   └── dark.scss
    │
    ├── vendor
    │   └── normalize.scss
    │
    └── main.scss
```

## Contribution

If you want to contribute to this project go to the [create-scss-cli](https://github.com/maximedaraize/create-scss-cli/issues) repo and open an issue ✏️

Show your support by giving a ⭐️ on [Github](https://github.com/maximedaraize/create-scss-cli)

## 🙋‍♂️ Author

#### Maxime Daraize

[Github](https://github.com/maximedaraize/) <br>
[NPM](https://www.npmjs.com/package/create-scss-cli)
