import fs from "fs"
import path from "path"
import matter from 'gray-matter';
import Layout from "@/components/Layout"
import Post from "@/components/Post"
import CategoryList from "@/components/CategoryList";
import { getPosts } from "@/lib/post"

export default function CategoryBlogPage({ posts, category, categories }) {
    return (
        <Layout>
            <div className="flex justify-between">
                <div className="w-3/4 mr-10">
                    <h1 className="text-5xl border-b-4 p-5 font-bold">Posts in {category}</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {posts.map((post, i) => (
                            <Post key={i} post={post} />
                        ))}
                    </div>
                </div>
                <div className="w-1/4">
                    <CategoryList categories={categories} />
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join("posts"))

    const categories = files.map(filename => {
        const markdownWithMeta = fs.readFileSync(path.join("posts", filename), "utf-8")
        const { data: frontMatter } = matter(markdownWithMeta)

        return frontMatter.category.toLowerCase()
    })

    const paths = categories.map(category => ({
        params: {
            category_name: category
        }
    }))


    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: { category_name: category } }) {
    const posts = getPosts()
    const postsByCategory = posts.filter(post => post.frontMatter.category.toLowerCase() === category)

    const categories = [...new Set(posts.map(post => post.frontMatter.category))]

    return {
        props: {
            posts: postsByCategory,
            category: posts[0].frontMatter.category,
            categories,
        }
    }
}