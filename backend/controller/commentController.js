const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const addComment = async (req, res) => {
    const postId = req.params.id;
    const { content, parentId } = req.body
    const userId = req.userId;

    console.log(postId)


    try {
        const comment = await prisma.comment.create({
            data: {
                content: content,
                post: { connect: { id: postId } },
                author: { connect: { id: userId } },
                parent: parentId ? { connect: { id: parentId } } : undefined,
            },
            include: {
                author: true,
            },
        });

        res.status(201).json({comment});
    } catch(error){
        res.status(500).json({ error: 'could not create comment'})
    }
}

const  getComments = async (req, res) => {
    const postId = req.params.id;
    const { parentId, take = 10, skip = 0 } = req.query;

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { authorId: true },
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comments = await prisma.comment.findMany({
            where: {
                postId,
                parentId: parentId ? parentId : null,
            },
            take: take,
            skip: skip,
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        role: true
                    },
                },
            },
        });

        // Add isPostAuthor flag
        const commentsWithAuthorFlag = comments?.map((comment) => ({
            ...comment,
            isPostAuthor: comment.author.id === post.authorId,
        }));

        res.status(200).json(commentsWithAuthorFlag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteComment = async(req, res) => {
    const commentId = req.params.id;

    try {
        const deleteComment = await prisma.comment.delete({
            where: {
                id: commentId,
            },
        })

        if (!deleteComment){
            return res.status(404).json({ message: 'Comment Could not be deleted' });
        }

        return res.status(200).json({ message: 'Comment deleted'})
    } catch (error) {
        console.error('Error while deleting comment:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}


module.exports = {addComment, getComments, deleteComment}