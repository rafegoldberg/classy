# `useClassy` Hook

A React-ready wrapper around the `classy` utility. Call it like you would any React hook, and use the returned instance to generate selector structures for your `className` props, like so:

```jsx static
import { classy } from 'use-classy';
import classes from './style.module.scss';

const MyElement = ({ title, className }) => {
  const bem = useClassy(classes, 'MyElement');
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

<!-- Read more about the underlying `classy` method [here](/ui/#/Core/Utilities/Classy)! -->