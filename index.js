import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";

env.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 2000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({ 
  secret: process.env.SESSION_SECRET || "your_secret_key",
  resave: false, 
  saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());

const dbConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
};

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { isAuthenticated: req.isAuthenticated() });
});

app.get("/login", (req, res) => {
    res.render("login", { isAuthenticated: req.isAuthenticated() });
});

app.get("/aboutus.ejs", (req, res) => {
    res.render("aboutus", { isAuthenticated: req.isAuthenticated() });
});

app.get("/services.ejs", (req, res) => {
    res.render("services", { isAuthenticated: req.isAuthenticated() });
});

app.get("/contectus.ejs", (req, res) => {
    res.render("contectus", { isAuthenticated: req.isAuthenticated() });
});

app.get("/sanjay.ejs", (req, res) => {
    res.render("sanjay", { isAuthenticated: req.isAuthenticated() });
});

app.get("/prashant.ejs", (req, res) => {
    res.render("prashant", { isAuthenticated: req.isAuthenticated() });
});

app.get("/varsha.ejs", (req, res) => {
    res.render("varsha", { isAuthenticated: req.isAuthenticated() });
});

app.get("/project.ejs", (req, res) => {
    res.render("project", { isAuthenticated: req.isAuthenticated() });
});

app.get("/logout", (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/log/sign", passport.authenticate("google", {
    successRedirect: "/contectus.ejs",
    failureRedirect: "/login",
}));

passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://node-9bj2.onrender.com/auth/log/sign",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      async (accessToken, refreshToken, profile, cb) => {
        const db = new pg.Client(dbConfig);
        await db.connect();
        try {
          const result = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
          if (result.rows.length === 0) {
            const newUser = await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [profile.email, "google"]);
            await db.end();
            return cb(null, newUser.rows[0]);
          } else {
            await db.end();
            return cb(null, result.rows[0]);
          }
        } catch (err) {
          await db.end();
          return cb(err);
        }
      }
    )
);

app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
    const { name, phone, city, project_name } = req.body;
    const userId = req.user.id;
    const userEmail = req.user.email;
    const db = new pg.Client(dbConfig);
    await db.connect();
    try {
        const query = 'INSERT INTO user_info (user_id, name, email, phone, city, project_name) VALUES ($1, $2, $3, $4, $5, $6)';
        await db.query(query, [userId, name, userEmail, phone, city, project_name]);
        await db.end();
        res.json({ message: 'User data stored successfully!' });
    } catch (err) {
        await db.end();
        console.error('Error inserting user data:', err);
        res.status(500).json({ message: 'Error storing user data' });
    }
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated() && req.user.email === process.env.ALLOWED_EMAIL) {
      return next();
    }
    res.redirect("/login");
}

app.get('/user-data', async (req, res) => {
    const userEmail = req.user.email;
    const db = new pg.Client(dbConfig);
    await db.connect();
    try {
        const query = 'SELECT * FROM user_info WHERE email = $1';
        const result = await db.query(query, [userEmail]);
        await db.end();
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).json({ message: 'No data found for this user' });
        }
    } catch (err) {
        await db.end();
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

app.get("/user-info", checkAuthenticated, async (req, res) => {
    const { status } = req.query;
    const db = new pg.Client(dbConfig);
    await db.connect();
    try {
        let query = "SELECT * FROM user_info";
        let queryParams = [];
        if (status) {
            query += " WHERE status = $1";
            queryParams.push(status);
        }
        query += " ORDER BY id DESC";
        const result = await db.query(query, queryParams);
        await db.end();
        const userInfo = result.rows;
        res.render("user-info", { 
            userInfo, 
            status, 
            isAuthenticated: req.isAuthenticated(),
            userEmail: req.user.email,
            allowedEmail: process.env.ALLOWED_EMAIL
        });
    } catch (err) {
        await db.end();
        console.error("Error fetching user info:", err);
        res.status(500).send("Error fetching user info");
    }
});

app.post("/toggle-status/:id", async (req, res) => {
    const userId = req.params.id;
    const db = new pg.Client(dbConfig);
    await db.connect();
    try {
        const result = await db.query("SELECT status FROM user_info WHERE id = $1", [userId]);
        const currentStatus = result.rows[0].status;
        const newStatus = currentStatus === "queue" ? "visited" : "queue";
        await db.query("UPDATE user_info SET status = $1 WHERE id = $2", [newStatus, userId]);
        await db.end();
        res.redirect("/user-info");
    } catch (err) {
        await db.end();
        console.error("Error toggling status:", err);
        res.status(500).send("Error toggling status");
    }
});

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
