import classy from "./classy";

describe("classy()", () => {
  const mockScope = {
    RootElem: "bPDD5MZYqy37J8a5Ed",
    RootElem_mod: "3ptteOdB8YbvcENwoY6cnW",
    "RootElem-kid": "1c9QFfxxmSn49Hghkx4GmC",
  };

  it("Concatenate multiple args to a space-separated class string.", () => {
    expect(classy("test1", ".test2", "test3")).toBe("test1 test2 test3");
  });

  describe("Normalizes arrays + stringy lists.", () => {
    it("Flattens deeply nested arrays of strings.", () => {
      expect(classy(["test1", ["test2", ["test3"]]])).toBe("test1 test2 test3");
    });

    it("Expands comma-separated strings.", () => {
      expect(classy("test1,test2, test3")).toBe("test1 test2 test3");
    });

    it("Expands dot-separated strings.", () => {
      expect(classy(".test1.test2.test3")).toBe("test1 test2 test3");
    });

    it("Expands space-separated strings.", () => {
      expect(classy("test1 test2 test3")).toBe("test1 test2 test3");
    });
  });

  describe("Auto-scopes CSS module classes.", () => {
    it("Accepts an initial hash of scoped selectors.", () => {
      expect(classy(mockScope, "RootElem")).toBe("bPDD5MZYqy37J8a5Ed");
    });
  });

  describe("Generates BEM classes from partial selectors:", () => {
    const bem = new classy({
      root: "RootElem",
    });

    it('Root Selectors:     `&`', () => {
      expect(bem("&")).toBe("RootElem");
    });

    it('Element Selectors:  `-child`', () => {
      expect(bem("-kid")).toBe("RootElem-kid");
    });

    it('Modifier Selectors: `_modifier`', () => {
      expect(bem("_mod")).toBe("RootElem_mod");
    });

    it('Long BEM Selectors: `__mod` and `--child`', () => {
      expect(bem("__mod")).toBe("RootElem__mod");
      expect(bem("--child")).toBe("RootElem--child");
    });
  });

  it("Instances can be constructed using the `new` keyword.", () => {
    const cn = new classy({
      classes: mockScope,
    });
    expect(cn("RootElem")).toBe("bPDD5MZYqy37J8a5Ed");
  });
});
