Classy
===
*A [React hook](#react-hook) for generating `[className]` strings, with support for [CSS modules](#auto-scoping) and [BEM expansions](#bem-expansions).*

## Installation

```shell
npm i use-classy
```

## React Hook

If you're working in React, you can import the `useClassy` hook, which is a simple convenience wrapper around the classy constructor. You can use the returned instance in your `className` props, like so:

```jsx
import { useClassy } from "use-classy";
import classes from "./style.module.scss";

const SomeComponent = ({ title }) => {
  const bem = useClassy(classes, "BEMRoot");
  return (
    <header className={bem("&")}>
      <h2 className={bem("--title")}>{title}</h2>
    </header>
  );
};
```

This JSX would render the following HTML:

```html
<header className=BEMRoot>
  <h2 className=BEMRoot--title>Some Title</h2>
</header>
<!--
 This example shows the "naked" class names for clarity;
 in reality this would actually render the scoped classnames!
 -->
```

## Usage

At it's simplest, `classy` takes any number of selector strings or nested arrays of strings, and generates a normalized class string. By way of demonstration, here's an overly complicated example:

```js
import classy from "use-classy";

classy("class1", [["class2"]], ".class3, class4");
```

This will give you:

```js
"class1 class2 class3 class4"
```

### Auto-Scoping

If you're using CSS modules, you can import your scoped classes and pass them as an initial argument. Classy will automatically match and replace the "naked" selectors with their scoped counterpart!

```js
import classes from "./style.module.scss";
// so if ^this resolves to something like { someClass: "r2984fh9wnc" }

classy(classes, "someClass"); // r2984fh9wnc
```

If you'd like to reuse the same module scope in a bunch of places, you can construct an instance of classy for reuse like so:

```js
import classes from "./style.module.scss";

const cn = new classy({ classes });
cn("someClass"); // r2984fh9wnc
```

### BEM Expansions

`classy` can auto-expand BEM "partial" selectors, i.e. any selector that starts with a `--`, a `__`, as well as Sass-style `&` characters. Say, for example, you had the following SCSS module:

```scss
.BEMRoot {
  &--title {}
  &__modifier {}
}
```

We can construct a new instance of classy, specifying a base class against which to expand partial BEM selectors. For the ultimate `classy`-ness, we can also pass in our module classes, since BEM expansions work with [auto-scoping](#auto-scoping)!

```js
import classes from "./style.module.scss";
const bem = new classy({
  root: "BEMRoot",
  classes,
});
```

Now we can use our instance to generate some obfuscated BEM selectors, off the cuff! (The following comments give the "naked" selectors for clarity; in reality this would actually output the scoped classnames.)

```js
bem("&");          // BEMRoot
bem("--element");  // BEMRoot--element
bem("__modifier"); // BEMRoot__modifier
```
