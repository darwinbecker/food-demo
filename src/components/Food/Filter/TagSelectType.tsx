import * as React from 'react';
import SelectUnstyled, {
  SelectUnstyledProps,
  selectUnstyledClasses,
} from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import { styled } from '@mui/system';
import { PopperUnstyled } from '@mui/base';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('div')(
  ({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  line-height: 34px;
  height: 34px;
  min-height: 32px;
  min-width: 150px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 7px;
  margin: 0 10px;
  text-align: center;
  color: ${theme.palette.mode === 'dark' ? '#DAECFF' : '#003A75'};

  &:hover {
    // background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }

  & img {
    margin-right: 10px;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  margin: 0;
  font-size: 14px;
  box-sizing: border-box;
  padding: 5px;
  width: 150px;
  min-width: 150px;
  max-height: 400px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 7px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  & img {
    margin-right: 10px;
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect(
  props: SelectUnstyledProps<string>,
  ref: React.ForwardedRef<any>,
) {
  const components: SelectUnstyledProps<string>['components'] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});

const Paragraph = styled('label')(
  ({ theme }) => `
  padding: 0 0 4px 0;
  line-height: 1.5;
  display: block;
  font-size: 14px;
  // margin: 10px 0;
  // color: ${theme.palette.mode === 'dark' ? grey[400] : grey[700]};
  `,
);

interface TagTypeProps {
  tagType: string;
  setTagType: (value: string | null) => void;
}



export const TagSelectType: React.FC<TagTypeProps> = (props: TagTypeProps) => {
  return (
    <>
    <Paragraph>Tag-Selection</Paragraph>
    <CustomSelect value={props.tagType} onChange={props.setTagType} >
      {TagSelectionTypes.map((t) => (
        <StyledOption key={t.id} value={t.name}>
          {t.name}
        </StyledOption>
      ))}
    </CustomSelect>
    </>
  );
}

export const TagSelectionTypes = [
  {id: 0, name: "intersection"},
  {id: 1, name: "union"}
];