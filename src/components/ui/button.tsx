import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react"
import {
  AbsoluteCenter,
  Button as ChakraButton,
  Spinner,
} from "@chakra-ui/react"
import * as React from "react"

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps {}

const ButtonComponent = (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
  const { loading, disabled, loadingText, children, ...rest } = props
  return (
    <ChakraButton disabled={loading || disabled} ref={ref} {...rest}>
    {loading && !loadingText ? (
      <>
        <AbsoluteCenter display="inline-flex">
          <Spinner size="inherit" color="inherit" />
        </AbsoluteCenter>
        <span style={{ opacity: 0 }}>{children}</span>
      </>
    ) : loading && loadingText ? (
      <>
        <Spinner size="inherit" color="inherit" />
        {loadingText}
      </>
    ) : (
      children
    )}
    </ChakraButton>
  )
}

export const Button = React.forwardRef(ButtonComponent)
