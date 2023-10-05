import { render, screen } from "@testing-library/react";
import Table from "./Table";

const userMockData: UserState = {
  user1: {
    id: "user1",
    avatar_url: "https://example.com/avatar1.png",
    login: "user1",
    type: "user",
    html_url: "https://example.com/user1",
  },
  user2: {
    id: "user2",
    avatar_url: "https://example.com/avatar2.png",
    login: "user2",
    type: "user",
    html_url: "https://example.com/user2",
  },
  user3: {
    id: "user3",
    avatar_url: "https://example.com/avatar3.png",
    login: "user3",
    type: "organization",
    html_url: "https://example.com/user3",
  },
};

const repositoryMockData: RepositoryWithContributions = {
  id: "example-repo-id",
  ownerId: "example-owner-id",
  full_name: "example-owner/example-repo",
  description: "An example repository",
  html_url: "https://example.com/example-owner/example-repo",
  language: "JavaScript",
  stargazers_count: 10,
  contributions: [
    {
      login: "user1",
      userId: "randomUser1",
    },
    {
      login: "user2",
      userId: "randomUser2",
    },
    {
      login: "user3",
      userId: "randomUser3",
    },
    {
      login: "user4",
      userId: "randomUser4",
    },
    {
      login: "user5",
      userId: "randomUser5",
    },
  ],
};

describe("Table", () => {
  test("should render the correct number of cells for userMockdata", () => {
    const headers = ["Avatar", "Login", "Type"];
    render(<Table headers={headers} content={userMockData} />);
    const tableElement = screen.getByRole("table");
    const tableCells = screen.getAllByRole("cell");
    expect(tableElement).toBeInTheDocument();
    expect(tableCells.length).toBe(
      headers.length * Object.keys(userMockData).length
    );
    expect(tableCells.length).toBe(3 * 3);
  });
  test("should render the correct number of rows for userMockdata", () => {
    const headers = ["Avatar", "Login", "Type"];
    render(<Table headers={headers} content={userMockData} />);
    const tableElement = screen.getByRole("table");
    const tableRows = screen.getAllByRole("row");
    expect(tableElement).toBeInTheDocument();
    expect(tableRows.length).toBe(Object.keys(userMockData).length + 1);
    expect(tableRows.length).toBe(4);
  });

  test("should render the correct amount of rows for repositoryMockData", () => {
    const headers = ["UserId", "Login"];
    render(<Table headers={headers} content={repositoryMockData} />);
    const tableElement = screen.getByRole("table");
    const tableRows = screen.getAllByRole("row");
    expect(tableElement).toBeInTheDocument();
    expect(tableRows.length).toBe(
      repositoryMockData!.contributions!.length + 1
    );
    expect(tableRows.length).toBe(6);
  });

  test("should render the correct amount of cells for repositoryMockData", () => {
    const headers = ["UserId", "Login"];
    render(<Table headers={headers} content={repositoryMockData} />);
    const tableElement = screen.getByRole("table");
    const tableCells = screen.getAllByRole("cell");
    expect(tableElement).toBeInTheDocument();

    expect(tableCells.length).toBe(
      headers.length * repositoryMockData!.contributions!.length
    );
    expect(tableCells.length).toBe(2 * 5);
  });

  test("should render the correct user avatar if provided userMockData", () => {
    const headers = ["Avatar", "Login", "Type"];
    render(<Table headers={headers} content={userMockData} />);
    const user1Row = screen.getByText("user1").closest("tr");
    const avatarCell = user1Row!.querySelector("td:first-child");
    const avatarImage = avatarCell!.querySelector("img");
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fexample.com%2Favatar1.png&w=128&q=75"
    );
  });

  test("should render 2 user type users", () => {
    const headers = ["Avatar", "Login", "Type"];
    render(<Table headers={headers} content={userMockData} />);

    expect(screen.getAllByText("user").length).toBe(2);
  });

  test("should render 1 organization type user", () => {
    const headers = ["Avatar", "Login", "Type"];
    render(<Table headers={headers} content={userMockData} />);

    expect(screen.getAllByText("organization").length).toBe(1);
  });

  test("should render user1", () => {
    const headers = ["Avatar", "Login", "Type"];
    render(<Table headers={headers} content={userMockData} />);
    expect(screen.getByText("user1")).toBeInTheDocument();
  });

  test("should not render user avatar", () => {
    const headers = ["Contributor", "User ID"];
    render(<Table headers={headers} content={repositoryMockData} />);
    const user1Row = screen.getByText("user1").closest("tr");
    const avatarCell = user1Row!.querySelector("td:first-child");
    const avatarImage = avatarCell!.querySelector("img");
    expect(avatarImage).not.toBeInTheDocument();
  });

  test("should render user1 with randomuser1", () => {
    const headers = ["Contributor", "User ID"];
    render(<Table headers={headers} content={repositoryMockData} />);
    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("randomUser1")).toBeInTheDocument();
  });
});
