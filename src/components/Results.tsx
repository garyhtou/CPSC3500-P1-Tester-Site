import { Link as ChakraLink, Button } from '@chakra-ui/react';

import { Container } from './Container';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	RadioGroup,
	HStack,
	Textarea,
	Box,
	Text,
	Radio,
	Heading,
	Badge,
	BoxProps,
	Divider,
	useToast,
	useColorMode,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';

export const Results = ({ post, result }) => {
	const { colorMode, toggleColorMode } = useColorMode();

	console.log(post, result);

	const [empty, setEmpty] = useState(Object.keys(result).length === 0);
	const [hasError, setHasError] = useState(
		typeof result?.error !== 'undefined' && result?.status !== null
	);
	useEffect(() => {
		setEmpty(Object.keys(result).length === 0);
		setHasError(
			typeof result?.error !== 'undefined' && result?.status !== null
		);
	}, [result]);

	let args: string[] = [];
	args.push(post.util);
	args.push(post.searchTerm ? `'${post.searchTerm}'` : undefined);
	args.push(
		...Object.keys(post)
			.filter((key) => key.startsWith('file.'))
			.map((key) => post[key].name?.trim())
	);

	args = args.filter((arg) => arg?.trim()?.length > 0);

	console.log('cmd:', args.join(' '));

	const toast = useToast();

	return (
		<>
			<FormControl>
				<FormLabel>Command</FormLabel>
				<Input
					isReadOnly
					isDisabled
					resize={'vertical'}
					variant={'filled'}
					whiteSpace={'pre-wrap'}
					value={args.join(' ')}
				/>
			</FormControl>
			{post.stdin && (
				<FormControl mt='1rem'>
					<FormLabel>stdin</FormLabel>
					<Input
						isReadOnly
						isDisabled
						resize={'vertical'}
						variant={'filled'}
						whiteSpace={'pre-wrap'}
						value={post.stdin}
					/>
				</FormControl>
			)}
			<FormControl isInvalid={hasError} mt='1rem'>
				<HStack justifyContent={'space-between'} align={'baseline'}>
					<FormLabel>Results</FormLabel>
					<Button
						size={'xs'}
						variant={'ghost'}
						onClick={() => {
							if (empty) {
								toast({
									title: 'No results',
									description: "There ain't any results for you to download!",
									status: 'warning',
									duration: 10000,
									isClosable: true,
								});
								return;
							}

							const link = document.createElement('a');
							link.href =
								'data:text/plain;charset=utf-8,' +
								encodeURIComponent(result.output || result.error);
							link.download = `output of ${args.join(' ')}.txt`;
							link.click();
						}}
					>
						Download
					</Button>
				</HStack>
				<Textarea
					isReadOnly
					isDisabled
					resize={'vertical'}
					variant={'filled'}
					whiteSpace={'pre-wrap'}
					value={empty ? '' : result.output || result.error}
				/>
				<FormErrorMessage>
					<code>
						<Badge colorScheme={'red'} fontSize={'1rem'} variant={'solid'}>
							ERROR
						</Badge>{' '}
						STATUS CODE: {result.status}
					</code>
				</FormErrorMessage>
			</FormControl>
			<Divider my={'2rem'} />
			<Formik
				initialValues={{ compare: '' }}
				validate={(values) => {
					const errors: any = {};
					console.log('validating');
					console.log(values);

					if (
						values.compare &&
						values.compare !== (result.output || result.error)
					) {
						errors.compare = 'diff';
					}
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {}}
				validateOnChange={true}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					setFieldValue,
					resetForm,
					/* and other goodies */
				}) => (
					<form>
						<FormControl
							isInvalid={!empty && typeof errors.compare !== 'undefined'}
						>
							<FormLabel>Compare your results</FormLabel>
							<Textarea
								resize={'vertical'}
								value={values.compare}
								onChange={handleChange}
								name='compare'
							/>
							<FormHelperText>Paste 'em in</FormHelperText>
							<FormErrorMessage>They're different!</FormErrorMessage>
						</FormControl>

						{!empty && typeof errors.compare !== 'undefined' && (
							<Box mt='1rem'>
								<Text mb='0.2rem'>
									There's a <code>git diff</code> to help you compare the
									results:
									<br />
									<small>
										If <code>git diff</code> is not showing, check your result's
										whitespaces.
									</small>
								</Text>
								<ReactDiffViewer
									oldValue={result.output || result.error}
									newValue={values.compare}
									useDarkTheme={colorMode === 'dark'}
								/>
							</Box>
						)}
					</form>
				)}
			</Formik>
		</>
	);
};
