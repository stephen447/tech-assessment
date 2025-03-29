describe("Crypto App Token Page", () => {
  describe("Crypto App Token Page", () => {
    beforeEach(() => {
      cy.visit("/token/wrapped%20ether?token=weth");
      cy.clearLocalStorage();
    });

    it("should contain a title with cryto name", () => {
      cy.contains("Wrapped Ether").should("be.visible");
    });
  });

  describe("Header", () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit("/token/wrapped%20ether?token=weth");
    });

    it("should contain a logo with an aria-label", () => {
      cy.get("a[aria-label='Click to go to homepage']").should("be.visible");
    });
    it("should contain a logo with an aria-label", () => {
      cy.get("a[aria-label='Click to go to homepage']").click();
      cy.url().should("eq", "http://localhost:3000/");
    });

    it("should contain a title", () => {
      cy.contains("Price History").should("be.visible");
    });

    it("should contain a button to toggle dark mode", () => {
      cy.get("button").should("be.visible").and("contain.text", "Dark Mode");
    });

    it("should toggle dark mode when clicked", () => {
      cy.contains("Dark Mode").click();
      cy.get("html").should("not.have.class", "dark");
    });
  });
});
