import returnPageName from "./pageName";

describe("pageName", () => {
  it("should return 'Invalid page' if key is null", () => {
    expect(returnPageName(null)).toBe("Invalid page");
  });

  it("should return 'Invalid page' if key is not in pageNames", () => {
    expect(returnPageName("/invalid-page")).toBe("Invalid page");
  });

  it("should return 'User List' if key is '/user-list'", () => {
    expect(returnPageName("/user-list")).toBe("User List");
  });

  it("should return 'Repositories' if key is '/repositories'", () => {
    expect(returnPageName("/repositories")).toBe("Repositories");
  });

  it("should return 'Repository' if key is '/repository'", () => {
    expect(returnPageName("/repository")).toBe("Repository");
  });

  it("should return 'Repository - 1' if key is '/repository/1'", () => {
    expect(returnPageName("/repository/1")).toBe("Repository - 1");
  });
});
