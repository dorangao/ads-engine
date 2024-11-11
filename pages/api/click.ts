import prisma from '../../lib/prisma';

export default async function handler(req, res) {
    const {adId, userId} = req.body;

    // Update click count in both Ad and Analytics tables
    await prisma.ad.update({
        where: {id: adId},
        data: {clicks: {increment: 1}}
    });

    await prisma.analytics.upsert({
        where: {adId_date: {adId, date: new Date(new Date().setHours(0, 0, 0, 0)).toISOString()}},
        update: {clicks: {increment: 1}},
        create: {adId, clicks: 1}
    });

    res.status(200).json({success: true});
}