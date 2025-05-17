import React from 'react';
import { Box, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function TableSkeleton({ 
  headerCells = [], 
  rowCount = 4,
  showAddButton = false 
}) {
  return (
    <>
      <Box sx={{ 
        mb: 3, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Skeleton variant="text" width={200} height={40} />
        {showAddButton && <Skeleton variant="circular" width={40} height={40} />}
      </Box>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {headerCells.map((cell, index) => (
                <TableCell key={index} align={cell.align || 'left'}>
                  {cell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(rowCount)].map((_, index) => (
              <TableRow key={index}>
                {headerCells.map((cell, cellIndex) => (
                  <TableCell 
                    key={cellIndex}
                    align={cell.align || 'left'}
                  >
                    <Skeleton width={cell.width || 100} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
