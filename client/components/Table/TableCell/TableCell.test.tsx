import { render, screen } from "@testing-library/react";
import TableCell from "./TableCell";

describe("TableCell", () => {
  beforeEach(() => {
    render(
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <TableCell>Test</TableCell>
          </tr>
        </tbody>
      </table>
    );
  });
  test("renders the children", () => {
    const cell = screen.getByText("Test");
    expect(cell).toBeInTheDocument();
  });

  test("applies the correct CSS class to the cell", () => {
    const cell = screen.getByText("Test");
    expect(cell).toHaveClass("td");
  });
});
