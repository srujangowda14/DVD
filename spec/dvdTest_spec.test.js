let request = require("request");


const baseURL = "http://localhost:3035/dvds/";

console.log("Starting dvd_test.js");




describe("Test server for DVDs", () => {
  describe("GET /team", () => {
    it("returns Team Name & Members", (done) => {
      request.get(baseURL + "team", (err, resp, body) => {
        teamData = JSON.parse(body);
        expect(teamData.team).toBe("DVD Team");
        expect(teamData.membersNames[0]).toBe("Harish");
        expect(teamData.membersNames[1]).toBe("Srujan");
        expect(resp.statusCode).toBe(200);
        done();
      });
    });
  });

  describe("GET /negative test", () => {
    it("returns 404 status code", (done) => {
      request.get(baseURL + "error", (err, resp, body) => {
        expect(resp.statusCode).toBe(404);
        done();
      });
    });
  });

  

  describe("GET /all", () => {
    it("returns all the DVDs", (done) => {
      request.get(baseURL + "all", (err, resp, body) => {
        dvdData = JSON.parse(body);
        expect(dvdData[0].product_name).toBe("The Shawshank Redemption");
        expect(dvdData.length).toBeGreaterThan(0);
        done();
      });
    });
  });

 

  describe("GET /all/IN", () => {
    it("checks the tax percentage and product price in India", (done) => {
      request.get(baseURL + "all/IN", (err, resp, body) => {
        dvdData = JSON.parse(body);
        expect(dvdData[0].tax_percentage).toBe(18);
        expect(dvdData[0].price).toBe(17.7);
        done();
      });
    });
  });

  describe("GET /all/IE", () => {
    it("checks the tax percentage and product price in Ireland", (done) => {
      request.get(baseURL + "all/IE", (err, resp, body) => {
        dvdData = JSON.parse(body);
        expect(dvdData[0].tax_percentage).toBe(23);
        expect(dvdData[0].price).toBe(18.45);
        done();
      });
    });
  });

  describe("GET /all/US-NC", () => {
    it("checks the tax percentage and product price in North Carolina,US", (done) => {
      request.get(baseURL + "all/US-NC", (err, resp, body) => {
        dvdData = JSON.parse(body);
        expect(dvdData[0].tax_percentage).toBe(8);
        expect(dvdData[0].price).toBe(16.2);
        done();
      });
    });
  });

  describe("GET /all/search?", () => {
    it("checks the filters", (done) => {
      request.get(baseURL + "all/?minprice=16", (err, resp, body) => {
        dvdData = JSON.parse(body);
        expect(dvdData[0].product_name).toBe("The Godfather");
        expect(dvdData.length).toBeGreaterThan(0);
        done();
      });
    });
  });

  describe("GET /all/wrongCountry",()=>{
     it("returns a 400 error when there is a bad request",(done)=>{
      request.get(baseURL + "all/PK",(err,resp,body) => {
        expect(resp.statusCode).toBe(400);
        done();
      })
     })
  });

  
});
