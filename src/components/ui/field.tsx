import { FormControl as ChakraField, FormLabel, FormHelperText, FormErrorMessage } from "@chakra-ui/react"
import * as React from "react"

export interface FieldProps extends Omit<React.ComponentProps<typeof ChakraField>, "label"> {
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorText?: React.ReactNode
  optionalText?: React.ReactNode
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (props, ref) => {
    const { label, children, helperText, errorText, optionalText, ...rest } =
      props
    return (
      <ChakraField ref={ref} {...rest}>
        {label && (
          <FormLabel>
            {label}
            {optionalText && <span>{optionalText}</span>}
          </FormLabel>
        )}
        {children}
        {helperText && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
        {errorText && (
          <FormErrorMessage>{errorText}</FormErrorMessage>
        )}
      </ChakraField>
    )
  },
)
