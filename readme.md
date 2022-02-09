# Classy <a href="https://github.com/rafegoldberg/classy/actions/workflows/test.yml"><img src="https://github.com/rafegoldberg/classy/actions/workflows/test.yml/badge.svg?branch=main" align=center></a>

*A utility for generating class name strings, with support for [CSS Module scoping](#auto-scoping) and [BEM expansion](#bem-expansion).*

## Installation
```bash
npm i -S use-classy
```

## Usage
Classy does a lot of things, but at it's simplest, it’s a utility method for generating normalized class name strings. It also supports CSS Modules and BEM expansions, and ships with [**a React-ready hook**](#react-hook). 

To get started, you can pass Classy any number of selectors (either strings or nested arrays of strings) and it will generate a normalized class string. Here's a contrived example:

```js static
import { classy } from 'use-classy';

classy('class1', [[false && 'class2'], [[['class3']]]], '.class4, class5')
```

Under the hood, this will flatten everything in to a single array, filter out any falsey values, and more! All of which gives you a nice, simple, space-separated class string:

```js static
'class1 class3 class4 class5';
```

### 💄  Auto-Scoping

<details>
<summary>If you're importing a CSS module, you can pass the scoped classes as the first argument. Classy will automatically match and replace the "naked" selectors with their scoped counterparts!</summary><br/>

```js static
import classes from './style.module.scss';
// assuming ^this stylesheet exports something like { someClass: "r2984fh9wnc" }

classy(classes, 'someClass'); // r2984fh9wnc
```

If you'd like to reuse the same scope in a bunch of places, you can construct an instance of classy for reuse, like so:

```js static
import classes from './style.module.scss';

const bem = new classy({ classes });
bem('someClass'); // r2984fh9wnc
```

</details>

### 🧨  BEM Expansion

<details>
<summary>Classy can auto-expand BEM "partial" selectors. Call it with the <code>bem</code> namespace option to prefix any selector that starts with <code>-</code> or a <code>_</code> with the root class. Sass-style root selectors (<code>&amp;</code>) will also be replaced with the root namespace.</summary><br/>

Say, for example, you had the following SCSS module…

```scss
.Block {
  &--title {
  }
  &__modifier {
  }
}
```

We can construct a new instance of classy, specifying a base class against which to expand partial BEM selectors. For the ultimate `classy`-ness, we can also pass in our module classes, since BEM expansion works with [auto-scoping](#auto-scoping)!

```js static
import classes from './style.module.scss';

const bem = new classy({
  bem: 'Block',
  classes,
});
```

Now we can reuse a single classy instance throughout our component to generate markup structures against our BEM selectors on the fly! 💥

```js static
bem();            // Block
bem('&');         // Block
bem('-element');  // Block-element
bem('_modifier'); // Block_modifier
```

(The above comments give the "naked" selectors for clarity; in reality this would actually output the scoped classnames.)

</details>

### 🪝  React Hook Usage

<details>
<summary>Classy comes with a React-ready wrapper around the main <code>classy</code> method! You can call it like any other hook, and use the returned instance to generate selector structures for your <code>className</code> props, like so:</summary><br/>

```jsx static
import { useClassy } from 'use-classy';
import classes from './style.module.scss';

const MyElement = ({ title, className }) => {
  const bem = useClassy('MyElement', classes);
  return (
    <header className={bem('&', className)}>
      <h2 className={bem('-title')}>{title}</h2>
    </header>
  );
};
```

Given this JSX, you'd end up with the following HTML structure: (This example shows the "naked" class names for clarity; in reality it would actually render the scoped selectors!)

```html
<header className="MyElement additional-classes">
  <h2 className="MyElement-title">Some Title</h2>
</header>
```

</details>
