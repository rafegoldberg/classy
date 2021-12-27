import Classy, { SEPARATORS } from "./classy";

const mockScope = {
  RootElem: "bPDD5MZYqy37J8a5Ed",
  RootElem_mod: "3ptteOdB8YbvcENwoY6cnW",
  "RootElem-kid": "1c9QFfxxmSn49Hghkx4GmC",
};

describe("Classy", () => {
  describe("Class List Normalization", () => {
    it("concatenates variable-length arguments", () => {
      expect(Classy("test1", "test2", "test3")).toBe("test1 test2 test3");
    });

    it("flattens deeply nested arrays of strings", () => {
      expect(Classy(["test1", ["test2", ["test3"]]])).toBe("test1 test2 test3");
    });

    it("expands comma-separated strings", () => {
      expect(Classy("test1,test2, test3")).toBe("test1 test2 test3");
    });

    it("expands dot-separated strings", () => {
      expect(Classy(".test1.test2.test3")).toBe("test1 test2 test3");
    });

    it("expands space-separated strings", () => {
      expect(Classy("test1 test2 test3")).toBe("test1 test2 test3");
    });
  });

  describe("CSS Module Auto-Scoping", () => {
    it("accepts an initial hash of scoped selectors", () => {
      expect(Classy(mockScope, "RootElem")).toBe("bPDD5MZYqy37J8a5Ed");
    });

    it("skips pre-scoped classes that end in `-scss` (WHY DO WE DO THIS!?)", () => {
      /** Sometimes we pass pre-scoped classes to classy? In our dev environment,
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

  describe("BEM “Partials” Expansion", () => {
    const bem = new Classy({
      bem: "RootElem",
    });

    it("replace Sass-style root selectors (&) with the BEM namespace", () => {
      expect(bem("&")).toBe("RootElem");
    });

    it('autoprefixes "-element" partials with the BEM root namespace', () => {
      expect(bem("-kid")).toBe("RootElem-kid");
    });

    it('autoprefixes "_modifier" partials with the BEM root namespace', () => {
      expect(bem("_mod")).toBe("RootElem_mod");
    });

    it("add custom BEM partials via the `SEPARATORS` export", () => {
      SEPARATORS.push('@')
      expect(bem("@customBEMPartial")).toBe("RootElem@customBEMPartial");
    });
  });

  describe("Classy Instances", () => {
    it("can be created with the `new` keyword", () => {
      const bem1 = new Classy(mockScope);
      const bem2 = new Classy({ classes: mockScope });
      expect(bem1("RootElem")).toBe("bPDD5MZYqy37J8a5Ed");
      expect(bem2("RootElem")).toBe("bPDD5MZYqy37J8a5Ed");
    });
    it("accepts a single object of scoped `classes` and/or a `bem` namespace", () => {
      const bem1 = new Classy({ ...mockScope, bem: "RootElem" });
      const bem2 = new Classy({ classes: mockScope, bem: "RootElem" });
      expect(bem1("&")).toBe("bPDD5MZYqy37J8a5Ed");
      expect(bem2("&")).toBe("bPDD5MZYqy37J8a5Ed");
    });
    it("accepts a BEM namespace and/or a module scope as two params (in either order!)", () => {
      const bem0 = new Classy("RootElem");
      const bem1 = new Classy(mockScope, "RootElem");
      const bem2 = new Classy("RootElem", mockScope);
      expect(bem0("&")).toBe("RootElem");
      expect(bem1("&")).toBe("bPDD5MZYqy37J8a5Ed");
      expect(bem2("&")).toBe("bPDD5MZYqy37J8a5Ed");
    });
  });
});
