import { getProducts, paginationSetPage } from "../../Context/GlobalContext/actions";
import { useGlobalContext } from "../../Context/GlobalContext/context";

export const Pagination = ({ page, perPage, setPage }) => {

    const { state: { products }, dispatch } = useGlobalContext();

    const nextPage = () => {
        goToPage(page + 1);
    }

    const previusPage = () => {
        goToPage(page - 1);
    }

    const goToPage = (page_n) => {
        setPage(page_n)
        paginationSetPage(dispatch, page);
        getProducts(page_n, perPage, dispatch);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={products.page === 1 ? "page-item disabled" : "page-item"}>
                    <a href="#/" className="page-link" onClick={() => previusPage()}>Previous</a>
                </li>
                {products.total_pages !== 0 && [...Array(products.total_pages)].map((v, i) => {
                    return (
                        <li key={i} className={products.page === i + 1 ? "page-item active" : "page-item"} onClick={() => goToPage(i + 1)}>
                            <a href="#/" className="page-link">{i + 1}</a>
                        </li>
                    )
                })}
                <li className={products.page === products.total_pages ? "page-item disabled" : "page-item"}>
                    <a href="#/" className="page-link" onClick={() => nextPage()}>Next</a>
                </li>
            </ul>
        </nav>
    )
}