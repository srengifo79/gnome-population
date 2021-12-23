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
