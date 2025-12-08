import {Pagination, Stack} from "@mui/material";
import type {ChangeEvent} from "react";

type AnnPaginationProps = {
  page: number;
  count: number;
  handleChange: (event: ChangeEvent<unknown>, value: number) => void;
}

export function AnnPagination({page, count, handleChange}: AnnPaginationProps) {
  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        size="large"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
