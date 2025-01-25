const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getAllProfilePosts = async(req, res) => {
    const profileId = req.params.id;

    const posts = await prisma.post.findMany({
        where: {
            authorId: profileId
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true
                }
            },
            categories: true,
            content: true,
        }
    })

    res.status(200).json(posts)
}


const getForeignProfile = async(req, res) => {
    const profileId = req.params.id;

    try {
        const profile = await prisma.user.findUnique({
            where: {id: profileId},
            select: {
                id: true,
                name: true
            },
        })

        if(!profile){
            return res.status(404).json({ message: 'Profile not found.' });
        }


        res.json(profile)
    } catch (error) {

    }
}


const useFollowingProfile = async(req, res) => {
    const {profileIdForeign, profileId,} = req.body

    console.log(profileIdForeign)
    console.log(profileId)
}


const followProfile = async (req, res) => {
    const { userIdForeign, userId } = req.params;

    if (!userId || !userIdForeign) {
        return res.status(400).json({ message: 'Missing some required data.' });
    }

    try {
        if (userId === userIdForeign) {
            return res.status(400).json({ message: 'You cannot follow yourself.' });
        }

        const profileToFollow = await prisma.user.findUnique({
            where: { id: userIdForeign },
            select: { id: true, name: true },
        });

        if (!profileToFollow) {
            return res.status(404).json({ message: 'User to follow not found.' });
        }

        const existingFollow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: userIdForeign,
                },
            },
        });

        if (existingFollow) {
            return res.status(400).json({ message: 'You are already following this user.' });
        }

        await prisma.follow.create({
            data: {
                followerId: userId,
                followingId: userIdForeign,
            },
        });

        return res.status(201).json({ message: `User ${profileToFollow.name} is now followed.` });
    } catch (error) {
        console.error('Error in followProfile:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUsersListByAdmin = async (req, res) => {
    const profileId = req.params.userId;

    console.log(profileId);

    const userRole = await prisma.user.findUnique({
        where: { id: profileId },
        select: { role: true },
    })

    console.log(userRole)

    if (!userRole) {
        res.status(404).json({ message: 'not admin role...'})
    }

    try {
        const usersList = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            }
        })

        res.status(200).json(usersList)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'})
    }
}

const changeUserRole = async (req, res) =>{
    try {
        const profileId = req.params.userId;
        const role = req.body.role

        const updatedUser = await prisma.user.update({
            where: {
                id: profileId,
            },
            data: {
                role: role,
            }
        })

        if(updatedUser){
        res.status(200).json({message: 'user: ' + updatedUser.name + ' is updated'});
        } else {
        res.status(404).json({ message: 'user not found'});
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error'})
    }
}

module.exports = { getAllProfilePosts, getForeignProfile, followProfile, getUsersListByAdmin, changeUserRole };