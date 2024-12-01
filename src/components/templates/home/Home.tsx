import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { providers } from 'ethers';
import { abi } from 'utils/abis/abi';

import TokenCard from '../../modules/Tokens/TokenCard';
import { Box, Grid, useToast, Input, HStack } from '@chakra-ui/react';
import { Field } from "../../ui/field"
import { Button } from "../../ui/button"

interface MemeToken {
  name: string;
  symbol: string;
  description: string;
  tokenImageUrl: string;
  fundingRaised: string;
  tokenAddress: string;
  creatorAddress: string;

}

const Home = () => {
  const [cards, setCards] = useState<MemeToken[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();

  useEffect(() => {
    const fetchMemeTokens = async () => {
      try {
        const provider = new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_REACT_APP_RPC_URL);
        const contractAddress = process.env.NEXT_PUBLIC_REACT_APP_CONTRACT_ADDRESS;

        if (!contractAddress) {
          throw new Error('Contract address is not defined');
        }

        const contract = new ethers.Contract(contractAddress, abi, provider);
        const memeTokens = await contract.getAllMemeTokens();

        setCards(memeTokens.map((token: MemeToken) => token)); 
      } catch (error) {
        console.error('Error fetching meme tokens:', error);
      }
    };

    fetchMemeTokens();
  }, [toast]);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <>
    <HStack>
   
    <Field>
      <Input 
      type="text"
      className="search-input"
      placeholder="search for token"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}/>
     </Field>

    <Button onClick={handleSearch}>Search</Button>
    </HStack>
    

    
      
      {cards?.length ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {cards.map((card, key) => (
            <TokenCard token={card} key={key} />
          ))}
        </Grid>
      ) : (
        <Box>Looks Like you do not have any Memes</Box>
      )}

    </>
  );
};

export default Home;