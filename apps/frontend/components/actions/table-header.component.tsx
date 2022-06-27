import React, { useEffect, useState } from 'react';
import { Button, createStyles, InputWrapper, TextInput } from '@mantine/core';
import { RotateClockwise, Search } from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useDebouncedValue } from '@mantine/hooks';
import Filter from './drawer/filter.drawer';

interface TableHeaderProps {
  handleResetFilter(): void;
  actions: React.ReactNode;
  setSearch(val: string): void;
  search: string;
}

const TableHeader: React.FC<TableHeaderProps> = (props) => {
  const [isFilterShown, setFilterShown] = useState<boolean>(false);
  const { classes } = useStyles();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    props.setSearch(value);
  };

  return (
    <div className={classes.container}>
      <InputWrapper label="Search">
        <TextInput
          placeholder="Search by name..."
          mb="md"
          icon={<Search size={14} />}
          value={props.search}
          onChange={handleSearchChange}
        />
      </InputWrapper>

      <div className={classes.actions}>
        <Button
          onClick={() => props.handleResetFilter()}
          color="orange"
          variant="outline"
        >
          <RotateClockwise color={FPT_ORANGE_COLOR} />
        </Button>
        <Button onClick={() => setFilterShown(!isFilterShown)}>Fitler</Button>
        {props.actions}
      </div>
      <Filter
        isShown={isFilterShown}
        toggleShown={() => setFilterShown(!isFilterShown)}
      />
    </div>
  );
};

const useStyles = createStyles((theme) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 10,
      marginLeft: 10,
    },
  };
});

export default TableHeader;
