import { useNft } from "use-nft";


export default function Nft(){
    const {loading, error, nft} = useNft (
      "0x10C4Ba7cd73bF8795a0484390cFe4500575D642D", "2"
    )
  
      if (loading) return <>Loading…</>
      if (error || !nft) return <>Error.</>
  
      return (
        <section>
          <h1>{nft.name}</h1>
          <img src={nft.image} alt="" />
          <p>{nft.description}</p>
          <p>Owner: {nft.owner}</p>
          <p>Metadata URL: {nft.metadataUrl}</p>
        </section>
      )
  }
  