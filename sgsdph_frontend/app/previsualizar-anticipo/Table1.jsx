import React from 'react';

const Table1 = () => {
    return (
        <div>
            <table className={'tableAnticipo'}>

                <thead className={'p-3 text-center'}>
                    <tr>
                        <th style={{ width: '0.76in', height: '0.42in' }}>
                            Centro contable
                        </th>
                        <th style={{ width: '2.49in', height: '0.42in' }}>Nombre del Trabajador</th>
                        <th style={{ width: '1.86in', height: '0.42in' }}
                            rowSpan={3}
                            colSpan={3}
                        >Dias estimados de viajes</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>wkfqfg</td>
                        <td>wkfqfg</td>
                        <td>wkfqfg</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>wkfqfg</td>
                        <td>wkfqfg</td>
                        <td>wkfqfg</td>
                    </tr>
                </tbody>

                <br/><br/>




            </table>
        </div>
    );
};

export default Table1;