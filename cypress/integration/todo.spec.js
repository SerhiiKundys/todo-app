describe("My First Test", () => {
  it("Adding new todo", () => {
    cy.visit("../../index.html");

    const TODO_NAME = "Do sports";

    // Click on "Add item to list" to show todo creator form
    cy.get("#list-header__add-todo").click();

    // Get an input, type into a todo name and verify that the value has been updated
    cy.get("#add-form__input-name")
      .type(TODO_NAME)
      .should("have.value", TODO_NAME);

    // Check if status is "enabled" by default
    cy.get("#add-form__enabled").should("have.checked", true);

    // Check if status is "disabled" after clicking on "disabled" radio button
    cy.get("#add-form__disabled").click().should("have.checked", true);

    // Click on confirm adding new todo
    cy.get("#add-form__confirm-btn").click();

    // Check if todo is added
    cy.get(".list").children().should("have.length", 1);

    // Check if there is an element with needed className
    cy.get(".list-item")
      .contains(TODO_NAME)
      .should("have.class", "list-item__name");
  });

  it("Edit todo", () => {
    const NEW_TODO_NAME = "Watch TV";

    // Click on "Edit todo"
    cy.get(".list-item__edit-icon").parent().click();

    // Check if modal-wrapper is not hidden now
    cy.get(".modal-wrapper").should("not.have.class", "hide");

    // Enter new todo name and check if it is changed
    cy.get("#edit-form__input-name")
      .clear()
      .type(NEW_TODO_NAME)
      .should("have.value", NEW_TODO_NAME);

    // Save todo
    cy.get("#edit-form__save-btn").click();

    // Check if new todo is present
    cy.get(".list-item")
      .contains(NEW_TODO_NAME)
      .should("have.class", "list-item__name");
  });

  it("Reset list", () => {
    // Click on "Reset list"
    cy.get("#list-header__reset-list").click();

    // List of todos should have length of 0
    cy.get(".list").children().should("have.length", 0);
  });
});
