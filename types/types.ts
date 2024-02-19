import { StaticImageData } from 'next/image';

export interface NFTBet {
  image: StaticImageData;
  category: string;
  subCategory: string;
  section: string;
  title: string;
  tokenId: number;
}

export interface ContractInstance {
  methods: {
    safeTransferFrom(
      from: string,
      to: string,
      tokenId: number
    ): {
      send(config: { from: string }): Promise<void>;
    };
    ownerOf(tokenId: number): {
      call(): Promise<string>;
    };
  };
}
