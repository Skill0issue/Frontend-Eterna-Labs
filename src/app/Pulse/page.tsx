import React from 'react'

import TokenTable from '@/components/Table/TokenTable'


type Props = {}

const page = (props: Props) => {
  return (
    <>
      <div className='w-full h-full'>
          <TokenTable/>
      </div>
    </>
  )
}

export default page