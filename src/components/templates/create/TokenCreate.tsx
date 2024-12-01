import { useState } from 'react';
import { ethers } from 'ethers';
import { providers } from 'ethers';
import { abi } from 'utils/abis/abi';

import {
    Box,
    Flex,
    Heading,
    Input,
    Text,
    Textarea,
    Link,
    useToast,
  } from '@chakra-ui/react';
  
import { Button } from "../../ui/button"

const TokenCreate = () => {
    const toast = useToast();
    const [name, setName] = useState('');
    const [ticker, setTicker] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleCreate = async () => {
        try {
          if (!window.ethereum) {
            throw new Error("Please install MetaMask or another Web3 wallet");
          }
          const provider = new providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
          const signer = await provider.getSigner();
          if (!process.env.NEXT_PUBLIC_REACT_APP_CONTRACT_ADDRESS) {
            throw new Error("Contract address is not defined in environment variables");
          }
          const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_REACT_APP_CONTRACT_ADDRESS,
            abi,
            signer
          );
    
          const transaction = await contract.createMemeToken(
            name,
            ticker,
            imageUrl,
            description,
            {
              value: ethers.utils.parseEther("0.0001"),
            }
          );
       
        const receipt = await transaction.wait();
          toast({
            title: 'Transaction Successful',
            description: `Hash: ${receipt.hash}`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
    
    console.log("Creating token:", { name, ticker, description, imageUrl });
  } catch (error) {
    console.error("Error creating token:", error);
    // Consider adding more user-friendly error handling here
  }
};

      return (
        <Flex direction="column" align="center" p={8}>
          <Heading as="h1" size="xl" mb={6}>
            Create Your MemeToken
          </Heading>
    
          <Text mb={4}>MemeCoin creation fee: 0.0001 ETH</Text>
          <Text mb={4}>
            Max supply: 1 million tokens. Initial mint: 200k tokens.
          </Text>
          <Text mb={4}>
            If funding target of 24 ETH is met, a liquidity pool will be created on
            Uniswap.
          </Text>
    
          <Box w="500px" maxW="90%" p={4} borderWidth="1px" borderRadius="md">
            <Input
              placeholder="Token Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              mb={4}
            />
            <Input
              placeholder="Ticker Symbol"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              mb={4}
            />
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              mb={4}
            />
            <Input
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              mb={4}
            />
    
            <Button colorScheme="teal" onClick={handleCreate}>
              Create MemeToken
            </Button>
          </Box>
    
          <Flex mt={8}>
            <Link href="#" mr={4}>
              [Moralis]
            </Link>
            <Link href="#">
              [Docs]
            </Link>
          </Flex>
        </Flex>
      );
    };
    
    export default TokenCreate;