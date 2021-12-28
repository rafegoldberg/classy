import { useCallback, useMemo } from "react";
import { classy } from "../classy";
import PropTypes from "prop-types";

/**
 * A utility for generating [className] strings, which
 * supports CSS module auto scoping and BEM expansions.
 * @param   {Object} scope:     CSS Module selector hash
 * @param   {String} namespace: the BEM root selector
 * @returns {String}            a normalized list of class selectors
 */
export const useClassy = (scope, namespace) => {
  const bem = useCallback(
    () => new classy(scope, namespace),
    [scope, namespace]
  );
  return useMemo((...args) => bem(...args), [bem]);
};

export const CLASSY_PROPTYPE = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])),
]);

export default useClassy;
