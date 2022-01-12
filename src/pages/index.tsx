import {
	Link as ChakraLink,
	Text,
	Code,
	Box,
	List,
	ListIcon,
	ListItem,
	useColorModeValue,
} from '@chakra-ui/react';
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons';

import { Title } from '../components/Title';
import { Container } from '../components/Container';
import { Main } from '../components/Main';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { Form } from '../components/Form';
import { Results } from '../components/Results';
import { Card } from '../components/Card';
import { useState } from 'react';

const Index = () => {
	const [post, setPost] = useState({});
	const [result, setResult] = useState({});

	return (
		<Container height='100vh'>
			<DarkModeSwitch />
			<Title />
			{/* <Text>
			Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{' '}
			<Code>TypeScript</Code>.
		</Text> */}
			<Main>
				<Card>
					<Form setPost={setPost} setResult={setResult} />
				</Card>
				<Card>
					<Results post={post} result={result} />
				</Card>
			</Main>

			<CTA />
		</Container>
	);
};

export default Index;

// <List spacing={3} my={0}>
//   {/* <ListItem>
//     <ListIcon as={CheckCircleIcon} color='green.500' />
//     <ChakraLink
//       isExternal
//       href='https://chakra-ui.com'
//       flexGrow={1}
//       mr={2}
//     >
//       Chakra UI <LinkIcon />
//     </ChakraLink>
//   </ListItem>
//   <ListItem>
//     <ListIcon as={CheckCircleIcon} color='green.500' />
//     <ChakraLink
//       isExternal
//       href='https://nextjs.org'
//       flexGrow={1}
//       mr={2}
//     >
//       Next.js <LinkIcon />
//     </ChakraLink>
//   </ListItem> */}
//   <pre>{JSON.stringify(post, null, 2)}</pre>
//   <pre>{JSON.stringify(result, null, 2)}</pre>
// </List>
