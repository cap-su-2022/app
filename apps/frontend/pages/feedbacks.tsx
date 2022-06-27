import { createStyles } from '@mantine/core';
import { useAppDispatch } from '../redux/hooks';
import AdminLayout from '../components/layout/admin.layout';

function FeedbacksPage() {
  const { classes } = useStyle();

  const dispatch = useAppDispatch();

  return <AdminLayout></AdminLayout>;
}

const useStyle = createStyles((theme) => {
  return {};
});

export default FeedbacksPage;
