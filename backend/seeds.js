// seeds.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const predefinedCategories = [
    { name: 'Technology' },
    { name: 'Health' },
    { name: 'Lifestyle' },
    { name: 'Education' },
];

async function main() {
    for (const category of predefinedCategories) {
        await prisma.category.upsert({
            where: { name: category.name },
            update: {},
            create: category,
        });
    }
    console.log('Predefined categories have been set up.');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });