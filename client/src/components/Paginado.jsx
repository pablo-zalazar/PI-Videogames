import React from "react";
import { useSelector } from "react-redux";

import s from "./Paginado.module.css";

export default function Paginado({ gamesPerPage, allGames, paginado }) {
  const pages = Math.ceil(allGames / gamesPerPage);
  const pageNumbers = [];

  const currentPage = useSelector((state) => state.currentPage);

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <h3>Pages</h3>
      <ul>
        <div className={s.paginado}>
          {currentPage - 1 > 0 ? (
            <p
              onClick={() => paginado(currentPage - 1)}
              className={s.next_previous}
            >
              previous
            </p>
          ) : null}
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li className="number" key={number}>
                {number === currentPage ? (
                  <a onClick={() => paginado(number)} className={s.current}>
                    {number}
                  </a>
                ) : (
                  <a onClick={() => paginado(number)}>{number}</a>
                )}
              </li>
            ))}
          {pages > currentPage ? (
            <p
              onClick={() => paginado(currentPage + 1)}
              className={s.next_previous}
            >
              next
            </p>
          ) : null}
        </div>
      </ul>
    </nav>
  );
}
