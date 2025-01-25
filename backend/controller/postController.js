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
        console.log(posts)
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPost = async(req, res) => {
    const postId = req.params.id;
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

        console.log(post)
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

    console.log(req.body)

    if (!title || !content || !categories) {
        return res.status(400).json({ error: "Missing required fields" });
    }


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



module.exports = {getAllPosts, getPost, addPost}