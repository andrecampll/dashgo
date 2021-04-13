import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  InputProps as ChakraInputProps
} from '@chakra-ui/react';

type InputProps = {
  name: string;
  label?: string;
} & ChakraInputProps;

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
    name,
    label,
    ...props
  },
    ref
) => {
  return (
    <FormControl>
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
    </FormControl>
  )
}

export const Input = forwardRef(InputBase);
