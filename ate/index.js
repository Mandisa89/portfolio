import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import methodOverride from "method-override";

const app = express();
const port = process.env.PORT || 3000;

let posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/posts", (req, res) => {
  // Pass the posts array directly to the template
  res.render("posts.ejs", { posts });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (post) {
    res.render("clickedPost.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/submit", (req, res) => {
  const postSubject = req.body.postSubject;
  const postBody = req.body.postBody;

  const postId = uuidv4();

  posts.push({
    id: postId,
    subject: postSubject,
    body: postBody,
  });

  console.log(posts);

  // Redirect to /posts to prevent form resubmission
  res.redirect("/posts");
});

// Route to render the EDIT form
app.get("/posts/:id/edit", (req, res) => {
  const postId = req.params.id;
  const post = posts.find((p) => p.id === postId);

  if (post) {
    res.render("editPost.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

// Route to handle the UPDATE of the post
app.put("/posts/:id", (req, res) => {
  const postId = req.params.id;
  const post = posts.find((p) => p.id === postId);

  if (post) {
    // Update the post with new data
    post.subject = req.body.postSubject;
    post.body = req.body.postBody;

    // Redirect to the updated post's page or back to the main list
    res.redirect(`/posts/${postId}`);
  } else {
    res.status(404).send("Post not found");
  }
});

// DELETE POST route
app.delete("/posts/:id", (req, res) => {
  const postId = req.params.id;
  posts = posts.filter((post) => post.id !== postId);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
