import { format } from "date-fns";

function PostItem({ post }) {
    const formattedDate = format(new Date(post.createdAt), 'MMM dd, HH:mm');
    const sortedContent = post.content.sort((a, b) => a.order - b.order)

    console.log(post)
    return (
        <>
            <p>{formattedDate}</p>
            <h1>{post.title}</h1>
            {sortedContent.map((contentItem) => (
                <div key={contentItem.order}>
                    {contentItem.type === 'text' && <p>{contentItem.content}</p>}
                    {contentItem.type === 'image' && <img src={`${contentItem.imageUrl}?f_auto,q_auto,w-auto`} alt={'post images'} style={{ maxHeight: '300px', width: 'auto' }} />}
                </div>
            ))}
        </>
    );
}

export default PostItem;