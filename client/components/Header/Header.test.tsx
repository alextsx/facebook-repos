import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import ReduxProvider from "../ReduxProvider";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));
jest.mock("@/hooks/usePopulateData", () => ({
  usePopulateData: jest.fn(() => ({
    isError: false,
    isLoading: false,
  })),
}));
jest.mock("@/hooks/useSearch", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    setGlobalSearchQuery: jest.fn(),
    setLocalSearchQuery: jest.fn(),
    localSearchQuery: "testtest",
    isSearchLoading: false,
  })),
}));

describe("Header", () => {
  let setGlobalSearchQuerySpy = jest.fn();

  beforeEach(() => {
    let router = { push: jest.fn() };
    //@ts-ignore
    useRouter.mockReturnValue(router);
    jest
      .requireMock("next/navigation")
      .usePathname.mockReturnValue(`localhost/repositories`);

    jest.requireMock("@/hooks/useSearch").default.mockReturnValue({
      setGlobalSearchQuery: setGlobalSearchQuerySpy,
      setLocalSearchQuery: jest.fn(),
    });
    render(
      <ReduxProvider>
        <Header />
      </ReduxProvider>
    );
  });
  it("should call usePathname hook", () => {
    expect(jest.requireMock("next/navigation").usePathname).toHaveBeenCalled();
  });
  it("should get the page names right", () => {
    const h1 = screen.getByText("Repositories");
    expect(h1).toBeInTheDocument();
  });

  it("should have an input field ", () => {
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });
  it("should have an image", () => {
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });

  it("should call a router push on input focus and enter", () => {
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter", keyCode: 13 });
    expect(useRouter().push).toHaveBeenCalled();
  });
});
