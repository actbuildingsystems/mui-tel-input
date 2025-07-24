import * as React from 'react'
import type { MuiTelInputCountry } from '../../shared/constants/countries'

export type FlagProps = {
  isoCode: MuiTelInputCountry | null
  children: React.ReactNode
}

export const flagContainerClass = 'MuiTelInput-Flag'

const Flag = ({ isoCode, children }: FlagProps) => {
  return (
    <span
      data-testid={isoCode}
      className={flagContainerClass}
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {children}
    </span>
  )
}

export default Flag
