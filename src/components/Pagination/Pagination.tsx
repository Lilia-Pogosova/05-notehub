import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface Props {
    pageCount: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    pageCount,
    currentPage,
    onPageChange,
}: Props) {
    return (
        <ReactPaginate
            className={css.pagination}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            pageCount={pageCount}
            forcePage={currentPage - 1}
            onPageChange={(e) => onPageChange(e.selected + 1)}
        />
    );
}
