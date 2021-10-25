import tracer from "./tracer";

describe("tracer()", () => {
  const trace3 = (n) => tracer(n);
  const trace2 = (n) => trace3(n);
  const trace1 = (n) => trace2(n);
  const caller = (n) => trace1(n);

  it("Returns the parent method's name from the stack trace.", () => {
    const traced = caller();
    expect(traced).toBe("trace2");
  });

  it("Accepts an offset to get various ancestor methods.", () => {
    const ancestor = caller(2);
    expect(ancestor).toBe("caller");

    const self = caller(-1);
    expect(self).toBe("trace3");
  });

  it("Ignores blocklisted terms.", () => {
    const bound = () => trace3();
    expect(bound()).toBe("");
  });
});
