import BaseNFT from "@/components/BaseNFT";
import DefaultLayout from "@/layouts/default.layout";
import NFTImage from "@/assets/nft1.png";

export default function Home() {
  const nftBet = {
    image: NFTImage,
    title: "Lakers to win in the NBA Finals",
  };

  return (
    <DefaultLayout>
      <BaseNFT nftBet={nftBet} />
    </DefaultLayout>
  );
}
