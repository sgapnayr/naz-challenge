import { StaticImageData } from 'next/image';

export interface NFTBet {
  image: StaticImageData;
  category: string;
  subCategory: string;
  section: string;
  title: string;
  tokenId: number;
}
