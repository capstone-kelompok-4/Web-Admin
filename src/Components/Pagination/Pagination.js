import React from 'react';
import ChevronLeft from "../../Assets/Icons/chevron_left.svg";
import ChevronRight from "../../Assets/Icons/chevron_right.svg";
import classes from "./Pagination.module.css";

function Pagination({ dataPerPage, totalData, paginate, prevPage, nextPage, currentPage}) {
  const pageNumber = [];

  for(let i = 1; i <= Math.ceil(totalData / dataPerPage); i++ ){
    pageNumber.push(i);
  }

  const lastPage = pageNumber[pageNumber.length-1];

  return (
    <nav>
      <ul className='pagination align-items-center mb-0'>
        { currentPage !== 1 &&
          <li className='page-item'>
            <button className="page-link" onClick={() => prevPage(currentPage - 1)} style={{backgroundColor: "transparent", border: "none", color: "#0D2341"}}>
              <img src={ChevronLeft} width="20px" height="20px" alt="chevronLeft"/>
            </button>
          </li>
        }
        {pageNumber.map(number => {
          return(
            <li 
              key={number} 
              className="page-item"
            >
              <button 
                onClick={() => paginate(number)} className={`page-link ${classes.pageLink}`} 
                style={{color: currentPage === number ? "#FF6C00": "#0D2341", border: "none", backgroundColor: currentPage === number ? "#FFE2CC" : "transparent"}}
              >{number}
              </button>
            </li>
          )
        })}
        { currentPage !== lastPage &&
          <li className='page-item'>
            <button className="page-link" onClick={() => nextPage(currentPage + 1)} style={{backgroundColor: "transparent", border: "none", color: "#0D2341"}}>
              <img src={ChevronRight} width="20px" height="20px" alt="chevronRight"/>
            </button>
          </li>
        }
      </ul>
    </nav>
  )
}

export default Pagination