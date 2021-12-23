import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { toMatchDiffSnapshot } from "snapshot-diff";

import CustomSlider from "./CustomSlider";

expect.extend({ toMatchDiffSnapshot });

afterEach(cleanup);

it("Initial snapshop", () => {
  const { asFragment } = render(
    <CustomSlider name="Age" range={[0, 20]} onSlide={() => {}} />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Move slide snapshot", () => {
  const mockOnSlide = jest.fn();
  const { asFragment } = render(
    <CustomSlider name="Age" range={[0, 20]} onSlide={mockOnSlide} />
  );

  const initalRender = asFragment();

  const endSlider = screen.getByDisplayValue("20");
  fireEvent.change(endSlider, { target: { value: "10" } });

  expect(endSlider.getAttribute("value")).toBe("10");
  expect(mockOnSlide).toBeCalledWith([0, 10]);
  expect(initalRender).toMatchDiffSnapshot(asFragment());
});
