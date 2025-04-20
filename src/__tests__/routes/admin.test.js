import request from "supertest";
import express from "express";
import router from "../../routes/admin.js";

const app = express();
app.use(express.json());
app.use("/", router);

afterAll(() => {
  app.close();
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzAxNzg5NDMsImRhdGEiOnsidXN1YXJpb19pZCI6IjU3NzliMzcxLTk1NTAtMTFlZi04YTBkLTAyNDJhYzEyMDAwMiIsIm5vbWJyZVVzdWFyaW8iOiJ0OTk5ODh2dm1tNyIsImNvbnRyYXNlw7FhIjoiNDhhOTRkMTdmZGMwMWRjMmM3YWY1NmEwYWRkZmFmYzgzMTRmMGMzODMxN2U0MDM4MWYyNDI0MjlhNzcwM2YyNyIsImVzdGFkbyI6ImFjdGl2byIsInJvbCI6IlByb2Zlc29yIiwiY29kaWdvIjoiNDc3NzIzNDIiLCJjb3JyZW8iOm51bGwsInRlbGVmb25vIjoiIiwibm9tYnJlIjoiZGZldHJlcmV3c2RmZnNkc2V3dyIsImFwZWxsaWRvIjoiZ2hyd3dkc2Zkc3NmcnJ0eXQiLCJpbnZlc3RpZ2Fkb3IiOjEsImVuY2FyZ2Fkb0VzY3VlbGEiOjF9LCJpYXQiOjE3MzAxNzUzNDN9.Hod7rENwT4dRkUhURZk_IPMn6o0_DoNqcf-37VxfM28";

describe("Admin Routes", () => {
  it("should create a new admin", async () => {
    const res = await request(app)
      .post("/")
      .send({
        nombreUsuario: "usuariox334",
        contraseña: "password123",
        estado: "activo",
        rol: "Administrador",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(201);
  }, 10000);

  it("should get all admins", async () => {
    const res = await request(app)
      .get("/")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  }, 10000);

  it("should get an admin by id", async () => {
    const res = await request(app)
      .get("/f548a154-95ad-11ef-8a0d-0242ac120002")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  }, 10000);

  it("should update an admin", async () => {
    const res = await request(app)
      .put("/f548a154-95ad-11ef-8a0d-0242ac120002")
      .send({
        contraseña: "12345678",
        estado: "activo",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  }, 10000);

  it("should delete an admin", async () => {
    const res = await request(app)
      .delete("/f548a154-95ad-11ef-8a0d-0242ac120002")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  }, 10000);
});
