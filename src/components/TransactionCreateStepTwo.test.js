import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

/////unit test
test("on initial render , the pay button is disabled", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "12" }} receiver={{ id: "13" }} />);

  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
  screen.debug();
});

test("if an amount and note is entered , the pay button is enabled", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "12" }} receiver={{ id: "13" }} />);

  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "new note");
  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
});

///////integration test (combined above two)
// test("if an amount and note is entered , the pay button is enabled", async () => {
//   render(<TransactionCreateStepTwo sender={{ id: "12" }} receiver={{ id: "13" }} />);

//   expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
//   userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
//   userEvent.type(screen.getByPlaceholderText(/add a note/i), "new note");
//   expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
// });
