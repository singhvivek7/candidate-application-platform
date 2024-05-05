import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import './MultipleSelect.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface SelectOption {
  name: string;
  value: string;
}

interface Props {
  options: SelectOption[];
  placeholder: string;
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
}

const getStyles = (
  name: string,
  selectedOptions: readonly string[],
  theme: Theme
) => {
  return {
    fontWeight:
      selectedOptions.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

export const MultipleSelect = ({
  options,
  placeholder,
  selectedOptions,
  setSelectedOptions,
}: Props) => {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <FormControl className="multiple-select-wrapper">
      <Select
        multiple
        displayEmpty
        value={selectedOptions}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={selected => {
          if (selected.length === 0) {
            return <em>{placeholder}</em>;
          }

          return selected.join(', ');
        }}
        MenuProps={MenuProps}>
        <MenuItem disabled value="">
          <em>{placeholder}</em>
        </MenuItem>
        {options.map(({ name }) => (
          <MenuItem
            key={name}
            value={name}
            data-name={name}
            style={getStyles(name, selectedOptions, theme)}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
