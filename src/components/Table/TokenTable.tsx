import { useTokens } from '@/queries/tokens'
import React from 'react'

type Props = {}

const TokenTable = (props: Props) => {

    const {data: tokens, isLoading} = useTokens("");


  return (
    <>

    </>
  )
}

export default TokenTable