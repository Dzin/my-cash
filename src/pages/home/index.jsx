import React, { useState } from "react";
import TransactionRegistration from "../../components/modal/TransactionRegistration";

export default function Home() {
  const [openRegistration, setOpenRegistration] = useState(false);

  return (
    <>
      <h1>Control Finances</h1>
      <TransactionRegistration
        open={openRegistration}
        setOpen={setOpenRegistration}
      />
    </>
  );
}
