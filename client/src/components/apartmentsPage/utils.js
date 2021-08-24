


export const createPagination = (currentPage, resultsCount) => {
    const maxBooksInPage = 10;
    const pagesCount = Math.ceil((resultsCount / maxBooksInPage))
    const newPagination = { pagesList: [] };

    newPagination.previous = currentPage !== 1 ? true : false;
    newPagination.next = currentPage !== pagesCount ? true : false;
    newPagination.first = currentPage > 3 ? 1 : null;
    newPagination.last = pagesCount - currentPage > 2 ? pagesCount : null;

    const firstPage = Math.max(1, (pagesCount - (currentPage - 2) >= 4 ? currentPage - 2 : pagesCount - 4))

    for (let i = firstPage; i < firstPage + 5 && i <= pagesCount; i++) {
        newPagination.pagesList[newPagination.pagesList.length] = (i !== currentPage ? { pageNumber: i } : { currentPage });
    }
    console.log(newPagination);
    return newPagination;
}
