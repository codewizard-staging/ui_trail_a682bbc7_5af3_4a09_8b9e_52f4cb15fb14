import React from "react";
import { TablePagination, Grid, Typography } from '@mui/material';
import { ROWSPERPAGE } from "config";

import { GridContainer, CardItem } from "components";

const Component = (props) => {

    const { rowsCount, rows, pageInfo, onActionClicked, onPageClicked } = props;

    const handleChangePage = (event, newPage) => {
        const _page = { page: newPage, pageSize: pageInfo.pageSize };
        if (onPageClicked) onPageClicked(_page);
    };

    const handleChangeRowsPerPage = (event) => {
        /* setPageInfo({ page: 0, pageSize: parseInt(event.target.value, 5) }); */
    };

    const OnActionClicked = (id, type) => {
        if (onActionClicked) onActionClicked(id, type);
    };


    return (
        <>
            <GridContainer>
                {rows && rows.map((x, index) => (
                    <CardItem key={index} keyid={x.StaffID} title={x.StaffID}  width={300}
                        description={x.PhoneNumber} onActionClicked={OnActionClicked}>
                    <Grid container direction="column">
                        <Typography variant="caption" color="text.secondary">
                            <strong>Specialization:</strong>&nbsp;{x.Specialization}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            <strong>Address:</strong>&nbsp;{x.Address}
                        </Typography>
                    </Grid>
                                                                                                                                                                                                                    </CardItem>
                ))}
            </GridContainer>
            {rows && rows.length > 0 && <TablePagination
                component="div"
                count={rowsCount}
                page={pageInfo.page}
                rowsPerPageOptions={ROWSPERPAGE}
                onPageChange={handleChangePage}
                rowsPerPage={pageInfo.pageSize}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}
        </>
    );

};

export default Component;