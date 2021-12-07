import Link from "next/link"
import Image from "next/image"
import CategoryLabel from "@/components/CategoryLabel";

export default function Post({ post, compact }) {
    return (
        <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
            {!compact && <Image src={post.frontMatter.cover_image} alt="" height={420} width={600} className="mb-4 rounded" />}
            <div className="flex justify-between items-center">
                <span className="font-light gray-600">
                    {post.frontMatter.date}
                </span>
                <div>
                    <CategoryLabel>
                        {post.frontMatter.category}
                    </CategoryLabel>
                </div>
            </div>
            <div className="mt-2">
                <Link href={`/blog/${post.slug}`}>
                    <a className="text-2xl text-gray-700 font-bold hover:underline">
                        {post.frontMatter.title}
                    </a>
                </Link>
                <p className="mt-2 text-gray-600">
                    {post.frontMatter.excerpt}
                </p>
            </div>
            {!compact && (
                <div className="flex justify-between item-center mt-6">
                    <Link href={`/blog/${post.slug}`}>
                        <a className="text-gray-900  hover:text-blue-600">
                            Read More
                        </a>
                    </Link>
                    <div className="flex items-center">
                        <img src={post.frontMatter.author_image} alt="author image" className="mx-4 w-10 object-cover rounded-full hidden sm:block" />
                        <h3 className="text-gray-700 font-bold">{post.frontMatter.author}</h3>
                    </div>
                </div>
            )}
        </div>
    )
}

Post.defaultProps = {
    compact: false
}
