/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/server/index");
const { Videogames, conn } = require("../../src/services/db.service");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
  description: "The best videogame ever",
  released: "1985-09-13",
  rating: 5,
};

describe("Videogame routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Videogames.sync({ force: true }).then(() => Videogames.create(videogame))
  );
  describe("GET /videogames", () => {
    it("should get 200", () => agent.get("/videogames").expect(200));
  });
});
