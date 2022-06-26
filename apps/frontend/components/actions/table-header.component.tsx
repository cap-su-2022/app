import React, { useEffect, useState } from 'react';
import { Button, createStyles, InputWrapper, TextInput } from '@mantine/core';
import { RotateClockwise, Search } from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useDebouncedValue } from '@mantine/hooks';

interface TableHeaderProps {
  handleResetFilter(): void;
  actionsLeft: React.ReactNode;
  actionsRight: React.ReactNode;
  setSearch(val: string): void;
  search: string;
}

const TableHeader: React.FC<TableHeaderProps> = (props) => {
  const { classes } = useStyles();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    props.setSearch(value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.displayFlex}>
        <InputWrapper label="Search">
          <TextInput
            placeholder="Search by name..."
            mb="md"
            icon={<Search size={14} />}
            defaultValue=""
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
          {props.actionsLeft}
        </div>
      </div>
      <div className={classes.actions}>{props.actionsRight}</div> 
    </div>
  );
};

const useStyles = createStyles((theme) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 10,
      marginLeft: 10,
    },
    displayFlex: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  };
});

export default TableHeader;
