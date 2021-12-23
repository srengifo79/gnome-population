import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { toMatchDiffSnapshot } from "snapshot-diff";

import SearchBar from "./SearchBar";

expect.extend({ toMatchDiffSnapshot });

afterEach(cleanup);

it("Initial snapshop", () => {
  const { asFragment } = render(<SearchBar onSearch={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

it("Input and search click", () => {
  const mockSearch = jest.fn();

  const { asFragment } = render(<SearchBar onSearch={mockSearch} />);

  const firstRender = asFragment();

  const textInput = screen.getByPlaceholderText("Search by name");
  const searchButton = screen.getByText("Search");

  fireEvent.change(textInput, { target: { value: "Testing..." } });
  fireEvent.click(searchButton);

  expect(mockSearch).toBeCalledWith("Testing...");
  expect(firstRender).toMatchDiffSnapshot(asFragment());
});
