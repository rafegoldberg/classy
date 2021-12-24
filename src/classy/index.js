/* eslint-disable no-param-reassign
 */
import isObject from "lodash/isPlainObject";
import flat from "lodash/flattenDeep";

export const SEPARATORS = ["-", "_"];

const splitClassStrings = (classes) =>
  flat(
    classes.map((c) => {
      return typeof c === "string" ? c?.split(/[\s,.]/g) : c;
    })
  );

const expandBEMPartials = (classname, namespace) => {
  if (!(classname && namespace)) return classname;

  /* Replace Sass-style root selectors (&)
   * with the BEM namespace...
   */
  if (classname[0] === "&") return classname.replace("&", namespace);

  /* Prefix BEM separator "partials"
   * with the BEM namespace...
   */
  if (SEPARATORS.includes(classname[0])) {
    if (!classname.includes("-scss")) return `${namespace}${classname}`;
  }

  return classname;
};

export function classy(...args) {
  /* When instantiated with the `new` keyword,
   * construct a faux-instance of Classy that
   * can be reused for its scope and BEM root!
   */
  if (new.target) {
    const { bem = "", classes = {}, scope = {} } = args?.[0] || {};
    return (...selectors) => {
      const cn = classy({ bem, ...scope, ...classes }, selectors);
      return cn || scope?.[bem] || bem;
    };
  }

  if (!args.length) return "";

  /* Shift the first param off the args array. If
   * its an object, we treat it as the CSS Module
   * hash which we use to auto-scope our selectors!
   */
  let [scope, ...classes] = args;

  /* If the first param isnt a CSS Module hash,
   * add the initial arg back in to `classes`
   * and set the `scope` to an empty object.
   */
  if (!isObject(scope)) {
    classes = [scope, ...classes];
    scope = {};
  }

  /* Pluck the `bem` namespace out of the `scope`.
   */ const { bem = "" } = scope || {};

  /* Flatten nested arrays.
   */ classes = flat(classes);

  /* Split stringy lists in to arrays.
   */ classes = splitClassStrings(classes);

  return classes
    .filter((cn) => typeof cn === "string" && cn)
    .map((cn) => {
      /* BEM EXPANSIONS
       */ cn = expandBEMPartials(cn, bem);

      /* CSS MODULE AUTO-SCOPING
       */ if (cn in scope) cn = scope[cn];

      return cn;
    })
    .join(" ");
}

classy.SEPARATORS = SEPARATORS;

export default classy;