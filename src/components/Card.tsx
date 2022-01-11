import { Box, useColorModeValue, BoxProps } from '@chakra-ui/react';

export const Card = (props: BoxProps) => {
	return (
		<Box
			boxShadow={'lg'}
			rounded='2rem'
			overflow={'hidden'}
			bg={useColorModeValue('gray.100', 'gray.800')}
			p='2rem'
			{...props}
		/>
	);
};
