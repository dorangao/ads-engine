import { useEffect, useState } from "react";

interface Ad {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    async function fetchAds() {
      const res = await fetch("/api/ads?keywords=tech");
      const data = await res.json();
      setAds(data);
    }

    fetchAds();
  }, []);

  const handleClick = async (adId: number) => {
    await fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adId, userId: 1 }),
    });
  };

  return (
      <div>
        {ads.map((ad) => (
            <div key={ad.id} onClick={() => handleClick(ad.id)}>
              <h2>{ad.title}</h2>
              <p>{ad.description}</p>
              <img src={ad.imageUrl} alt={ad.title} />
            </div>
        ))}
      </div>
  );
}