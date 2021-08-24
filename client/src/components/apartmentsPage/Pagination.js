import React, { useContext, useEffect, useState } from 'react';
import { createPagination } from './utils';
import { SearchContext } from './../../context/SearchContext';
import { getApartmentsHeaders } from './../../api/apartmentsUtils';


const Pagination = ({ resultsCount, setAdsArr }) => {

    const { searchData } = useContext(SearchContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        setPagination(createPagination(1, resultsCount));
    }, [setPagination]);


    const getNextPageFromServer = async (pageNum) => {
        const apartmentsArr = await getApartmentsHeaders(null, pageNum);
        if(apartmentsArr.data){
            setAdsArr(apartmentsArr.data.apartmentsArr);
            setPagination(createPagination(pageNum, resultsCount));
            setCurrentPage(pageNum);
        }
       
    }

    const onClickMoveToAnotherPage = (page) => {
        getNextPageFromServer(page);
    }

    return (
        <div className="pagination__container">
            <div className="pagination">
                {pagination?.first &&
                    <span className="pagination-number">...1</span>
                }
                {pagination?.previous &&
                    <span onClick={() => onClickMoveToAnotherPage(Math.max(0, currentPage - 1))} >
                        <i className="pagination-prev">{">"}</i>
                        <span className="pagination-prev">הקודם</span>
                    </span>
                }
                {pagination?.pagesList?.map((page, index) => {
                    if (page.currentPage) {
                        return <span className="pagination-number current-page" key={index}>{page.currentPage}</span>
                    } else {
                        return <span className="pagination-number" key={index}>{page.pageNumber}</span>
                    }
                })}
                {pagination?.next &&
                    <span onClick={() => onClickMoveToAnotherPage(currentPage + 1)}>
                        <span className="pagination-next">{">"}הבא</span>
                        <i>{">"}</i>
                    </span>
                }
                {pagination?.last &&
                    <span className="pagination-number">{pagination.last}...</span>
                }
            </div>
        </div>
    )
}

export default Pagination
