const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const getAllPosts = async(req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true},
            include: {
                author: {
                  select: {
                      id: true,
                      name: true
                  }
                },
                categories: true,
                content: true
            }
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPost = async(req, res) => {
    const postId = parseInt(req.params.id);
    const { repliesPerPage = 5 } =req.query

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                categories: true,
                content: true,
                likes: true
            }
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addPost = async(req, res) => {
    const {
        title,
        content,
        published,
        categories
    } = req.body
    const userId = req.userId;

    console.log(`User ID: ${userId}`);
    console.log(`Title: ${title}`);
    console.log(`Content: ${JSON.stringify(content)}`);
    console.log(`Categories: ${JSON.stringify(categories)}`);
    console.log(`Published: ${published}`);

    try{
        const authorExists = await prisma.user.findUnique({
            where: {id: userId}
        });

        if(!authorExists){
            return res.status(404).json({ message: 'Author not found.' });
        }

        const categoryNames = await Promise.all(
            categories.map(async (name) => {
                let category = await prisma.category.findUnique({
                    where: { name },
                });

                if (!category) {
                    category = await prisma.category.create({
                        data: { name },
                    });
                }
                return category;
            })
        );


        const post = await prisma.post.create({
            data: {
                title,
                published: published || false,
                author: { connect: {id: userId}},
                categories: {
                    connect: categoryNames.map((category) => ({id: category.id}))
                },
            },
            include: {
                author: true,
                categories: true
            }
        });

        await Promise.all(
            content.map(async (section) => {
                console.log(section)
                await prisma.content.create({
                    data: {
                        type: section.type,
                        content: section.content || null,
                        imageUrl: section.imageUrl || null,
                        order: section.order,
                        post: {connect: { id: post.id}},
                    },
                })
            })
        )

        res.status(201).json(post);
    } catch(error){
        res.status(500).json({ error: error.message})
    }
}

const addComment = async (req, res) => {
    const postId = parseInt(req.params.id)
    const { content, parentId } = req.body
    const userId = req.userId;


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

        res.status(201).json(comment);
    } catch(error){
        res.status(500).json({ error: error.message})
    }
}

const getComments = async (req, res) => {
    const postId = parseInt(req.params.id);
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
                parentId: parentId ? parseInt(parentId) : null,
            },
            take: parseInt(take),
            skip: parseInt(skip),
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        // Add isPostAuthor flag
        const commentsWithAuthorFlag = comments.map((comment) => ({
            ...comment,
            isPostAuthor: comment.author.id === post.authorId,
        }));

        res.status(200).json(commentsWithAuthorFlag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {getAllPosts, getPost, addPost, addComment, getComments}