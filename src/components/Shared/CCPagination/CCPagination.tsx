import { Box, Pagination } from "@mui/material";

type TCCPaginationProps = {
  pageCount: number;
  page: number;
  handleChange: any;
};

const CCPagination = ({ pageCount, page, handleChange }: TCCPaginationProps) => {
  return (
    <Box
      sx={{
        mt: 4,
        mb: 2,
       

        display: "flex",
        justifyContent: "center",
      }}
    >
      <Pagination
        color="primary"
        count={pageCount}
        page={page}
        onChange={handleChange}
      />
    </Box>
  );
};

export default CCPagination;
