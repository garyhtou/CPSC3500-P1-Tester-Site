import { Flex, Heading } from '@chakra-ui/react';

export const Title = ({ title }: { title: string }) => (
	<Flex
		position='fixed'
		top='1rem'
		left='1rem'
		bgGradient='linear(to-l, #7928CA, #FF0080)'
		bgClip='text'
	>
		<Heading fontSize='2rem'>{title}</Heading>
	</Flex>
);

Title.defaultProps = {
	title: 'CPSC 3500: Project 1 Tester',
};
