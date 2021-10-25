import isObject from "lodash/isPlainObject";
import flat from "lodash/flattenDeep";

const splitClassStrings = (classList) =>
  flat(
    classList.map((c) => {
      return typeof c === "string" ? c?.split(/[\s,.]/g) : c;
    })
  );

export const SEPARATORS = ["-", "_"];

export function classy(...args) {
  /* If instantiated with the `new` keyword,
   * construct a faux-instance of Classy so
   * you only have to pass the `scope` obj
   * and/or BEM `root` once.
   */
  if (new.target) {
    const { root = '', classes: scope = {} } = args?.[0] || {};
    return (...classes) =>
      classy({ root, ...scope }, classes) || scope?.[root] || root;
  }

  if (!args.length) return "";

  /* Shift the first param off the args array. If
   * its an object, we'll treat it as a CSS Module
   * hash, which we can use to "auto-scope" these
   * selectors later on!
   */
  let [classMap, ...classList] = args;

  /* If the first param isnt a CSS Module hash,
   * add the initial arg back to the class list
   * and set the classMap to a blank object.
   */
  if (!isObject(classMap)) {
    classList = [classMap, ...classList];
    classMap = {};
  }

  /* Pluck the BEM root out of the classMap.
   */ const { root: rootClass = "" } = classMap || {};

  /* Flatten nested arrays.
   */ classList = flat(classList);

  /* Split stringy lists in to arrays.
   */ classList = splitClassStrings(classList);

  return classList
    .filter((cn) => typeof cn === "string" && cn)
    .map((cn) => {
      /* BEM AUTO-PREFIXING
       */
      if (rootClass) {
        // Replace Sass-style parent selectors (&) with the BEM root...
        if (cn[0] === "&") cn = cn.replace("&", rootClass);
        // Prefix BEM class "partials" with the BEM root...
        else if (SEPARATORS.includes(cn[0])) cn = `${rootClass}${cn}`;
      }

      /* CSS MODULE AUTO-SCOPING
       */
      if (cn in classMap) cn = classMap[cn];

      return cn;
    })
    .join(" ");
}

export const useClassy = (classes, root = '') => {
  console.log("Hello from classy!");
  return new classy({ classes, root });
};

export default classy;
