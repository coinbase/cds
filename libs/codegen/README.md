# Codegen

We have a number of disparate codegen scripts in our repo. This doc page serves as the jump off doc for understanding their functionality.

# Codegen Scripts in this Package

- Adoption Tracker
- Icons
- Illustrations
- Playground route generation
- cds-web/cds-mobile/cds-common token generator scripts

## EJS Templates

Codegen needs to be run before using CDS or running the storybook. It uses [ejs](https://ejs.co/) templates to generate source code. The ejs templates live in [`templates/`](./templates). The folder structure in `templates/` should mimic the source file structure that the codegen output should be. The only exception is codegen a component. The component's folder can be skipped by having `shouldCreateFolder` option set to `true` in the codegen script. Rather than creating `templates/components/Button/Button.ejs`, `templates/components/Button.ejs` will suffice.
