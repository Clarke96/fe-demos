import { ApiResponse, User } from "@models";
import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

const app = express();
const port = 3000;

// Basic CORS setup
// THE ACRONYM CORS STANDS FOR CROSS-ORIGIN RESOURCE SHARING
const corsOptions = {
  origin: "http://localhost:4200", // Your Angular app URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400, // How long the results of a preflight request can be cached (in seconds)
};

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to enable CORS
app.use(cors(corsOptions));

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

// Get all users
app.get("/users", (req: Request, res: Response) => {
  const users: User[] = [
    { id: "1", name: "John Doe", email: "[email protected]" },
    { id: "2", name: "Jane Doe", email: "[email protected]" },
  ];

  const response: ApiResponse<User[]> = {
    success: true,
    message: "Users fetched successfully",
    data: users,
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

// Error handling for CORS preflight
app.options("*", cors(corsOptions));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
