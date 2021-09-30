## [1.2.0](https://github.com/maximedaraize/create-scss-cli/releases/tag/1.2.0) (2021-09-25)

### Features

- Use modern **SASS** at-rule. Replace `@import` by `@forward` and `@use`
- Move [normalize.css](https://necolas.github.io/normalize.css/) from the base directory to the vendor directory. Renamed it `_normalize.scss` instead of `_reset.scss`
- Add and improve mixins: (Fluid typography, @font-face, mobile-first breakpoints, elipsis, palceholder/vendor-prfixes, flexbox, z-index, ratio, background, visibility, columns generator)
- Add a new set of scss variables and css custom-property (color, font, spacing)
- Setup a dark theme 

## [1.1.1](https://github.com/maximedaraize/create-scss-cli/releases/tag/1.1.1) (2021-09-25)

### Fixes

- Fix typo in README / package.json intro
- Replace terminal visual by video in README.md
- Fix broken link in CHANGELOG.md 

## [1.1.0](https://github.com/maximedaraize/create-scss-cli/releases/tag/1.1.0) (2021-09-25)

### Features

- Add a notification if an update is available.
- New shorthand to invoke the create-scss-cli. You can use `cs-cli`.
- Fix typos in some of the console.log message.
- Update question ask to the users.
- The **default** and **blank** have been renamed. ('default' became 'Complete', 'blank' became 'Clean').