import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { date } = req.query;

    if (!date || typeof date !== "string") {
        return res.status(400).json({ error: "Date is required and must be a string" });
    }

    // Parse the date and create a range covering the entire day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0); // Start of the day

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999); // End of the day

    // Aggregate data for each ad on the specified date
    const analytics = await prisma.analytics.groupBy({
        by: ['adId'],
        where: {
            date: {
                gte: startDate,
                lte: endDate,
            }
        },
        _sum: {
            impressions: true,
            clicks: true,
        },
    });

    // Fetch ad titles for each adId
    const adTitles = await prisma.ad.findMany({
        where: {
            id: { in: analytics.map(data => data.adId) },
        },
        select: {
            id: true,
            title: true,
        },
    });

    // Create a mapping of adId to adTitle for easy lookup
    const adTitleMap = Object.fromEntries(adTitles.map(ad => [ad.id, ad.title]));

    // Generate the CTR report
    const ctrReport = analytics.map((data) => {
        const impressions = data._sum.impressions || 0;
        const clicks = data._sum.clicks || 0;
        const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;

        return {
            adId: data.adId,
            adTitle: adTitleMap[data.adId],
            impressions,
            clicks,
            ctr: ctr.toFixed(2),
        };
    });

    res.status(200).json(ctrReport);
}