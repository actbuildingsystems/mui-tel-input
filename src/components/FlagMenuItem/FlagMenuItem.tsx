import * as React from 'react'
import Flag from '../Flag/Flag'
import { COUNTRIES, type MuiTelInputCountry } from '../../shared/constants/countries'
import { getDefaultImgProps } from '../../shared/helpers/flag'
import type { GetFlagElement } from '../../index.types'
import { ListItemIcon, ListItemText, MenuItem, type MenuItemProps, Typography } from '@material-ui/core'

export type FlagMenuItemProps = MenuItemProps & {
  isoCode: MuiTelInputCountry
  onSelectCountry: (isoCode: MuiTelInputCountry) => void
  countryName: string
  getFlagElement: GetFlagElement
}

export const menuItemClass = 'MuiTelInput-MenuItem'
export const listItemIconFlagClass = 'MuiTelInput-ListItemIcon-flag'
export const listItemTextCountryClass = 'MuiTelInput-ListItemText-country'
export const callingCodeClass = 'MuiTelInput-Typography-calling-code'

const FlagMenuItem = ({
  isoCode,
  onSelectCountry,
  countryName,
  getFlagElement,
  ...restMenuItemProps
}: FlagMenuItemProps) => {
  const handleClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.preventDefault()
    onSelectCountry(isoCode)
  }

  return (
    <MenuItem
      {...restMenuItemProps as any}
      onClick={handleClick}
      role="option"
      data-testid={`option-${isoCode}`}
      className={menuItemClass}
    >
      <ListItemIcon
        className={listItemIconFlagClass}
        style={{ marginRight: '10px' }}
      >
        <Flag isoCode={isoCode}>
          {getFlagElement(isoCode, {
            countryName,
            isSelected: false,
            imgProps: getDefaultImgProps({ isoCode, countryName })
          })}
        </Flag>
      </ListItemIcon>
      <ListItemText
        className={listItemTextCountryClass}
        style={{ marginRight: '10px' }}
      >
        {countryName}
      </ListItemText>
      <Typography
        variant="body2"
        color="textSecondary"
        className={callingCodeClass}
      >
        +{COUNTRIES[isoCode]?.[0]}
      </Typography>
    </MenuItem>
  )
}

export default React.memo(FlagMenuItem)
