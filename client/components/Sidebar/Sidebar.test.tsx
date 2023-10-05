import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";

jest.mock("next/navigation");

const renderSidebarForPathname = (pathname: string) => {
  jest
    .requireMock("next/navigation")
    .usePathname.mockReturnValue(`localhost${pathname}`);
  render(<Sidebar />);
};

describe("Sidebar", () => {
  test("renders the Repositories link with the correct props", () => {
    renderSidebarForPathname("/repository/facebook");
    //
    const repositoriesElement = screen.getByText("Repositories");
    const repositoriesLinkElement = repositoriesElement.closest("a");
    expect(repositoriesLinkElement).toBeInTheDocument();
    expect(repositoriesLinkElement).toHaveAttribute("href", "/repositories");
    expect(screen.getByAltText("Repositories icon")).toBeInTheDocument();
  });

  test("renders the User list link with the correct props", () => {
    renderSidebarForPathname("/repositories");
    const userListLinkElement = screen.getByText("User list");
    const userListLinkAnchorElement = userListLinkElement.closest("a");
    expect(userListLinkAnchorElement).toBeInTheDocument();
    expect(userListLinkAnchorElement).toHaveAttribute("href", "/user-list");
    expect(screen.getByAltText("User list icon")).toBeInTheDocument();
  });

  test("renders the Logo component", () => {
    renderSidebarForPathname("/repositories");
    const logoElement = screen.getByAltText("logo");
    expect(logoElement).toBeInTheDocument();
  });

  test("doesn't render contributions link when not on repository page", () => {
    renderSidebarForPathname("/user-list");
    const contributionsLinkElement = screen.queryByText("Contributions");
    expect(contributionsLinkElement).not.toBeInTheDocument();
    const downArrowElement = screen.queryByAltText("downarrow icon");
    expect(downArrowElement).not.toBeInTheDocument();
  });

  test("renders contributions link when on repository page", () => {
    renderSidebarForPathname("/repository/facebook");
    const contributionsLinkElement = screen.getByText("Contributions");
    expect(contributionsLinkElement).toBeInTheDocument();
    const downArrowElement = screen.getByAltText("downarrow icon");
    expect(downArrowElement).toBeInTheDocument();
  });
});
