import { selectUsers, setUsers, selectUserByFullName } from "./userSlice";
import { makeStore } from "../store";
const userRecords = {
  "051a5147-8291-4766-a352-d1c27f49fe1c": {
    id: "051a5147-8291-4766-a352-d1c27f49fe1c",
    login: "stuclar",
    avatar_url: "https://avatars.githubusercontent.com/u/7219951?v=4",
    html_url: "https://github.com/stuclar",
    type: "User",
  },
  "e9cadb97-5927-4950-99a2-918d7abf26ad": {
    id: "e9cadb97-5927-4950-99a2-918d7abf26ad",
    login: "andriigrynenko",
    avatar_url: "https://avatars.githubusercontent.com/u/7255704?v=4",
    html_url: "https://github.com/andriigrynenko",
    type: "User",
  },
  "8f4dc2a7-41ef-4843-9cf3-58717dc8c3fc": {
    id: "8f4dc2a7-41ef-4843-9cf3-58717dc8c3fc",
    login: "sarangbh",
    avatar_url: "https://avatars.githubusercontent.com/u/1613428?v=4",
    html_url: "https://github.com/sarangbh",
    type: "User",
  },
  "6e4b857a-7a00-4fd4-b7c6-ba3541ce0423": {
    id: "6e4b857a-7a00-4fd4-b7c6-ba3541ce0423",
    login: "chadaustin",
    avatar_url: "https://avatars.githubusercontent.com/u/59987?v=4",
    html_url: "https://github.com/chadaustin",
    type: "User",
  },
  "8612f5fd-25e0-4db3-ac97-33668d86d229": {
    id: "8612f5fd-25e0-4db3-ac97-33668d86d229",
    login: "stcheng",
    avatar_url: "https://avatars.githubusercontent.com/u/2702699?v=4",
    html_url: "https://github.com/stcheng",
    type: "User",
  },
};
describe("repoSlice", () => {
  const store = makeStore();

  it("should return an empty users if we select repos before setting them", () => {
    const actual = selectUsers(store.getState());
    expect(actual).toEqual({});
  });

  it("should set users correctly even if we pass it an empty object", () => {
    store.dispatch(setUsers({}));
    const actual = selectUsers(store.getState());
    expect(actual).toEqual({});
  });

  it("should set users correctly", () => {
    store.dispatch(setUsers(userRecords));
    const actual = selectUsers(store.getState());
    expect(actual).toEqual(userRecords);
  });

  it("should return an empty array if the user is not found", () => {
    const actual = selectUserByFullName(store.getState(), "notFound");
    expect(actual).toEqual([]);
  });
  it("should return the right user if we search by username", () => {
    const id = "e9cadb97-5927-4950-99a2-918d7abf26ad";
    const actual = selectUserByFullName(store.getState(), id);
    expect(actual).toEqual(userRecords[id]);
  });
});
