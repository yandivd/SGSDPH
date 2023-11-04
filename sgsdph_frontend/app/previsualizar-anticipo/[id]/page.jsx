import React from 'react';
import TableAnticipo from "../TableAnticipo";
import TableTrabajadores from "../TableTrabajadores";

const Page = () => {
    return (
        <div className={'p-5'} style={{ width: 'max-content' }}>
           <TableAnticipo />

            <TableTrabajadores />
        </div>
    );
};

export default Page;