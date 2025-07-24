import * as React from 'react'
import Flag from '../Flag/Flag'
import type { MuiTelInputCountry } from '../../shared/constants/countries'
import { DEFAULT_LANG } from '../../shared/constants/lang'
import { getCallingCodeOfCountry } from '../../shared/helpers/country'
import { getDefaultImgProps } from '../../shared/helpers/flag'
import { getDisplayNames } from '../../shared/helpers/intl'
import type { GetFlagElement } from '../../index.types'
import { IconButton, type IconButtonProps, Typography } from '@material-ui/core'

export type FlagButtonProps = IconButtonProps & {
  isoCode: MuiTelInputCountry | null
  forceCallingCode?: boolean
  isFlagsMenuOpened: boolean
  langOfCountryName?: string
  disableDropdown?: boolean
  getFlagElement: GetFlagElement
  unknownFlagElement: React.ReactNode
}

export const flagButtonClass = 'MuiTelInput-IconButton'

const FlagButton = ({
  disableDropdown = false,
  forceCallingCode = false,
  langOfCountryName = DEFAULT_LANG,
  isFlagsMenuOpened,
  getFlagElement,
  unknownFlagElement,
  isoCode,
  className,
  ...iconButtonProps
}: FlagButtonProps) => {
  const displayNames = React.useMemo(() => {
    return getDisplayNames(langOfCountryName)
  }, [langOfCountryName])

  const flagElement = (
    <Flag isoCode={isoCode}>
      {isoCode
        ? getFlagElement(isoCode, {
            countryName: displayNames.of(isoCode) || '',
            isSelected: true,
            imgProps: getDefaultImgProps({
              isoCode,
              countryName: displayNames.of(isoCode) || ''
            })
          })
        : unknownFlagElement}
    </Flag>
  )

  return (
    <>
      {disableDropdown ? (
        <IconButton
          tabIndex={-1}
          className={`${flagButtonClass} ${className || ''}`}
          role="presentation"
          disableRipple
          style={{ pointerEvents: 'none', aspectRatio: '1 / 1' }}
          component="span"
        >
          {flagElement}
        </IconButton>
      ) : (
        <IconButton
          aria-label="Open flags menu"
          className={`${flagButtonClass} ${className || ''}`}
          aria-haspopup="listbox"
          style={{ aspectRatio: '1 / 1' }}
          aria-controls={isFlagsMenuOpened ? 'select-country' : undefined}
          aria-expanded={isFlagsMenuOpened ? 'true' : 'false'}
          {...iconButtonProps}
        >
          {flagElement}
        </IconButton>
      )}
      {forceCallingCode && isoCode ? (
        <Typography
          style={{
            borderRight: `1px solid #e0e0e0`,
            paddingRight: 10,
            cursor: 'default',
            pointerEvents: 'none'
          }}
        >
          +{getCallingCodeOfCountry(isoCode)}
        </Typography>
      ) : null}
    </>
  )
}

export default FlagButton
