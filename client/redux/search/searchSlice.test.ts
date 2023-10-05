import { selectSearchQuery, setSearchQuery } from "./searchSlice";
import { makeStore } from "../store";

const newSearchQuery = "newSearchQuery";

describe("repoSlice", () => {
  const store = makeStore();

  it("should return an empty string if we select searchQuery before setting it", () => {
    const actual = selectSearchQuery(store.getState());
    expect(actual).toEqual("");
  });

  it("should set searchQuery properly even if we pass it an empty string", () => {
    store.dispatch(setSearchQuery(""));
    const actual = selectSearchQuery(store.getState());
    expect(actual).toEqual("");
  });

  it("should set searchQuery to 'test'", () => {
    store.dispatch(setSearchQuery("test"));
    const actual = selectSearchQuery(store.getState());
    expect(actual).toEqual("test");
  });
});
