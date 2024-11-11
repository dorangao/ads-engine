import prisma from '../../lib/prisma';

export default async function handler(req, res) {
    const {userId, keywords} = req.query;

    const ads = await prisma.ad.findMany({
        where: {
            targetKeywords: {hasSome: keywords.split(",")}
        }
    });

    // Track impressions
    for (const ad of ads) {
        await prisma.analytics.upsert({
            where: {adId_date: {adId: ad.id, date: new Date(new Date().setHours(0, 0, 0, 0)).toISOString()}},
            update: {impressions: {increment: 1}},
            create: {adId: ad.id, impressions: 1}
        });
    }

    res.status(200).json(ads);
}