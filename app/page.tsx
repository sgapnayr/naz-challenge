import BaseNFT from "@/components/BaseNFT";
import DefaultLayout from "@/layouts/default.layout";
import NFTImage1 from "@/assets/nft1.png";
import NFTImage2 from "@/assets/nft2.webp";
import NFTImage3 from "@/assets/nft3.webp";

export default function Home() {
  const nftBets = [
    {
      image: NFTImage1,
      category: "Basketball",
      subCategory: "NBA Finals",
      section: "Lakers vs Celtics",
      title: "Lakers to win in the NBA Finals",
      tokenId: 1,
    },
    {
      image: NFTImage2,
      category: "Basketball",
      subCategory: "NBA Semi-Finals",
      section: "OKC vs Rockets",
      title: "OKC to beat Rockets",
      tokenId: 2,
    },
    {
      image: NFTImage3,
      category: "Baseball",
      subCategory: "MLB World Series",
      section: "Dodgers vs Yankees",
      title: "Dodgers to win the World Series",
      tokenId: 3,
    },
  ];

  return (
    <DefaultLayout>
      {nftBets.map((nftBet, idx) => (
        <BaseNFT key={idx} nftBet={nftBet} />
      ))}
    </DefaultLayout>
  );
}
