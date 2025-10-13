import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export function PaginationTaskList({
  handlePageChange,
  handleNextPage,
  handlePreviousPage,
  page,
  totalPages,
}: {
  handlePageChange: (page: number) => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  page: number;
  totalPages: number;
}) {
  type PageNumber = number | '...';
  const maxPageButtons = 4; // Maximum number of page buttons to display
  const generatePageNumbers = (totalPages: number): PageNumber[] => {
    const pages: PageNumber[] = [];
    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 2) {
        pages.push(1, 2, 3, '...', totalPages);
      }
      else if (page >= totalPages - 1) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      }
      else {
        pages.push(1, '...',page, '...', totalPages);
      }
    }
    return pages;
  };
  const pageNumbers: PageNumber[] = generatePageNumbers(totalPages);

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={page === 1 ? undefined : handlePreviousPage}
              className={cn("cursor-pointer", page === 1 && "pointer-events-none opacity-50")}
            />
          </PaginationItem>

          {pageNumbers.map((pageNum: PageNumber, index: number) => (
            <PaginationItem key={index}>
              {pageNum === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={page === pageNum}
                  onClick={() => {
                    if (pageNum != page) handlePageChange(pageNum as number);
                  }}
                  className={cn(
                    "cursor-pointer",
                    page === pageNum && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  )}
                >
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={page === totalPages ? undefined : handleNextPage}
              className={cn("cursor-pointer", (page === totalPages || !page) && "pointer-events-none opacity-50")}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
