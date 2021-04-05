import { nanoid } from "nanoid";
import request from "../../supertest";
import {
  expectSuccess,
  expectBadRequest,
  expectPartialSuccess,
} from "./scenarios";

const expectedBodyShape = (body) => {
  expect(body).toEqual(
    expect.objectContaining({
      results: expect.any(Array),
      errors: expect.any(Array),
    })
  );
};

describe("expect success", () => {
  test.concurrent.each(expectSuccess)(
    "%s",
    (testName, payload, assertions = () => {}) => {
      return new Promise((resolve, reject) => {
        request
          .post("/results")
          .send(payload)
          .send({ ...payload, id: `[JEST] ${nanoid()}` })
          .expect(200)
          .expect("Content-Type", /json/)
          .then((res) => {
            expectedBodyShape(res.body);
            expect(res.body.results).not.toHaveLength(0);
            expect(res.body.errors).toHaveLength(0);
            assertions(res);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  );
});

describe("expect partial success", () => {
  test.concurrent.each(expectPartialSuccess)(
    "%s",
    (testName, payload, assertions = () => {}) => {
      return new Promise((resolve, reject) => {
        request
          .post("/results")
          .send(payload)
          .send({ ...payload, id: `[JEST] ${nanoid()}` })
          .expect(200)
          .expect("Content-Type", /json/)
          .then((res) => {
            expectedBodyShape(res.body);
            expect(res.body.errors).not.toHaveLength(0);
            assertions(res);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  );
});

describe("expect bad request", () => {
  test.concurrent.each(expectBadRequest)(
    "%s",
    (testName, payload, assertions = () => {}) => {
      return new Promise((resolve, reject) => {
        request
          .post("/results")
          .send(payload)
          .send({ ...payload, id: `[JEST] ${nanoid()}` })
          .expect(400)
          .then((res) => {
            expect(res.body.results).toBeFalsy();
            expect(res.body.errors).not.toHaveLength(0);
            assertions(res);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  );
});
