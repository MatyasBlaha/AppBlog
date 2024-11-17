import {Link} from "react-router-dom";

export default function PostList({posts}) {

    return <>
        <div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={post.id}>
                            POST CARD
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <p>{post.author}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </>
}