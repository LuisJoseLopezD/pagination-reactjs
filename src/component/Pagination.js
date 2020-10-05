import React from 'react'

const Pagination = ({ postPerPage, totalPosts, paginate }) => {

    const pageNumber = [];

    // la funcion ceil devuelve un número entero mayor o igual más próximo al parámetro dado
    // la funcion push los que hace es agregar un nuevo elemento al final del array y devuelve su nueva length

    for(let i = 1; i <= Math.ceil(totalPosts/postPerPage); i++){
        pageNumber.push(i);
    }

    return (
        <div>
            <nav>
                <ul>{pageNumber.map(number => (
                    <li key={number}>
                        <a onClick={() => paginate(number)} href="!#">{number}</a>
                    </li>
                ))}</ul>    
            </nav>            
        </div>
    )
}

export default Pagination;