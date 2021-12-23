import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { toMatchDiffSnapshot } from "snapshot-diff";

import ListItem from "./ListItem";
import { gnomesDataResponseMock } from "../../mocks/apiMocks";

expect.extend({ toMatchDiffSnapshot });

afterEach(cleanup);

it("Initial snapshop", () => {
  const { asFragment } = render(
    <ListItem {...gnomesDataResponseMock.Brastlewark[0]} />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Expanded snapshot", () => {
  const { asFragment } = render(
    <ListItem {...gnomesDataResponseMock.Brastlewark[0]} collapsable={true} />
  );
  const initalRender = asFragment();
  const listItemElement = screen.getByTestId("listItemContainer");

  fireEvent.click(listItemElement);

  expect(initalRender).toMatchDiffSnapshot(asFragment());
});
