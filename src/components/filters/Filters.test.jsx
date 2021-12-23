import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { toMatchDiffSnapshot } from "snapshot-diff";

import { filterMock } from "../../mocks/filterMocks";

import Filters from "./Filters";

expect.extend({ toMatchDiffSnapshot });

afterEach(cleanup);

it("Initial snapshop", () => {
  const { asFragment } = render(
    <Filters {...filterMock} onFilter={() => {}} />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Check and uncheck filter", () => {
  const mockOnFilter = jest.fn();
  const { asFragment } = render(
    <Filters {...filterMock} onFilter={mockOnFilter} />
  );
  const initialRender = asFragment();

  const checkbox = screen.getAllByTestId("profCheckbox")[0].childNodes[0];
  fireEvent.click(checkbox);

  expect(mockOnFilter).toBeCalledWith([" Tinker"], "professions");
  expect(initialRender).toMatchDiffSnapshot(asFragment());

  fireEvent.click(checkbox);

  expect(mockOnFilter).toBeCalledWith([], "professions");
  expect(initialRender).toMatchDiffSnapshot(asFragment());
});
