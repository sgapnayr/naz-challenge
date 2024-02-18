import BaseNFT from "@/components/BaseNFT";
import DefaultLayout from "@/layouts/default.layout";
import NFTImage from "@/assets/nft1.png";

export default function Home() {
  const nftBet = {
    image: NFTImage,
    category: "Basketball",
    subCategory: "NBA Finals",
    section: "Lakers vs Celtics",
    title: "Lakers to win in the NBA Finals",
    tokenId: 1,
  };

  return (
    <DefaultLayout>
      <BaseNFT nftBet={nftBet} />
    </DefaultLayout>
  );
}
