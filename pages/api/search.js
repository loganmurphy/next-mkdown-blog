import fs from "fs"
import path from "path"
import matter from "gray-matter"

export default function handler(req, res) {
  const search = req.query.q.toLowerCase()

  let posts
  if (process.env.NODE_ENV !== "production") {
    posts = require("../../cache/data").posts
  } else {
    const files = fs.readdirSync(path.join("cache", "posts"))
    posts = files.map(filename => {
      const markdownWithMeta = fs.readFileSync(path.join("posts", filename), "utf-8")
      const { data: frontMatter } = matter(markdownWithMeta)

      return {
        slug: filename.replace(".md", ""),
        frontMatter
      }
    })
  }

  const results = posts.filter(({ frontMatter: { title, excerpt, category } }) => title.toLowerCase().indexOf(search) !== -1 || excerpt.toLowerCase().indexOf(search) !== -1 || category.toLowerCase().indexOf(search) !== -1)

  res.status(200).json(JSON.stringify({ results }))
}
