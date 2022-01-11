import { Grid, StackProps } from '@chakra-ui/react';

export const Main = (props: StackProps) => (
	<Grid
		gap='1rem'
		width='100%'
		height='100%'
		py='5rem'
		px='1rem'
		templateColumns='2fr 3fr'
		{...props}
	/>
);
