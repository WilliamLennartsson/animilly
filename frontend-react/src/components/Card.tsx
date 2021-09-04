import React, { FC, ReactChild, ReactChildren } from 'react'

interface Props {
  styles?: string
}

const Card: FC<Props> = (props) => {
  return (
    <div className={`${props.styles} flex flex-1 `}>
      {props.children}
    </div>
  )
}

export default Card