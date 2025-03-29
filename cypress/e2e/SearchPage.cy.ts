describe("Crypto App homepage", () => {
  describe("Crypto App Home Page", () => {
    beforeEach(() => {
      cy.visit("/search?query=Wrapped%20Ether");
      cy.clearLocalStorage();
    });

    it("Should display some tokens which can be clicked", () => {
      cy.intercept("POST", "https://streaming.bitquery.io/graphql").as(
        "cryptoList"
      );
      cy.wait("@cryptoList").its("response.statusCode").should("eq", 200);
      cy.get("[aria-label='View details for Wrapped Ether (WETH)']").click();
      cy.url().should("include", "/token/wrapped%20ether?token=weth");
    });

    it("should show loading spinner when fetching data", () => {
      cy.get("[role='status']").should("exist");
    });
  });

  describe("Header", () => {
    beforeEach(() => {
      cy.clearLocalStorage();

      cy.visit("/search?query=Wrapped%20Ether");
    });

    it("should contain a logo with an aria-label", () => {
      cy.get("a[aria-label='Click to go to homepage']").should("be.visible");
    });
    it("should contain a logo with an aria-label", () => {
      cy.get("a[aria-label='Click to go to homepage']").click();
      cy.url().should("eq", "http://localhost:3000/");
    });

    it("should contain a title", () => {
      cy.contains("Search Results").should("be.visible");
    });

    it("should contain a button to toggle dark mode", () => {
      cy.get("button").should("be.visible").and("contain.text", "Dark Mode");
    });

    it("should toggle dark mode when clicked", () => {
      cy.contains("Dark Mode").click();
      cy.get("html").should("not.have.class", "dark");
    });
  });

  describe("Footer", () => {
    beforeEach(() => {
      cy.visit("/search?query=Wrapped%20Ether");
      cy.clearLocalStorage();
    });
    it("should contain GitHub, LinkedIn, and Personal Website links", () => {
      cy.get("a[aria-label='Visit my GitHub profile']")
        .should("be.visible")
        .and("have.attr", "href", "https://github.com/stephen447");

      cy.get("a[aria-label='Visit my LinkedIn Profile']")
        .should("be.visible")
        .and(
          "have.attr",
          "href",
          "https://www.linkedin.com/in/stephen-byrne-b4729321b/"
        );

      cy.get("a[aria-label='Visit my Personal Website']")
        .should("be.visible")
        .and("have.attr", "href", "https://stephenbyrne.onrender.com/");
    });

    it("should navigate to GitHub when clicked", () => {
      cy.get("a[aria-label='Visit my GitHub profile']")
        .invoke("removeAttr", "target") // Prevents Cypress from being blocked
        .click();

      cy.origin("https://github.com", () => {
        cy.url().should("include", "github.com/stephen447");
      });
    });

    it("should navigate to LinkedIn when clicked", () => {
      cy.get("a[aria-label='Visit my LinkedIn Profile']")
        .invoke("removeAttr", "target")
        .click();

      cy.origin("https://www.linkedin.com", () => {
        cy.url().should("include", "linkedin.com/in/stephen-byrne-b4729321b");
      });
    });

    it("should navigate to Personal Website when clicked", () => {
      cy.get("a[aria-label='Visit my Personal Website']")
        .invoke("removeAttr", "target")
        .click();

      cy.origin("https://stephenbyrne.onrender.com", () => {
        cy.url().should("include", "stephenbyrne.onrender.com");
      });
    });
  });
});
