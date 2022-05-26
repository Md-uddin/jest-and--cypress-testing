const { v4: uuidv4 } = require("uuid");

describe("payment", () => {
  it("user can make payent", () => {
    //login
    cy.visit("/");
    cy.findByRole("textbox", { name: /username/i }).type("any");
    cy.findByLabelText(/password/i).type("any123");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /sign in/i }).click();
    //check account balance

    let oldBalance;
    cy.get('[data-test="sidenav-user-balance"]')
      .then(($balance) => (oldBalance = $balance.text()))
      .then((balance) => console.log(balance));
    //click on pay button

    cy.findByText(/new/i).click();
    // search amount and note and click pay
    cy.findByRole("textbox").type("devon bec");
    cy.findByText(/devon becker/i).click();

    //add amount and note and click pay
    const paymentAmout = 50;
    cy.findByPlaceholderText(/amount/i).type(paymentAmout);
    const note = uuidv4();
    cy.findByPlaceholderText(/add a note/i).type(note);
    cy.findByRole("button", { name: /pay/i }).click();

    //return to transactions

    cy.findByText(/return to transactions/i).click();
    // go to personal payments
    cy.findByRole("tab", { name: /mine/i }).click();

    //click on payments
    // cy.scrollIntoView(note);
    cy.findByText(note).click({ force: true });
    // verify if payment was made
    // cy.findByText(`-$${paymentAmout}`).should("be.visible");
    // cy.findByText(`-${note}`).should("be.visible");
    // verify if payment amount was deducted
    cy.get('[data-test="sidenav-user-balance"]').then(($balance) => {
      const convertedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ""));
      const convertedNewBalance = parseFloat($balance.replace(/\$|,/g, ""));
      expect(convertedOldBalance - convertedNewBalance).to.equal(parseFloat(paymentAmout));
    });
  });
});
