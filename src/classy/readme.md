# Classy

> #### 🪝 **Ahoy There!** 🏴‍☠️
>
> _You’re probably looking for the_ `useClassy()` _hook. It’s a fully memoized, React-ready wrapper around classy, so you’ll definitely want to use it instead of the raw, underlying method! [Check out the docs](/ui/#/Core/Hooks/UseClassy)→_

---

Classy does a lot of things. At it's simplest, it’s a utility method for generating `[className]` strings. (It also supports CSS Modules and BEM expansions!) Pass Classy any number of selector as strings or nested arrays of strings, and it'll generate a normalized class string:

```js static
import classy from '@core/utils/classy';

classy('class1', [[false || 'class2'], [[['class3']]]], '.class4, class5')
```

This will give you:

```js static
'class1 class2 class3 class4 class5';
```

#### Auto-Scoping

<details>
<summary>If you're importing a CSS module, you can pass the scoped classes as the first argument. Classy will automatically match and replace the "naked" selectors with their scoped counterparts! <em id="more">Click for examples→</em></summary>

```js static
import classes from './style.module.scss';
// Assuming ^this resolves to something like { someClass: "r2984fh9wnc" }

classy(classes, 'someClass'); // r2984fh9wnc
```

If you'd like to reuse the same scope in a bunch of places, you can construct an instance of classy for reuse, like so:

```js static
import classes from './style.module.scss';

const cn = new classy({ classes });
cn('someClass'); // r2984fh9wnc
```

</details>

#### BEM Expansion

<details>
<summary>Classy can auto-expand BEM "partial" selectors. Call it with the <code class="rsg--code-45">bem</code> namespace option to prefix any selector that starts with <code class="rsg--code-45">-</code> or a <code class="rsg--code-45">_</code> with the root class. Sass-style root selectors (<code class="rsg--code-45">&amp;</code>) will also be replaced with the root namespace. <em id="more">Click for examples→</em></summary>

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
