import { fireEvent, render, screen } from "@testing-library/react";
import SidebarLink from "./SidebarLink";
import { PropsWithChildren } from "react";

jest.mock("next/navigation", () => ({
  usePathname() {
    return "localhost/repository/";
  },
}));

jest.mock("next/link", () => {
  return ({ children, href }: PropsWithChildren<{ href: string }>) => {
    return <a href={href}>{children}</a>;
  };
});

describe("SidebarLink", () => {
  test("renders the label passed as prop label", () => {
    render(
      <SidebarLink link="/" label="randomLabel" icon="User">
        <div>Child element</div>
      </SidebarLink>
    );
    const labelElement = screen.getByText("randomLabel");
    expect(labelElement).toBeInTheDocument();
  });

  test("has the correct alt text for icons", () => {
    render(
      <SidebarLink link="/" label="User" icon="User">
        <div>Child element</div>
      </SidebarLink>
    );
    const iconElement = screen.getByAltText("User icon");
    expect(iconElement).toBeInTheDocument();
  });

  test("renders label, down arrow, and child when it has children", () => {
    render(
      <SidebarLink link="/" label="User" icon="User">
        <div>Child element</div>
      </SidebarLink>
    );
    const labelElement = screen.getByText("User");
    const downArrowElement = screen.getByAltText("downarrow icon");
    const childElement = screen.getByText("Child element");
    expect(labelElement).toBeInTheDocument();
    expect(downArrowElement).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
  });

  test("does not render down arrow or child element when no children are passed", () => {
    render(<SidebarLink link="/" label="User" icon="User"></SidebarLink>);
    const labelElement = screen.getByText("User");
    const downArrowElement = screen.queryByAltText("downarrow icon");
    const childElement = screen.queryByText("Child element");
    expect(labelElement).toBeInTheDocument();
    expect(downArrowElement).not.toBeInTheDocument();
    expect(childElement).not.toBeInTheDocument();
  });

  test("passes the link prop to the Link component", () => {
    render(<SidebarLink link="/test" label="Test" icon="User" />);
    const linkElement = screen.getByText("Test").closest("a");
    expect(linkElement).toHaveAttribute("href", "/test");
  });
});
