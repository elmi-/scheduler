import React from "react";
import { render } from "@testing-library/react";

import Application from "components/Application";
describe("Appointment", () => {
  it("renders Application component without crashing", () => {
    render(<Application />);
  })
});