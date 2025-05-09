import dotenv from "dotenv";
import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";

dotenv.config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
});

afterEach(async () => {
  await mongoose.connection.close();
});
describe("users API", () => {
  describe("GET Method", () => {
    it("GET /users --> [] users", () => {
      return request(app)
        .get("/users")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(
            expect.objectContaining({
              code: 200,
              status: true,
              message: "Success",
              data: expect.arrayContaining([
                expect.objectContaining({
                  _id: expect.any(String),
                  email: expect.any(String),
                  username: expect.any(String),
                  todos: expect.any(Array),
                  __v: expect.any(Number),
                }),
              ]),
            })
          );
        });
    });
    it("GET /users/id --> specific todo by id", () => {
      return request(app)
        .get("/users/658fdf44113387074cc303f8")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(
            expect.objectContaining({
              code: 200,
              status: true,
              message: "Success",
              data: expect.objectContaining({
                _id: expect.any(String),
                email: expect.any(String),
                username: expect.any(String),
                todos: expect.any(Array),
                __v: expect.any(Number),
              }),
            })
          );
        });
    });
    it("GET /users/id --> 404 if not found", () => {
      return request(app).get("/users/9999").expect(404);
    });
    it("GET /users --> validates request body", () => {
      return request(app).post("/users").send({ email: 123 }).expect(422);
    });
  });
  describe("POST Method", () => {
    it("POST /users/id --> add todo", () => {
      return request(app)
        .post("/users/658fdf44113387074cc303f8")
        .send({ todos: ["658fdf49113387074cc303fa"] })
        .expect("Content-Type", /json/)
        .expect(201)
        .then((res) => {
          expect(res.body).toEqual(
            expect.objectContaining({
              code: 201,
              status: true,
              message: "Resource created succesfully",
              data: expect.any(Object),
            })
          );
        });
    });
    it("POST /users --> created todo", () => {
      return request(app)
        .post("/users")
        .send({ email: "test@mail.com", username: "test" })
        .expect("Content-Type", /json/)
        .expect(201)
        .then((res) => {
          expect(res.body).toEqual(
            expect.objectContaining({
              code: 201,
              status: true,
              message: "Resource created succesfully",
              data: expect.objectContaining({
                _id: expect.any(String),
                email: expect.any(String),
                username: expect.any(String),
                todos: expect.any(Array),
                __v: expect.any(Number),
              }),
            })
          );
        });
    });
  });
  describe("PATCH Method", () => {
    it("PATCH /users/id --> update specific todo by id", () => {
      return request(app)
        .patch("/users/658fdf44113387074cc303f8")
        .send({ name: "update value", completed: true })
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(
            expect.objectContaining({
              code: 200,
              status: true,
              message: "Success",
              data: expect.objectContaining({
                _id: expect.any(String),
                email: expect.any(String),
                username: expect.any(String),
                todos: expect.any(Array),
                __v: expect.any(Number),
              }),
            })
          );
        });
    });
    it("PATCH /users/id --> 404 if not found", () => {
      return request(app).patch("/users/123").expect(404);
    });
  });
  describe("DELETE Method", () => {
    it("DELETE /users/id --> remove specific todo by id", () => {
      return request(app)
        .delete("/users/658fa8beae9ba24c84395be3")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(
            expect.objectContaining({
              code: 200,
              status: true,
              message: "Success",
              data: expect.objectContaining({
                _id: expect.any(String),
                email: expect.any(String),
                username: expect.any(String),
                todos: expect.any(Array),
                __v: expect.any(Number),
              }),
            })
          );
        });
    });
    it("PATCH /users/id --> 404 if not found", () => {
      return request(app).patch("/users/123").expect(404);
    });
  });
});
