import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { getProducts, paginationSetPage } from "../../Context/GlobalContext/actions";
import { useGlobalContext } from "../../Context/GlobalContext/context";
import { ModalCreateProduct } from "../../Components/Modal/ModalCreateProduct";
import { ProductCard } from "../../Components/Product";

function App() {

  const { state: { products }, dispatch } = useGlobalContext();

  const isMounted = useRef(true);

  const [page, setPage] = useState(products.page);
  const [perPage,] = useState(products.per_page);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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

  useEffect(() => {

    if (isMounted.current) {
      getProducts(page, perPage, dispatch)
    }
    return () => isMounted.current = false;
  }, [dispatch, page, perPage])

  return (
    <div style={{ padding: '10px 50px' }}>
      <h1 className="text-uppercase text-center mt-3">Minhas Compras</h1>
      <div className="pt-4 pb-1">
        <Button size="sm" variant="success" onClick={() => setShow(true)}>
          Adicionar
        </Button>
      </div>
      <table className="table table-stripped table-dark">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Perecível</th>
            <th>Data Compra</th>
            <th className="text-right"></th>
          </tr>
        </thead>
        <tbody>
          {!!products.result && products.result.map(p => {
            return <ProductCard key={p.id} product={p} getProducts={getProducts} />
          })}
        </tbody>
      </table>

      <ModalCreateProduct
        show={show}
        handleClose={handleClose}
      />


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

    </div>
  );
}

export default App;
