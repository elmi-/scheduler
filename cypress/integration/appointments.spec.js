describe("appointments", () => {
  beforeEach(() => {
    // resets test database to make sure we can run test below
    cy.request("GET", "/api/debug/reset");
    // visits the root of our web server
    cy.visit("/");
    // selects dom elemnt that contains Monday
    cy.contains("[data-testid]", "Monday")
   });
  
   // BOOKING
   xit("should book an interview", () => {
    // clicks the "Add" button in the second appointment
    cy.get("[alt=Add]")
     .first()
     .click();
    // enters Lydia Miller-Jones as name
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    // chooses Sylvia Palmer as interviewer
    cy.get('[alt="Sylvia Palmer"]')
      .click();
    // clicks the save button
    cy.contains("Save")
      .click();
    // sees the booked appoinment to look for valid student and interviewer
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
   });

   // EDITING
   xit("should edit an interview", () => {
    cy.get("[alt=Edit]")
    .first()
    .click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
   });

  // CANCEL
   it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });
  
    cy.contains("Confirm").click();
  
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});
