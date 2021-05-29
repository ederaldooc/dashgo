import { forwardRef, ForwardRefRenderFunction } from "react";
import { FormControl, FormLabel, Input as ChackraInput, InputProps as ChackraInputProps } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { FormErrorMessage } from "@chakra-ui/react";


interface InputProps extends ChackraInputProps {
    name: string;
    label?: string;
    error: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({name, label, error, ...rest}, ref ) => {
    return (
        <FormControl isInvalid={!!error} >
            { !! label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <ChackraInput name={name}
              id={name}
              focusBorderColor="pink.500" 
              bg="gray.900" 
              variant="filled"
              _hover={{
                bgColor: 'gray.900'
              }}
              size="lg"
              ref={ref}
              error={error}
              {...rest}
            />

          { !!error && ( 
              <FormErrorMessage>
                {error.message}
              </FormErrorMessage>
          ) }

          </FormControl>
    );
}

export const Input = forwardRef(InputBase);
