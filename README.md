<div align="center">

# Simple UI Components Library

[![npm latest package](https://img.shields.io/npm/v/@davikiyo/simple-ui-components/latest.svg)](https://www.npmjs.com/package/@davikiyo/simple-ui-components)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/davikiyo/simple-ui-components/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/davikiyo/simple-ui-components/tree/main)
[![codecov](https://codecov.io/gh/davikiyo/simple-ui-components/branch/main/graph/badge.svg?token=23DTIW3RQM)](https://codecov.io/gh/davikiyo/simple-ui-components)

<h2>React components library 🚀 for webpages.</h2>

</div>

## Installation

**npm:**

```sh
npm install @davikiyo/simple-ui-components
```

**yarn:**

```sh
yarn add @davikiyo/simple-ui-components
```

## Components

The available components are as follows:

- Alert
- AppBar
- Card
- Drawer
- Grid
- Icons
  - Icon
  - IconSprite
- Lists
  - List
  - ListItem
- Modal
- Pagination
- Tab
- Table
- UI
  - Button
  - Checkbox
  - IconButton
  - MenuButton
  - Switch
  - Textbox

### Icons

`Icon` component depends on `IconSprite` to display the icons. Add `IconSprite` at the top level of your app. (Only once)

```javascript
// index.jsx or App.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { IconSprite } from '@davikiyo/simple-ui-components'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IconSprite />
    <App />
  </React.StrictMode>
)
```

## Demo

Available components can be checked by running Storybook.

### Prerequisites

You're going to need:

- Node.js >= `16.0.0`.
- Yarn — `npm` might not work.

### Setting up

1. Fork this repository on GitHub.
2. Clone your forked repository with `git clone https://github.com/YOURNAME/simple-ui-components.git`
3. Install dependencies with `yarn install`.
4. Run Storybook with `yarn dev` — you should be able to see Storybook running at http://localhost:6006.
