/* This TypeScript code defines an interface named `PaginationComponentProps` with three properties:
1. `currentPage` of type `number` representing the current page number.
2. `totalPages` of type `number` representing the total number of pages.
3. `onPageChange` which is a function that takes a `number` parameter (representing the new page)
and returns `void`. */
interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default PaginationComponentProps;
