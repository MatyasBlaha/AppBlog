const { readData } = require('../data/util')

const { NotFoundError } = require('../utils/error')
async function getAll(){
    const storedData = await readData();
    if(!storedData.posts){
        throw new NotFoundError('Could not find any posts');
    }

    return storedData.posts
}

exports.getAll = getAll;