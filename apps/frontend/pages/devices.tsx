import {createStyles} from "@mantine/core";
import {useAppDispatch} from "../redux/hooks";
import AdminLayout from "../components/AdminLayout";

function DevicesPage() {

  const {classes} = useStyle();
  const dispatch = useAppDispatch();

  return (
    <AdminLayout>

    </AdminLayout>
  );

}

const useStyle = createStyles((theme) => {
  return {

  };
});

export default DevicesPage;
