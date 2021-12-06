import fs from "fs"
import path from "path"
import Layout from "@/components/Layout";
import Post from "@/components/Post"
import Pagination from "@/components/Pagination";
import CategoryList from "@/components/CategoryList";
import { getPosts } from "@/lib/post"
import { POSTS_PER_PAGE } from "@/config/index"

export default function BlogPage({ posts, numPages, currentPage, categories }) {
    return (
        <Layout>
            <div className="flex justify-between">
                <div className="w-3/4 mr-10">
                    <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {posts.map((post, i) => (
                            <Post key={i} post={post} />
                        ))}
                    </div>
                    <Pagination currentPage={currentPage} numPages={numPages} />
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

    const numPages = Math.ceil(files.length / POSTS_PER_PAGE)

    const paths = []

    for (let i = 1; i <= numPages; i++) {
        paths.push({
            params: { page_index: i.toString() }
        })
    }

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const page = parseInt((params && params.page_index) || 1)

    const files = fs.readdirSync(path.join("posts"))

    const posts = getPosts()

    const categories = [...new Set(posts.map(post => post.frontMatter.category))]

    const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
    const pageIndex = page - 1
    const orderedPosts = posts.slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)
    return {
        props: {
            posts: orderedPosts,
            numPages,
            currentPage: page,
            categories
        }
    }
}