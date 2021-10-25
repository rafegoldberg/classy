Classy
===
*A utility for generating class names in Javascript with support for CSS modules and BEM expansions.*

## Installation

```shell
npm i use-classy
```

## Usage

At it's simplest, `classy` normalizes any number of selector strings or arrays of strings and generates a class list. By way of demonstration, here's an overly complicated example:

```js
import classy from "classy";
classy("class1", [["class2"]], ".class3, class4");
```

Which will give you:

```js
"class1 class2 class3 class4"
```

### Auto-Scoping

If you're using CSS modules, you can pass the imported hash of classes as the initial argument. Classy will automatically match and replace the "naked" selectors with their scoped counterpart!

```js
import classes from "./style.module.scss";
// imagining ^this resolves to something like { someClass: "r2984fh9wnc" }

classy(classes, "someClass"); // r2984fh9wnc
```

### BEM Expansions

`classy` can also auto-expand BEM "partial" selectors, i.e. any selector that starts with a `--`, a `__`. It will also replace the Sass-style `&` character with the BEM root class. So say you had the following SCSS module:

```scss
.BEMRoot {
  &--title {}
  &__modifier {}
}
```

Now we'll construct a new instance of `classy`, specifying a `root` class against which to expand partial BEM selectors: (BEM expansions work with [auto-scoping](#auto-scoping), so lets pass in our `classes` as well for the ultimate `classy`-ness!)

```js
import Classy from "classy";
import classes from "./style.module.scss";
const bem = new Classy({
  root: "BEMRoot",
  classes,
});
```

We can use our instance to generate some valid BEM selectors:

```js
bem("&");          // BEMRoot
bem("--element");  // BEMRoot--element
bem("__modifier"); // BEMRoot__modifier
```

## React Hook

For convenience, we also exports a `useClassy` hook for your React components! This is really just a simple wrapper around Classy's constructor method, and takes the same hash of scoped classes and a BEM root class. Use the returned instance directly in your components' `className` props, like so:

```jsx
import { useClassy } from "classy";
import classes from "./style.module.scss";

const SomeComponent = ({ title }) => {
  const bem = useClassy(classes, "SomeComponent");
  return (
    <header className={bem("&")}>
      <h2 className={bem("--title")}>{title}</h2>
    </header>
  );
};
```
