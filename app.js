import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Vyntrix - A Subscription Tracker API!");
});

app.listen(3000, () => {
  console.log(
    "Vyntrix Subscription Tracker API is running on http://localhost:3000"
  );
});

export default app; 