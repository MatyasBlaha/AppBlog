import {Link} from "react-router-dom";

export default function PostList({posts}) {

    console.log(posts)
    return <>
        <div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id} className='my-4'>
                        <Link to={`/posts/${post.id}`}>
                            <p>{post.createdAt}</p>
                            <p>{post.title}</p>
                            <p>{post.author.name}</p>
                            {post.content.map((content) => (
                                content.order === 1 && (
                                    <p key={content.id}>{content.content}</p>
                                )
                            ))}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </>
}