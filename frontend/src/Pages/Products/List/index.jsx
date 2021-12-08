import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { ModalCreateProduct } from "../../../Components/Modal/ModalCreateProduct";
import { ProductCard } from "../../../Components/Product";
import { setLoading } from "../../../Context/GlobalContext/actions";
import { useGlobalContext } from "../../../Context/GlobalContext/context";
import { env } from "../../../Environment";

function App() {

  const { dispatch } = useGlobalContext();

  const isMounted = useRef(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [products, setProducts] = useState({
    result: [],
    total: 0,
    page: 1,
    per_page: 5,
    total_pages: 0
  });


  const getProducts = async () => {
    setLoading(dispatch);

    const body = new FormData();
    body.append('page', products.page)
    body.append('limit', products.per_page)

    const res = await fetch(env.api.url.dev + '?page=products&method=list',
      {
        method: 'post',
        body
      })
    const json = await res.json();
    setProducts({ ...json });
    setLoading(dispatch);
  }

  const nextPage = () => {
    products.page = products.page + 1
    setProducts(products)
    getProducts()
  }

  const previusPage = () => {
    products.page = products.page - 1
    setProducts(products)
    getProducts()
  }

  const goToPage = (page) => {
    products.page = page;
    setProducts(products)
    getProducts()
  }

  useEffect(() => {
    if (isMounted.current) {
      getProducts();      
    }

    return () => isMounted.current = false;
  }, [getProducts])

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
        handleShow={handleShow}
        getProducts={getProducts}
      />


      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={products.page === 1 ? "page-item disabled" : "page-item"}>
            <a href="#/" className="page-link" onClick={() => previusPage()}>Previous</a>
          </li>
          {products.total_pages !== 0 && [...Array(products.total_pages)].map((v, i) => {
            return (
              <li key={i} className={products.page === i + 1? "page-item active" : "page-item"} onClick={() => goToPage(i + 1)}>
                <a  href="#/" className="page-link">{i + 1}</a>
              </li>
            )
          })}
          <li className={products.page === products.total_pages ? "page-item disabled" : "page-item"}>
            <a  href="#/" className="page-link" onClick={() => nextPage()}>Next</a>
          </li>
        </ul>
      </nav>

    </div>
  );
}

export default App;
