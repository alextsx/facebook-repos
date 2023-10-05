import { render, fireEvent, screen } from "@testing-library/react";
import RepositoryCard from "./RepositoryCard";
import { useRouter } from "next/navigation";

const mockRepository = {
  id: "example-repo-id",
  ownerId: "example-owner-id",
  full_name: "example-owner/example-repo",
  description: "An example repository",
  html_url: "https://example.com/example-owner/example-repo",
  language: "JavaScript",
  stargazers_count: 10,
};

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("RepositoryCard", () => {
  let pushSpy = { push: jest.fn() };
  beforeEach(() => {
    //@ts-ignore
    useRouter.mockReturnValue(pushSpy);
    render(
      <RepositoryCard repository={mockRepository} data-testid="repo-card" />
    );
  });

  afterEach(jest.clearAllMocks);

  it("renders repository name", () => {
    expect(
      screen.getByText(mockRepository.full_name.split("/")[1])
    ).toBeInTheDocument();
  });

  it("should render owner", () => {
    expect(
      screen.getByText(mockRepository.full_name.split("/")[0])
    ).toBeInTheDocument();
  });
  it("should render repository description", () => {
    expect(screen.getByText(mockRepository.description)).toBeInTheDocument();
  });

  it("should render repository language", () => {
    expect(screen.getByText(mockRepository.language)).toBeInTheDocument();
  });

  it("should render star count", () => {
    expect(
      screen.getByText(mockRepository.stargazers_count)
    ).toBeInTheDocument();
  });

  it("should navigate to repository page on click", () => {
    const repoCard = screen.getByTestId("repo-card");

    fireEvent.click(repoCard);

    expect(useRouter().push).toHaveBeenCalledWith(
      `/repository/${mockRepository.full_name}`
    );
  });
});
