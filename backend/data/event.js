const { v4: generateId } = require('uuid')
const { readData, writeData } = require('../data/util')

const { NotFoundError } = require('../utils/errors')
async function getAll(){
    const storedData = await readData();
    if(!storedData){
        throw new NotFoundError('Could not find any posts');
    }
    return storedData
}

async function get(id) {
    const storedData = await readData();
    if (!storedData.posts || storedData.posts.length === 0) {
        throw new NotFoundError('Could not find any posts.');
    }

    const post = storedData.posts.find((ev) => ev.id === id);
    if (!post) {
        throw new NotFoundError('Could not find post for id ' + id);
    }

    return post;
}

async function getUser (id) {
    const storedData = await readData();
    if (!storedData.users || storedData.users.length === 0) {
        throw new NotFoundError('Could not find any user profile.');
    }

    const idStr = String(id);

    const user = storedData.users.find((ev) => ev.id === idStr);
    if (!user) {
        throw new NotFoundError('Could not find user for id ' + idStr);
    }

    return user;
}

async function add(data) {
    const storedData = await readData();
    storedData.posts.unshift({ ...data, id: generateId() });
    await writeData(storedData, 'users.json');
}


exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.getUser = getUser;