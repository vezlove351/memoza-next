import { Box, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const links = {
  github: 'https://github.com/ethereum-boilerplate/ethereum-boilerplate/',
  forum: 'https://forum.moralis.io/',
};

const Footer = () => {
  return (
    <Box textAlign={'center'} w="full" p={6}>
      <Text>
        ⭐️ Please star this{' '}
        <Link href={links.github} isExternal alignItems={'center'}>
          boilerplate <ExternalLinkIcon />
        </Link>
        , every star makes us very happy!
      </Text>
      <Text>
        🙋 You have questions? Ask them on the{' '}
        <Link href={links.forum} isExternal alignItems={'center'}>
          Moralis forum <ExternalLinkIcon />
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;
