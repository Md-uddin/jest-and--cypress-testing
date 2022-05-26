///whenever testing out do oposite first ex:if testing a button is disabled do enabled first

////////////////
the patter i have used in TransactionCreateStepTwo is
-arrange
-act
-exertion

now for end to end testing
-install
yarn add cypress @cypress/react @testing-library/cypress

then initailize

npx cypress open

//to add testing-library features
got to cypress/support/command.js
and add
import "@testing-library/cypress";

or
import "@testing-library/cypress/add-commands";
//now to write tests
got to cypress/integration and
create a file .js

now plan what and how to test;

-install chrome ext : testing playground
