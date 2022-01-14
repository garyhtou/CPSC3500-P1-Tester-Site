import { Link as ChakraLink, Button } from '@chakra-ui/react';

import { Container } from './Container';
import {
	FormControl,
	Textarea,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	RadioGroup,
	HStack,
	Box,
	Text,
	Radio,
	Heading,
	BoxProps,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Formik } from 'formik';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export const Form = ({ setPost, setResult }) => {
	const API_URL = 'https://cpsc3500-p1-tester.herokuapp.com/';

	const UploadComponent = (props: BoxProps & { setFieldValue; value }) => {
		const { setFieldValue, value } = props;
		const propsForBox = Object.assign({}, props);
		delete propsForBox.setFieldValue;
		delete propsForBox.value;

		const { getRootProps, getInputProps, isDragActive } = useDropzone({
			onDrop: (acceptedFiles, rejectedFiles) => {
				console.log(acceptedFiles);

				setFieldValue('files', [...value, ...acceptedFiles]);
			},
		});
		return (
			<Box {...propsForBox}>
				{}
				<div {...getRootProps({ className: 'dropzone' })}>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p>Drop the files here ...</p>
					) : (
						<p>Drag 'n' drop some files here, or click to select files</p>
					)}
				</div>
			</Box>
		);
	};

	return (
		<>
			<Formik
				initialValues={{ util: 'wcat', files: [], searchTerm: null, stdin: '' }}
				validate={(values) => {
					const errors: any = {};
					// if (!values.email) {
					// 	errors.email = 'Required';
					// } else if (
					// 	!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
					// ) {
					// 	errors.email = 'Invalid email address';
					// }
					return errors;
				}}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						console.log(values);

						const postForm = new FormData();
						const postObj = { util: values.util };

						values.files.forEach((file, i) => {
							postForm.append(`file.${i}`, file);
							postObj[`file.${i}`] = file;
						});

						if (values.util === 'wgrep') {
							postForm.append('searchTerm', values.searchTerm?.trim() || '');
							postObj['searchTerm'] = values.searchTerm ?? '';
						}
						if (values.util === 'wgrep' && values.stdin.length > 0) {
							postForm.append('stdin', values.stdin);
							postObj['stdin'] = values.stdin;
						}

						setPost(postObj);
						setResult({});
						const resp = await axios.post(API_URL + values.util, postForm, {
							headers: { 'Content-Type': 'multipart/form-data' },
						});

						const data = resp.data;
						setResult(data);
						console.log(data);

						// setTimeout(() => {
						// 	alert(JSON.stringify(values, null, 2));
						// }, 400);
					} catch (e) {
						setResult(e.data);
						console.error(e);
					}
					setSubmitting(false);
					// resetForm();
				}}
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
					<form onSubmit={handleSubmit}>
						<FormControl as='fieldset'>
							<FormLabel as='legend'>
								Which utility would you like to run?
							</FormLabel>
							<RadioGroup name='util' value={values.util}>
								<HStack spacing='2rem'>
									<Radio value='wcat' onChange={handleChange}>
										<code>wcat</code>
									</Radio>
									<Radio value='wgrep' onChange={handleChange}>
										<code>wgrep</code>
									</Radio>
									<Radio value='wzip' onChange={handleChange}>
										<code>wzip</code>
									</Radio>
									<Radio value='wunzip' onChange={handleChange}>
										<code>wunzip</code>
									</Radio>
								</HStack>
							</RadioGroup>
							{errors.util && touched.util && errors.util}
							{/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
						</FormControl>

						{values.util === 'wgrep' && (
							<FormControl pt='1.5rem'>
								<FormLabel>
									<code>stdin</code>
								</FormLabel>
								<Textarea
									placeholder='some text here'
									name='stdin'
									value={values.stdin}
									onChange={handleChange}
								/>
							</FormControl>
						)}

						<Heading
							size={'md'}
							mt='2rem'
							style={{ textDecoration: 'underline' }}
						>
							<code>{values.util}</code> Command Arguments
						</Heading>

						{values.util === 'wgrep' && (
							<FormControl pt='1rem'>
								<FormLabel>Argument 1 (Search Term)</FormLabel>
								<Input
									placeholder='hi'
									name='searchTerm'
									value={values.searchTerm}
									onChange={handleChange}
								/>
							</FormControl>
						)}

						<FormControl as='fieldset' mt='1rem'>
							<FormLabel as='legend' htmlFor='file'>
								Upload files as argument
							</FormLabel>

							<UploadComponent
								setFieldValue={setFieldValue}
								value={values.files}
								cursor={'pointer'}
								minHeight={'2rem'}
								p={'1rem'}
								rounded={'md'}
								border={'1px solid #ccc'}
							/>

							{/* list of uploaded files */}
							<FormHelperText>
								<ol style={{ paddingLeft: '1rem' }}>
									{values.util === 'wgrep' && values.files.length > 0 && (
										<li>Argument (string): above</li>
									)}
									{values.files &&
										values.files.map((file, i) => (
											<li key={i}>
												{`Argument (file): ${file.name} Type:${file.type} Size:${file.size} bytes`}{' '}
											</li>
										))}
								</ol>
							</FormHelperText>

							{errors.util && touched.util && errors.util}
							{/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
						</FormControl>

						<Button type='submit' disabled={isSubmitting} mt='1rem' mr='0.5rem'>
							Submit
						</Button>
						<Button
							type='reset'
							disabled={isSubmitting}
							mt='1rem'
							variant={'outline'}
							onClick={() => {
								resetForm();
								setPost({});
								setResult({});
							}}
						>
							Reset
						</Button>
					</form>
				)}
			</Formik>
		</>
	);
};
