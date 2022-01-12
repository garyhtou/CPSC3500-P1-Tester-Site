import { Link as ChakraLink, Button, Avatar } from '@chakra-ui/react';

import { Container } from './Container';

export const CTA = () => (
	<Container
		flexDirection='row'
		position='fixed'
		bottom='0'
		width='100%'
		pt={3}
		pb={5}
	>
		<ChakraLink
			isExternal
			href='https://github.com/garyhtou/cpsc3500-p1-tester-site'
			flexGrow={2}
			mx={2}
		>
			<Button width='100%' variant='link' colorScheme='green'>
				View GitHub
			</Button>
		</ChakraLink>

		<ChakraLink isExternal href='https://garytou.com' flexGrow={3} mx={2}>
			<Button width='100%' variant='link' colorScheme='green'>
				<Avatar
					name='Gary Tou'
					size={'xs'}
					mr={'0.5rem'}
					src='https://assets.garytou.com/profile/GaryTou.jpg'
				/>
				<span>Built by Gary Tou</span>
			</Button>
		</ChakraLink>
	</Container>
);
