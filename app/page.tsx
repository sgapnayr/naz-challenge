import BaseNFT from '@/components/BaseNFT';
import DefaultLayout from '@/layouts/default.layout';
import NFTImage1 from '@/assets/nft1.png';
import { NFTBet } from '@/types/nftBet';

export default function Home() {
  const nftBets = [
    {
      image: NFTImage1,
      category: 'Basketball',
      subCategory: 'NBA Finals',
      section: 'Lakers vs Celtics',
      title: 'Lakers to win in the NBA Finals',
      tokenId: 1,
    },
  ] as NFTBet[];

  return (
    <DefaultLayout>
      {nftBets.map((nftBet, idx) => (
        <BaseNFT key={idx} nftBet={nftBet} />
      ))}
    </DefaultLayout>
  );
}
