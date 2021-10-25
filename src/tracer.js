export const TRACER_BLOCKLIST = ['bound'];

/**
 * Attempt to pick out the parent method
 * of this function from the stacktrace!
 * @param {number} [step] offset the match returned from the trace.
 * @via https://bit.ly/3kaqYFO
 */
function tracer(step = 0) {
  try {
    throw new Error('TRACE PARENT METHOD');
  } catch (e) {
    /* List all methods in the stack trace.
     */
    const matches = e.stack.match(/(\w+)@|at (\w+) \(/g);

    /* Match parent (or ancesetor) methods.
     */
    const parent = matches?.[step+2]?.match(/(\w+)@|at (\w+) \(/) || [];
    // (`steps` is offset to account for this method and it's direct parent in the trace.)

    /* Extract the method name from matches.
     */
    const method = parent[1] || parent[2] || '';

    return TRACER_BLOCKLIST.includes(method) ? '' : method;
  }
}

export default tracer;
