import {getDefaultProvider} from 'ethers';
import { NftProvider, useNft } from "use-nft";
import Nft from '../../components/nft/Nft';

const ethersConfig = {
  provider: getDefaultProvider("homestead"),
}


export default function UserNFT() {
  return ( 
<div> Hello world </div>) }