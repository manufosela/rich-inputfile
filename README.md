# \<rich-inputfile>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i @manufosela/rich-inputfile
```

## Usage

```html
<script type="module">
  import 'rich-inputfile/rich-inputfile.js';
</script>

<rich-inputfile
  id="updaloadFile-1"
  name="caratula"
  allowed-extensions="jpg,png,gif"
  show-label="true"
  show-thumbnail="true"
>
</rich-inputfile>
```

## Atributes

- **show-label**:
  - type: boolean
  - default: false
  - description: Show label
- **show-thumbnail**:
  - type: boolean
  - default: false
  - description: Show thumbnail
- **allowed-extensions**:
  - type: string
  - default: '' (empty string means all extensions are allowed)
  - description: Allowed extensions separated by comma

## Properties

- **fileArrayBuffer**:
  - type: Array<ArrayBuffer>
  - default: []
  - description: Array of file data
- **fileArrayUint8**:
  - type: Array<Uint8Array>
  - default: []
  - description: Array of file data
- **urlFile**:
  - type: String
  - default: ''
  - description: local url of file
- **thumbnailWidth**:
  - type: number
  - default: 50 (px)
  - description: Width of the thumbnail shown when the file is loaded and show-thumbnail is true

## Styling

- **--bgcolor-button** Default #106BA0
- **--color-button** Default #FFF
- **--input-width** Default 300px

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
