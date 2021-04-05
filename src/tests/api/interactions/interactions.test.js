import { nanoid } from "nanoid";
import request from "../../supertest";
import { expectLoadingMessage, expectValidationError } from "./scenarios";

const expectedBodyShape = (body) => {
  expect(body).toEqual(
    expect.objectContaining({
      type: expect.any(Number),
      data: {
        content: expect.any(String),
      },
    })
  );
};

describe("/results", () => {
  describe("expect loading message", () => {
    test.concurrent.each(expectLoadingMessage)(
      "%s",
      (testName, payload, assertions = () => {}) => {
        return new Promise((resolve, reject) => {
          request
            .post("/interactions")
            .set(process.env.PODIUM_TEST_HEADER, process.env.PODIUM_TEST_SECRET)
            .send({ ...payload, id: `[JEST] ${nanoid()}` })
            .expect(200)
            .expect("Content-Type", /json/)
            .then((res) => {
              expectedBodyShape(res.body);
              expect(res.body.type).toEqual(5);
              expect(res.body.data.content).toMatch("Loading");
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

  describe("expect validation error", () => {
    test.concurrent.each(expectValidationError)(
      "%s",
      (testName, payload, assertions = () => {}) => {
        return new Promise((resolve, reject) => {
          request
            .post("/interactions")
            .set(process.env.PODIUM_TEST_HEADER, process.env.PODIUM_TEST_SECRET)
            .send({ ...payload, id: `[JEST] ${nanoid()}` })
            .expect(200)
            .expect("Content-Type", /json/)
            .then((res) => {
              expectedBodyShape(res.body);
              expect(res.body.type).toEqual(4);
              expect(res.body.data.content).toMatch(":x:");
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
});
