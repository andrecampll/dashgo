import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

type InputProps = {
  name: string;
  label?: string;
  error: FieldError;
} & ChakraInputProps;

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
    name,
    label,
    error,
    ...props
  },
    ref
) => {
  return (
    <FormControl isInvalid={!!error} >
      {!!label && <FormLabel htmlFor={label}>
        {label}
      </FormLabel>}

      <ChakraInput
        id={name}
        name={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: 'gray.900'
        }}
        size="lg"
        ref={ref}
        {...props}
      />

      {
        !!error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        )
      }
    </FormControl>
  )
}

export const Input = forwardRef(InputBase);
