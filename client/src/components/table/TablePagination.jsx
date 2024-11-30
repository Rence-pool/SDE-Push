import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import PropTypes from "prop-types";
export default function TablePagination({ table }) {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  // Generate page numbers to display
  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (pageCount <= maxPagesToShow) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    } else {
      const leftSide = Math.max(1, currentPage - 2);
      const rightSide = Math.min(pageCount, currentPage + 2);

      if (leftSide > 1) pages.push(1);
      if (leftSide > 2) pages.push("...");

      for (let i = leftSide; i <= rightSide; i++) {
        pages.push(i);
      }

      if (rightSide < pageCount - 1) pages.push("...");
      if (rightSide < pageCount) pages.push(pageCount);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex w-full items-center p-4">
      <div className="flex-1 items-center font-semibold">
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected
      </div>

      <div className="justce flex items-center justify-center space-x-2 justify-self-center">
        {/* First Page */}
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft />
        </Button>

        {/* Previous Page */}
        <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft />
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {pageNumbers.map((page, index) => (
            <Button
              key={index}
              variant={page === currentPage ? "default" : "outline"}
              className="h-8 w-8 p-0"
              onClick={() => {
                if (typeof page === "number") {
                  table.setPageIndex(page - 1);
                }
              }}
              disabled={typeof page !== "number"}
            >
              {page}
            </Button>
          ))}
        </div>

        {/* Next Page */}
        <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <span className="sr-only">Go to next page</span>
          <ChevronRight />
        </Button>

        {/* Last Page */}
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}

TablePagination.propTypes = {
  table: PropTypes.object,
};
