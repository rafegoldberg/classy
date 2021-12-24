import Classy from ".";

const mockScope = {
  RootElem: "bPDD5MZYqy37J8a5Ed",
  RootElem_mod: "3ptteOdB8YbvcENwoY6cnW",
  "RootElem-kid": "1c9QFfxxmSn49Hghkx4GmC",
};

describe("Classy", () => {
  describe("Class List Normalization", () => {
    it("Concatenates variable-length arguments.", () => {
      expect(Classy("test1", "test2", "test3")).toBe("test1 test2 test3");
    });

    it("Flattens deeply nested arrays of strings.", () => {
      expect(Classy(["test1", ["test2", ["test3"]]])).toBe("test1 test2 test3");
    });

    it("Expands comma-separated strings.", () => {
      expect(Classy("test1,test2, test3")).toBe("test1 test2 test3");
    });

    it("Expands dot-separated strings.", () => {
      expect(Classy(".test1.test2.test3")).toBe("test1 test2 test3");
    });

    it("Expands space-separated strings.", () => {
      expect(Classy("test1 test2 test3")).toBe("test1 test2 test3");
    });
  });

  describe("Classy Instances", () => {
    it("Can be created with the `new` keyword.", () => {
      const cn = new Classy({
        classes: mockScope,
      });
      expect(cn("RootElem")).toBe("bPDD5MZYqy37J8a5Ed");
    });
  });

  describe("CSS Module Auto-Scoping", () => {
    it("Accepts an initial hash of scoped selectors.", () => {
      expect(Classy(mockScope, "RootElem")).toBe("bPDD5MZYqy37J8a5Ed");
    });
  });

  describe("BEM Expansion", () => {
    const bem = new Classy({
      bem: "RootElem",
    });

    it("Replaces Sass-style root selectors (&) with the BEM base.", () => {
      expect(bem("&")).toBe("RootElem");
    });

    it('BEM "-element" partials', () => {
      expect(bem("-kid")).toBe("RootElem-kid");
    });

    it('BEM "_modifier" partials', () => {
      expect(bem("_mod")).toBe("RootElem_mod");
    });

    it("Skips pre-scoped classes that end in `-scss`.", () => {
      /** Sometimes we pass pre-scoped classes to classy. In our dev environment,
       *  the generated classes can start with an underscore, which causes Classy
       *  to attempt to prefix them with the BEM root!
       *  @todo: i can't actually remember what/where/why this was a problem;
       *         is it still happening? there's probably a better fix...
       */
      const prescopedClass = "_1adDfJfhK6H-scss";
      const scope = { [prescopedClass]: "PRESCOPED" };
      expect(Classy(scope, prescopedClass)).toMatchSnapshot();
    });
  });
});
