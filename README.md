# React Bricks starter vanilla React + Custom Editor

This project features [React Bricks V2](https://reactbricks.com) in Create React App.
Here i developed a custom editor to test the ways i could integrate my components in bricks.

## 🚀 Quick start

To clone this project:

```bash
git clone https://github.com/silvicardo/react-bricks-custom-editor.git
```

## 📦 What's inside

This app is bootstrapped with create-react-app, with following additional dependencies:

-   `@reach/router`
-   `react-bricks`
-   `prettier`

The `admin` directory contains the Admin dashboard components (they are just a thin wrapper around React Bricks' exported components)

In the root directory you find two `Viewer` components to show content in your front-end:

-   `Viewer` uses React Bricks' `usePage` hook to fetch the page content
-   `ViewerFetch` uses React Bricks `fetchPage` function to fetch the page content
