const chai = require("chai");
const expect = chai.expect;
const url = "http://localhost:5000";
const request = require("supertest")(url);

describe("Movie", () => {
  it("returns movie with id=1", done => {
    request
      .post("/graphql")
      .send({ query: "{ movie(id: 1) { id name year }}" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        let movie = res.body.data.movie;
        expect(movie).to.have.property("id");
        expect(movie).to.have.property("name");
        expect(movie).to.have.property("year");

        done();
      });
  });

  it("returns added movie", done => {
    let rndMovieId = Math.floor(Math.random() * 10 + 3);

    request
      .post("/graphql")
      .send({
        query: `mutation { 
                addMovie( 
                    input: {
                        id: ${rndMovieId},
                        name: "Movie ${rndMovieId}", 
                        year: ${2000 + rndMovieId}, 
                        directorId:${rndMovieId}
                    }
                ) 
                { id, name, year, directorId }
            }`
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        let addedMovie = res.body.data.addMovie;
        expect(addedMovie).to.have.property("id");
        expect(addedMovie).to.have.property("name");
        expect(addedMovie).to.have.property("year");

        expect(addedMovie.id).equal("" + rndMovieId);
        expect(addedMovie.name).equal("Movie " + rndMovieId);
        expect(addedMovie.year).equal(2000 + rndMovieId);
        expect(addedMovie.directorId).equal("" + rndMovieId);

        done();
      });
  });
});
