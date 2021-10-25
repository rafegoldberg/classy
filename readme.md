## Classy
A utility for generating class names in Javascript with support for CSS modules and BEM expansions.

### Installation
```shell
npm i use-classy
```

### Usage
At it's simplest, `classy` normalizes any number of selector strings or arrays of strings and generates a class list. By way of demonstration, here's an overly complicated example:
```js
classy("class1", [["class2"]], ".class3, class4");
// "class1 class2 class3 class4"
```

#### Auto-Scoping

If you use CSS modules, you can pass a hash of scoped selectors as an initial argument. `classy` will automatically match and replace unscoped selectors with their scoped counterpart!

```js
import classy from "classy";
import classes from "./style.module.scss";

classy(classes, "someClass"); // r2984fh9wnc
```

#### BEM Expansions
`classy` can auto-expand BEM "partial" selectors, i.e. any selector that starts with a `-`, a `_`. It will also replace Sass-style `&` selector with the BEM root! Say you had the following SCSS:
```scss
.Root {
  &--title {}
  &__modifier {}
}
```

Now lets construct a new instance of `classy`, passing it our imported SCSS `classes`, as well as a BEM root class:
```js
import Classy from "classy";
import classes from "./style.module.scss";
const bem = new Classy({
  root: "Root",
  classes,
});
```

Now we can use our instance to generate valid BEM selectors against our root class on the fly!

```js
bem("&");          // Root
bem("--element");  // Root--element
bem("__modifier"); // Root__modifier
```

### React Hook Usage
For convenience, we also export a `useClassy` hook. This is just a simple wrapper around the constructor, which takes a hash of scoped selectors and an optional BEM root class. You can use the returned `classy` instance in your components `className` prop:

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

Which will generate the following HTML… (Or at least something to this effect, depending on your CSS module hashing configuration!)

```html
<header className=_r2984fh9wnc>
  <h2 className=_fh7wncr968a>Title</h2>
</header>
```