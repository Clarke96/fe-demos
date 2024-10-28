import { ApiResponse, User } from "@models";
import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Custom error class
class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

// Request handlers
app.get("/", (req: Request, res: Response) => {
  const response: ApiResponse<null> = {
    success: true,
    message: "Welcome to the TypeScript server!",
  };
  res.json(response);
});

app.get("/users/:id", (req: Request<{ id: string }>, res: Response) => {
  const userId = req.params.id;
  const response: ApiResponse<{ userId: string; query: any }> = {
    success: true,
    message: "User fetched successfully",
    data: {
      userId,
      query: req.query,
    },
  };
  res.json(response);
});

app.post("/users", (req: Request<{}, {}, User>, res: Response) => {
  const userData: User = req.body;

  // Validate required fields
  if (!userData.name || !userData.email) {
    throw new ApiError(400, "Name and email are required");
  }

  const response: ApiResponse<User> = {
    success: true,
    message: "User created successfully",
    data: userData,
  };
  res.status(201).json(response);
});

app.put("/users/:id", (req: Request<{ id: string }, {}, Partial<User>>, res: Response) => {
  const userId = req.params.id;
  const updateData = req.body;

  const response: ApiResponse<{ userId: string; updates: Partial<User> }> = {
    success: true,
    message: "User updated successfully",
    data: {
      userId,
      updates: updateData,
    },
  };
  res.json(response);
});

app.delete("/users/:id", (req: Request<{ id: string }>, res: Response) => {
  const userId = req.params.id;
  const response: ApiResponse<{ userId: string }> = {
    success: true,
    message: "User deleted successfully",
    data: { userId },
  };
  res.json(response);
});

// Error handling middleware
const errorHandler = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
