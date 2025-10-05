import orchestrador from "../orchestrador";

beforeAll(async () => {
  await orchestrador.waitForAllServices();
});

test("Get to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  expect(new Date(responseBody.updated_at).toISOString()).toEqual(
    responseBody.updated_at
  );
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.oppened_connections).toEqual(1);
});
