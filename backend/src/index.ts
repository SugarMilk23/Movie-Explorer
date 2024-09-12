import express, { Request, Response, NextFunction } from "express";
// import { process as gprocess } from "gremlin";
import { DataSource } from "typeorm";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mysql, { RowDataPacket } from "mysql2/promise";
const cors = require("cors");
import cookieParser from "cookie-parser";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
import { User } from "./entities/User";
import { Rating } from "./entities/Rating";
// import createJanusGraphConnection from "./janusgraphConnection";
// import createMySQLConnection from "./mysqlConnection";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://movie-explorer-j8p4.onrender.com", // Allow this origin
    credentials: true, // Enable credentials (cookies, authorization headers, TLS client certificates)
  })
);

// Create a connection to the database
const db = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Rating],
  synchronize: true,
  logging: true,
});

// Connect to the database
db.initialize()
  .then(() => {
    console.log("db has been initialized");
  })
  .catch((e) => {
    console.error(e);
  });
// let g: gprocess.GraphTraversalSource | null = null;
// let mysqlConn: mysql.Connection | null = null;
//
// async function ensureConnections(
// req: Request,
// res: Response,
// next: NextFunction
// ) {
// if (!g) {
// try {
// g = await createJanusGraphConnection();
// } catch (error) {
// return res.status(500).json({ error: "Failed to connect to JanusGraph" });
// }
// }
// if (!mysqlConn) {
// try {
// mysqlConn = await createMySQLConnection();
// } catch (error) {
// return res.status(500).json({ error: "Failed to connect to MySQL" });
// }
// }
// next();
// }
//
// app.use(ensureConnections);
//
// app.get("/janusgraph/vertex/:id", async (req: Request, res: Response) => {
// try {
// if (!g) throw new Error("No JanusGraph connection");
// const result = await g.V(req.params.id).valueMap(true).next();
// res.json(result.value);
// } catch (error) {
// res.status(500).json({ error: (error as Error).message });
// }
// });

interface AuthenticatedRequest extends Request {
  user?: jwt.JwtPayload;
}

const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "User unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    req.user = decoded;
    console.log("user authenticated");
    next();
  } catch (error) {
    console.error("Invalid token", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

app.get("/authenticate-user", authenticateUser, async (req, res) => {
  res.status(200).json({ message: "user authenticated" });
});

app.post("/sign-up", async (req, res) => {
  const { userName, email, password } = req.body;
  console.log(userName, email);
  try {
    const userRepo = db.getRepository(User);
    const isUserExists = await userRepo.findOne({
      where: { user_name: userName },
    });
    if (isUserExists) {
      return res.status(400).send("username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepo.create({
      user_name: userName,
      email: email,
      password: hashedPassword,
    });

    await userRepo.save(newUser);
    res.status(201).send("username : " + userName + "signed up successfully");
  } catch (err) {
    console.error("sign up failed", err);
    res.status(500).send("sign up failed");
  }
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const userRepo = db.getRepository(User);
    const isUserExists = await userRepo.findOne({
      where: { user_name: userName },
    });
    if (!isUserExists) {
      return res.status(401).send("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, isUserExists.password);

    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ userName: userName }, process.env.JWT_SECRET!, {
      expiresIn: "256h", // Token expires in 1 hour
    });
    res.cookie("token", token, {
      httpOnly: true, // This ensures the cookie cannot be accessed via client-side JavaScript
    });

    res.status(200).send("Login successful");
  } catch (e) {
    console.error(e);
    res.status(500).send("failed to login");
  }
});

app.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.status(200).send("Logout successful");
  } catch (e) {
    console.error(e);
    res.status(500).send("failed to logout");
  }
});

//rate
app.post("/rate", authenticateUser, async (req: AuthenticatedRequest, res) => {
  const { title, rating, movieId } = req.body;
  const userName = req.user?.userName;

  console.log("title : ", title, "rating : ", rating, "userName : ", userName);

  try {
    const ratingRepo = db.getRepository(Rating);
    const isRated = await ratingRepo.findOne({
      where: { title: title, movie_id: movieId, user: { user_name: userName } },
    });
    if (isRated) {
      isRated.rating = rating;
      await ratingRepo.save(isRated);
      return res.status(200).send("Rating updated successfully");
    } else {
      const newRating = ratingRepo.create({
        title: title,
        rating: rating,
        movie_id: movieId,
        user: { user_name: userName },
      });
      await ratingRepo.save(newRating);
      return res.status(200).send("Rating added successfully");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("failed to rate");
  }
});

//get rating for detail page
app.get(
  "/get-rating/:title",
  authenticateUser,
  async (req: AuthenticatedRequest, res) => {
    const userName = req.user?.userName;
    const title = req.params.title;

    try {
      const ratingRepo = db.getRepository(Rating);
      const rating = await ratingRepo.findOne({
        where: { title: title, user: { user_name: userName } },
      });

      if (!rating) {
        res.json({ rating: 0 });
      } else {
        res.json({ rating: rating.rating });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("failed to get rating");
    }
  }
);

app.get(
  "/rated-movies",
  authenticateUser,
  async (req: AuthenticatedRequest, res) => {
    const userName = req.user?.userName;

    try {
      const ratingRepo = db.getRepository(Rating);
      const ratings = await ratingRepo.find({
        where: { user: { user_name: userName } },
      });

      console.log(ratings);

      if (!ratings) {
        return res.status(404).send("No rated movies found");
      }

      res.status(200).json(ratings);
    } catch (e) {
      console.error(e);
      res.status(500).send("failed to get rated movies");
    }
  }
);

const PORT = 3100;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
