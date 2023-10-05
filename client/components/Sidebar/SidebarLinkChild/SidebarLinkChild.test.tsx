import { render, screen } from "@testing-library/react";
import SidebarLinkChild from "./SidebarLinkChild";

describe("SidebarLinkChild", () => {
  beforeEach(() => {
    render(<SidebarLinkChild label="Home" />);
  });
  test("renders label correctly", () => {
    const label = screen.getByText("Home");
    expect(label).toBeInTheDocument();
  });

  test("renders union icon", () => {
    const icon = screen.getByAltText("union icon");
    expect(icon).toBeInTheDocument();
  });
});
