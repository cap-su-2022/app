import React, { useState } from "react";
import { createStyles } from "@mantine/core";
import AdminLayout from "../AdminLayout";
import Header from "../common/header.component";
import { BuildingWarehouse } from "tabler-icons-react";
import TableHeader from "./table-header.component";
import { useDebouncedValue } from "@mantine/hooks";

const ManageRoomType: React.FC<any> = () => {
  const styles = useStyles();
  const [search, setSearch] = useState<string>('');
  const [debouncedSearchValue] = useDebouncedValue(search, 400);

  return (
    <AdminLayout>
      <Header
        title="Room Type"
        icon={<BuildingWarehouse size={50}/> }/>
      <TableHeader
        searchText={debouncedSearchValue}
        handleChangeSearchText={(val) => setSearch(val)}
        toggleAddModalShown={null}
        toggleRestoreDisabledModalShown={null}
        toggleRestoreDeletedModalShown={null}
        toggleDownloadModalShown={null}
        />
    </AdminLayout>
  );
};

const useStyles = createStyles((theme) => {
    return {
      container: {

      }
    };
});

export default ManageRoomType;
