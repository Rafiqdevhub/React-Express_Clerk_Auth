import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import { createClerkClient } from "@clerk/backend";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

app.use(clerkMiddleware({ client: clerkClient }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Clerk Auth" });
});

app.get("/:userId/dashboard", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await clerkClient.users.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: `${user.username || "User not available"}'s dashboard`,
      userId: user.id,
      username: user.username || "Username not found",
      email: user.emailAddresses[0]?.emailAddress || "email not found",
    });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user data" });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
