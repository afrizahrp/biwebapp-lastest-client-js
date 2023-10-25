import { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';

const Pagination = ({ itemsCount, pageSize, onPageChange }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(newPage + 1); // Menambahkan 1 karena indeks halaman dimulai dari 0
  };

  const handleChangeRowsPerPage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setRowsPerPage(newPageSize);
    onPageChange(1); // Mengatur halaman kembali ke halaman 1 saat mengubah jumlah data per halaman
  };

  return (
    <TablePagination
      component="div"
      count={itemsCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
