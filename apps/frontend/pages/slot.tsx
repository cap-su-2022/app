import AdminLayout from '../components/layout/admin.layout';
import SlotManagement from '../components/slot';
import Header from '../components/common/header.component';
import { BuildingWarehouse } from 'tabler-icons-react';
import React from 'react';
import Head from 'next/head';

function SlotPage() {
  return (
    <>
      <Head>FLRBMS | Slot Management</Head>
      <SlotManagement />
    </>
  );
}

export default SlotPage;
