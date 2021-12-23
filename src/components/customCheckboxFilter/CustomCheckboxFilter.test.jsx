import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { toMatchDiffSnapshot } from "snapshot-diff";

import { filterMock } from "../../mocks/filterMocks";

import CustomCheckboxFilter from "./CustomCheckboxFilter";

expect.extend({ toMatchDiffSnapshot });

afterEach(cleanup);

it("Initial snapshop", () => {
  const { asFragment } = render(
    <CustomCheckboxFilter
      name="Professions"
      filterList={filterMock.professions}
      onCheck={() => {}}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Check and uncheck checkbox", () => {
  const mockOnCheck = jest.fn();
  const { asFragment } = render(
    <CustomCheckboxFilter
      name="Professions"
      filterList={filterMock.professions}
      onCheck={mockOnCheck}
    />
  );
  const initialRender = asFragment();

  const checkbox = screen.getAllByTestId("checkboxes")[0].childNodes[0];
  fireEvent.click(checkbox);

  expect(mockOnCheck).toBeCalledWith([" Tinker"]);
  expect(initialRender).toMatchDiffSnapshot(asFragment());

  fireEvent.click(checkbox);

  expect(mockOnCheck).toBeCalledWith([]);
  expect(initialRender).toMatchDiffSnapshot(asFragment());
});
