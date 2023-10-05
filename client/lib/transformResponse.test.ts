import transformResponse from "./transformResponse";

const userResponse: User[] = [
  {
    id: "2f9a7f3a-6ff1-4ed8-a3af-22438bdb4890",
    login: "alexeyt",
    avatar_url: "https://avatars.githubusercontent.com/u/727402?v=4",
    html_url: "https://github.com/alexeyt",
    type: "User",
  },
  {
    id: "98052075-fc9a-4998-b0b2-73a4110dd67d",
    login: "Wilfred",
    avatar_url: "https://avatars.githubusercontent.com/u/70800?v=4",
    html_url: "https://github.com/Wilfred",
    type: "User",
  },
  {
    id: "5f14bc94-1f0f-4006-8a25-90ec3018fb51",
    login: "CatherineGasnier",
    avatar_url: "https://avatars.githubusercontent.com/u/20106734?v=4",
    html_url: "https://github.com/CatherineGasnier",
    type: "User",
  },
  {
    id: "5e92eac0-b40d-4e10-b4c1-4cacac6f312a",
    login: "binliu19",
    avatar_url: "https://avatars.githubusercontent.com/u/11066845?v=4",
    html_url: "https://github.com/binliu19",
    type: "User",
  },
  {
    id: "e8da2647-6d0b-4bd1-a0f0-075856eaca42",
    login: "ericlippert",
    avatar_url: "https://avatars.githubusercontent.com/u/9200228?v=4",
    html_url: "https://github.com/ericlippert",
    type: "User",
  },
  {
    id: "e9821d3c-688a-415a-a305-4fc1b53fdc50",
    login: "alexmalyshev",
    avatar_url: "https://avatars.githubusercontent.com/u/621989?v=4",
    html_url: "https://github.com/alexmalyshev",
    type: "User",
  },
  {
    id: "4a9f2e38-2b38-4bd7-a19b-28630876ae1b",
    login: "jamesjwu",
    avatar_url: "https://avatars.githubusercontent.com/u/4811293?v=4",
    html_url: "https://github.com/jamesjwu",
    type: "User",
  },
  {
    id: "819d6457-4413-4892-8501-d54211249c9f",
    login: "vsiles",
    avatar_url: "https://avatars.githubusercontent.com/u/7124672?v=4",
    html_url: "https://github.com/vsiles",
    type: "User",
  },
  {
    id: "16409ad9-fbaa-45a3-b492-734869adf92b",
    login: "gcweir",
    avatar_url: "https://avatars.githubusercontent.com/u/4493689?v=4",
    html_url: "https://github.com/gcweir",
    type: "User",
  },
  {
    id: "dcec964e-20af-4bf8-bfb4-7ac6181fc47d",
    login: "shiqicao",
    avatar_url: "https://avatars.githubusercontent.com/u/3378282?v=4",
    html_url: "https://github.com/shiqicao",
    type: "User",
  },
  {
    id: "8f4dc2a7-41ef-4843-9cf3-58717dc8c3fc",
    login: "sarangbh",
    avatar_url: "https://avatars.githubusercontent.com/u/1613428?v=4",
    html_url: "https://github.com/sarangbh",
    type: "User",
  },
  {
    id: "6e4b857a-7a00-4fd4-b7c6-ba3541ce0423",
    login: "chadaustin",
    avatar_url: "https://avatars.githubusercontent.com/u/59987?v=4",
    html_url: "https://github.com/chadaustin",
    type: "User",
  },
  {
    id: "8612f5fd-25e0-4db3-ac97-33668d86d229",
    login: "stcheng",
    avatar_url: "https://avatars.githubusercontent.com/u/2702699?v=4",
    html_url: "https://github.com/stcheng",
    type: "User",
  },
];

const repositoryResponse: Repository[][] = [
  [
    {
      id: "c1ec1a9c-af0a-4266-872e-9008dc701e03",
      ownerId: "234dabf6-f6f8-450a-a5b6-f66864fde92e",
      full_name: "facebook/react",
      description: "The library for web and native user interfaces",
      html_url: "https://github.com/facebook/react",
      language: "JavaScript",
      stargazers_count: 210197,
    },
    {
      id: "e9a3698f-b98a-4fed-8be2-868185a8ded6",
      ownerId: "234dabf6-f6f8-450a-a5b6-f66864fde92e",
      full_name: "facebook/regenerator",
      description:
        "Source transformer enabling ECMAScript 6 generator functions in JavaScript-of-today.",
      html_url: "https://github.com/facebook/regenerator",
      language: "JavaScript",
      stargazers_count: 3763,
    },
  ],
];

describe("Testing api response transformations", () => {
  it("should return a UserState type object with the id as the key", () => {
    const transformedResponse = transformResponse<User>("id")(userResponse);
    expect(transformedResponse).toHaveProperty(
      "2f9a7f3a-6ff1-4ed8-a3af-22438bdb4890"
    );
  });

  it("should throw an error if the key is not present in the response", () => {
    expect(() =>
      transformResponse<User>("notPresent" as keyof User)(userResponse)
    ).toThrow("Key notPresent not present in response");
  });

  it("should return an empty object if the response is empty", () => {
    expect(transformResponse<User>("id")([])).toEqual({});
  });

  it("should return an empty object if the response is undefined", () => {
    expect(transformResponse<User>("id")(undefined)).toEqual({});
  });

  it("should return an empty object if the response is null", () => {
    expect(transformResponse<User>("id")(null)).toEqual({});
  });

  it("should return a RepositoryState type object with the id as the key", () => {
    const transformedResponse =
      transformResponse<Repository>("id")(repositoryResponse);
    expect(transformedResponse).toHaveProperty(
      "c1ec1a9c-af0a-4266-872e-9008dc701e03"
    );
  });
});
