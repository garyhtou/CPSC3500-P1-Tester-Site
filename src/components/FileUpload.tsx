import {
	Input,
	FormControl,
	FormLabel,
	InputGroup,
	InputLeftElement,
	FormErrorMessage,
	Code,
	Icon,
} from '@chakra-ui/react';
import { FiFile } from 'react-icons/fi';
import { useRef } from 'react';
import { Formik } from 'formik';

const FileUpload = () => {
	const inputRef = useRef();

	return (
		<FormControl>
			<FormLabel htmlFor='writeUpFile'>Upload a file</FormLabel>
			<InputGroup>
				<InputLeftElement
					pointerEvents='none'
					children={<Icon as={FiFile} />}
				/>
				<input
					type='file'
					ref={inputRef}
					inputRef={ref}
					style={{ display: 'none' }}
				></input>
				<Input
					placeholder={'Your file ...'}
					onClick={() => inputRef.current.click()}
					value={value}
				/>
			</InputGroup>
			<FormErrorMessage>{invalid}</FormErrorMessage>
		</FormControl>
	);
};

export default FileUpload;
