import { Button } from "react-bootstrap";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  res: any;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  res,
}) => {
  return (
    <div
      className="d-flex justify-content-evenly py-4"
      data-test-id="pagination-component"
    >
      <Button
        variant="dark"
        size="lg"
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </Button>
      <Button
        variant="dark"
        size="lg"
        className="ml-3"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
