import {Button, createStyles} from "@mantine/core";
import AdminLayout from "../components/AdminLayout";
import UsersHeader from "../components/users/header.component";
import {Refresh} from "tabler-icons-react";

function UsersPage() {
  return (
    <AdminLayout>
      <UsersHeader/>
      <div style={{
        display: 'flex'
      }}
      >
        <Button
          leftIcon={<Refresh/>}
        >
          Sync users from Keycloak
        </Button>
      </div>
    </AdminLayout>
  );
};

const useStyles = createStyles({

});

export default UsersPage;
