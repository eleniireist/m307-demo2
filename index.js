import { createApp } from "./config.js";

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
  res.render("ordner", {});
});

/* Impressum */
app.get("/impressum", async function (req, res) {
  res.render("impressum", {});
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
