import {
  useAutocomplete,
  AutocompleteGetTagProps,
} from '@mui/base/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { Tag as TagType } from '../../../Interface';

// const Root = styled('div')(
//   ({ theme }) => `
//   color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
//   font-size: 14px;
// `,
// );

const Root = styled('div')(
  ({ theme }) => `
  font-size: 14px;
`,
);

const Label = styled('label')`
  padding: 0 0 4px 0;
  line-height: 1.5;
  display: block;
  font-size: 14px;
`;

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 300px;
  min-height: 30px;
  min-width: 250px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 7px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
    border-radius: 7px;
  }
`,
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
  className: string;
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  color: ${theme.palette.mode === 'dark' ? '#DAECFF' : '#003A75'};
  background-color: ${theme.palette.mode === 'dark' ? '#003A75' : '#DAECFF'};
  border: 1px solid ${theme.palette.mode === 'dark' ? '#2D3843' : '#CDD2D7'};
  border-radius: 5px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    box-shadow: 0 0 1px 1px #40a9ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 3px;
    margin-left: 3px;
  }
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: calc(100% - 12px);
  padding: 5px;
  position: absolute;
  list-style: none;
  overflow: auto;
  min-width: 240px;
  max-height: 250px;
  border-radius: 7px;
  background: ${theme.palette.mode === 'dark' ? '#1A2027' : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? '#2D3843' : '#CDD2D7'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 6px 12px;
    display: flex;
    cursor: pointer;
    border-radius: 5px;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    color: ${theme.palette.mode === 'dark' ? '#DAECFF' : '#003A75'};
    background-color: ${theme.palette.mode === 'dark' ? '#003A75' : '#DAECFF'};
    font-weight: 600;

    & svg {
      color: ${theme.palette.mode === 'dark' ? '#DAECFF' : '#003A75'};
    }
  }

  & .Mui-focusVisible{
    background-color: ${theme.palette.mode === 'dark' ? '#2D3843' : '#E7EBF0'} !important;
    color: ${theme.palette.mode === 'dark' ? '#CDD2D7' : '#1A2027'};
  }

  & li:hover {
    background-color: ${theme.palette.mode === 'dark' ? '#2D3843' : '#E7EBF0'};
    color: ${theme.palette.mode === 'dark' ? '#CDD2D7' : '#1A2027'};
    cursor: pointer;

    & svg {
      color: ${theme.palette.mode === 'dark' ? '#CDD2D7' : '#1A2027'};
    }
  }
`,
);

interface TagOptionProps {
  tags: TagType[];
  setSelectedTags: Function;
}

// export const FilterPopup: React.FC<FilterPopupProps> = (props: FilterPopupProps) => {
export const TagAutocomplete: React.FC<TagOptionProps> = (props: TagOptionProps) => {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    setAnchorEl,
  } = useAutocomplete({
    id: 'tagInput',
    multiple: true,
    options: props.tags,
    getOptionLabel: (option) => option.name,
  });

  useEffect(() => {
    props.setSelectedTags(value);
  }, [value])
  // props.setSelectedTags(value);

  return (
    <Root>
      <div {...getRootProps()}>
      {/* <div> */}
        <Label {...getInputLabelProps()}>Tags-Filter</Label>
        <InputWrapper ref={setAnchorEl} className="inputWrapper">
          {
          value.map((option: TagType, index: number) => {
            return (
              <StyledTag className="pinnedTag" label={option.name} {...getTagProps({ index })} />
            )
          })}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox className="dropdownList" {...getListboxProps()}>
          {(groupedOptions as typeof props.tags).map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.name}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}

// const tags = [
//   { name: 'drink', id: 1 },
//   { name: 'eat', id: 2 },
//   { name: 'italian', id: 3 },
//   { name: 'german', id: 4 },
//   { name: 'cheese', id: 5 }
// ];
