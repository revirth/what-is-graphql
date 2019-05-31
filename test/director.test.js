const chai = require("chai");
const expect = chai.expect;
const url = "http://localhost:5000";
const request = require("supertest")(url);

describe("Director", () => {
  it("returns director with id=1", done => {
    request
      .post("/graphql")
      .send({ query: "{ director(id: 1) { id name age }}" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        let director = res.body.data.director;
        expect(director).to.have.property("id");
        expect(director).to.have.property("name");
        expect(director).to.have.property("age");

        done();
      });
  });

  it("returns director and his/her movies", done => {
    request
      .post("/graphql")
      .send({
        query: "{ director(id: 1) { id name age movies { id name year } }}"
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        let director = res.body.data.director;
        expect(director).to.have.property("id");
        expect(director).to.have.property("name");
        expect(director).to.have.property("age");
        expect(director).to.have.property("movies");

        let movies = res.body.data.director.movies;
        expect(movies).to.be.an("array");

        let firstMovie = movies[0];
        expect(firstMovie).to.have.property("id");
        expect(firstMovie).to.have.property("name");
        expect(firstMovie).to.have.property("year");

        done();
      });
  });

  it("returns added director", done => {
    let rndDirectorId = Math.floor(Math.random() * 10 + 4);

    request
      .post("/graphql")
      .send({
        query: `mutation { 
                addDirector( 
                    input: {
                        id: ${rndDirectorId},
                        name: "Director ${rndDirectorId}", 
                        age: ${30 + rndDirectorId}
                    }
                ) 
                { id, name, age, movies{ id } }
            }`
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        let addedDirector = res.body.data.addDirector;
        expect(addedDirector).to.have.property("id");
        expect(addedDirector).to.have.property("name");
        expect(addedDirector).to.have.property("age");
        expect(addedDirector).to.have.property("movies");

        expect(addedDirector.id).equal("" + rndDirectorId);
        expect(addedDirector.name).equal("Director " + rndDirectorId);
        expect(addedDirector.age).equal(30 + rndDirectorId);
        expect(addedDirector.movies).to.be.an("array");

        done();
      });
  });
});
