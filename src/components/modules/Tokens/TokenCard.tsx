import { Box, HStack, Image, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { Eth } from '@web3uikit/icons';
import { FC } from 'react';
import { resolveIPFS } from 'utils/resolveIPFS';

// Use your MemeToken interface
interface MemeToken {
  name: string;
  symbol: string;
  description: string;
  tokenImageUrl: string;
  fundingRaised: string;
  tokenAddress: string;
  creatorAddress: string;
}

export interface TokenCardParams {
  key: number;
  token: MemeToken; 
}

const TokenCard: FC<TokenCardParams> = ({ token: { name, symbol, tokenImageUrl, fundingRaised, creatorAddress, description } }) => {
  const bgColor = useColorModeValue('none', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const descBgColor = useColorModeValue('gray.100', 'gray.600');

  return (
    <Box maxWidth="315px" bgColor={bgColor} padding={3} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
      <Box maxHeight="260px" overflow={'hidden'} borderRadius="xl">
        <Image
          src={resolveIPFS(tokenImageUrl)} 
          alt={name}
          minH="260px"
          minW="260px"
          boxSize="100%"
          objectFit="fill"
        />
      </Box>
      <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1} marginTop={2}>
        {name}
      </Box>
      <HStack alignItems={'center'}>
        <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="smaller">
          Token {symbol}
        </Box>

        <Eth fontSize="20px" />
      </HStack>
      <SimpleGrid columns={2} spacing={4} bgColor={descBgColor} padding={2.5} borderRadius="xl" marginTop={2}>
  <Box>
    <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
      Symbol
    </Box>
    <Box as="h4" noOfLines={1} fontSize="sm">
      {symbol}
    </Box>
  </Box>
  <Box>
    <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
      Funding
    </Box>
    <Box as="h4" noOfLines={1} fontSize="sm">
      {fundingRaised.toString()} ETH 
    </Box>
  </Box>
  <Box>
    <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
      Creator
    </Box>
    <Box as="h4" noOfLines={1} fontSize="sm">
      {creatorAddress} 
    </Box>
  </Box>
  <Box>
    <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
      Description
    </Box>
    <Box as="h4" noOfLines={1} fontSize="sm">
      {description} 
    </Box>
  </Box>
</SimpleGrid>
    </Box>
  );
};

export default TokenCard; 
