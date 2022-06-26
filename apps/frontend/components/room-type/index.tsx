import React, { useState } from "react";
import { createStyles } from "@mantine/core";
import AdminLayout from "../AdminLayout";
import Header from "../common/header.component";
import { BuildingWarehouse } from "tabler-icons-react";
import TableHeader from "./table-header.component";
import { useDebouncedValue } from "@mantine/hooks";
import { TableSort } from "./table-body.component";
import { useAppSelector } from "../../redux/hooks";

const ManageRoomType: React.FC<any> = () => {
  const styles = useStyles();
  const [search, setSearch] = useState<string>("");
  const [debouncedSearchValue] = useDebouncedValue(search, 400);
  const roomTypes = useAppSelector((state) => state.);

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
      <TableSort data={} />
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
