import { render, screen } from "@testing-library/react";
import { Logo } from "@/components/index";

describe("Logo", () => {
  beforeEach(() => {
    render(<Logo />);
  });
  test("renders the logo image", () => {
    const img = screen.getByAltText("logo");
    expect(img).toBeInTheDocument();
  });

  test("renders the BootCamp text", () => {
    const h2 = screen.getByText("BootCamp");
    expect(h2).toBeInTheDocument();
  });

  test("applies the correct CSS class to the container", () => {
    const container = screen.getByTestId("logo-container");
    expect(container).toHaveClass("logo");
  });
});
