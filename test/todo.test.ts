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
describe("todos API", () => {
  describe("GET Method", () => {
    it("GET /todos --> [] todos", () => {
      return request(app)
        .get("/todos")
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
                  name: expect.any(String),
                  completed: expect.any(Boolean),
                  __v: expect.any(Number),
                }),
              ]),
            })
          );
        });
    });
    it("GET /todos/id --> specific todo by id", () => {
      return request(app)
        .get("/todos/658ed96f649daed55dfb1d36")
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
                name: expect.any(String),
                completed: expect.any(Boolean),
                __v: expect.any(Number),
              }),
            })
          );
        });
    });
    it("GET /todos/id --> 404 if not found", () => {
      return request(app).get("/todos/9999").expect(404);
    });
    it("GET /todos --> validates request body", () => {
      return request(app).post("/todos").send({ name: 123 }).expect(422);
    });
  });
  describe("POST Methos", () => {
    it("POST /todos --> created todo", () => {
      return request(app)
        .post("/todos")
        .send({ name: "study" })
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
                name: expect.any(String),
                completed: expect.any(Boolean),
                __v: expect.any(Number),
              }),
            })
          );
        });
    });
  });
  describe("PATCH Method", () => {
    it("PATCH /todos/id --> update specific todo by id", () => {
      return request(app)
        .patch("/todos/658ed96f649daed55dfb1d36")
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
                name: expect.any(String),
                completed: expect.any(Boolean),
                __v: expect.any(Number),
              }),
            })
          );
        });
    });
    it("PATCH /todos/id --> 404 if not found", () => {
      return request(app).patch("/todos/123").expect(404);
    });
  });
  describe("DELETE Method", () => {
    it("DELETE /todos/id --> remove specific todo by id", () => {
      return request(app)
        .delete("/todos/658ee6c4c0494c66ea4f010c")
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
                name: expect.any(String),
                completed: expect.any(Boolean),
                __v: expect.any(Number),
              }),
            })
          );
        });
    });
  });
});
