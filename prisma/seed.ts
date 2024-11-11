import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Check if ads already exist
    const adCount = await prisma.ad.count();
    if (adCount === 0) {
        // Add sample ads only if there are no existing ads
        await prisma.ad.createMany({
            data: [
                {
                    title: "Tech Gadget Sale",
                    description: "Best deals on the latest gadgets!",
                    imageUrl: "https://example.com/gadget.jpg",
                    targetKeywords: ["tech", "gadgets", "sale"],
                    budget: 500.0,
                },
                {
                    title: "Luxury Watches",
                    description: "Exclusive collection of luxury watches.",
                    imageUrl: "https://example.com/watch.jpg",
                    targetKeywords: ["luxury", "watches", "fashion"],
                    budget: 300.0,
                },
            ],
        });
        console.log("Ads data has been added.");
    } else {
        console.log("Ads data already exists. Skipping insertion.");
    }

    // Check if users already exist
    const userCount = await prisma.user.count();
    if (userCount === 0) {
        // Add sample users only if there are no existing users
        await prisma.user.createMany({
            data: [
                {
                    demographics: { age: 25, location: "USA" },
                    interests: ["tech", "gadgets"],
                },
                {
                    demographics: { age: 34, location: "UK" },
                    interests: ["luxury", "fashion"],
                },
            ],
        });
        console.log("User data has been added.");
    } else {
        console.log("User data already exists. Skipping insertion.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });