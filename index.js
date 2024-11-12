import { createApp, upload } from "./config.js";

const app = createApp({
  user: "blue_violet_3481",
  host: "bbz.cloud",
  database: "blue_violet_3481",
  password: "9fd698afb461ecd1a7c2b97f293be543",
  port: 30211,
});

/* Startseite (posts) */
app.get("/", async function (req, res) {
  const posts = await app.locals.pool.query(
    "select *, (select count(*) from likes where post_id = posts.id) as like_count, (select count(*) from comments where post_id = posts.id) as comment_count from posts"
  );
  res.render("start", { posts: posts.rows });
});

/* Ordner */
app.get("/ordner", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }

  res.render("ordner", {});
});

/* Impressum */
app.get("/impressum", async function (req, res) {
  res.render("impressum", {});
});

/*new post */
app.get("/new_post", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }
  res.render("new_post", {});
});

app.post("/create_post", upload.single("bild"), async function (req, res) {
  await app.locals.pool.query(
    "INSERT INTO posts (titel, text, bild, user_id) VALUES ($1, $2, $3, $4)",
    [req.body.titel, req.body.text, req.file.filename, req.session.userid]
  );
  res.redirect("/");
});

/*Adresse für Formular registrieren*/
app.get("/new_post", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }

  const posts = await app.locals.pool.query(
    "select *, (select count(*) from likes where post_id = posts.id) as like_count, (select count(*) from comments where post_id = posts.id) as comment_count from posts"
  );
  res.render("start", { posts: posts.rows });
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
