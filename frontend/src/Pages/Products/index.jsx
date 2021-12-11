import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { getProducts } from "../../Context/GlobalContext/actions";
import { useGlobalContext } from "../../Context/GlobalContext/context";
import { ModalCreateProduct } from "../../Components/Modal/ModalCreateProduct";
import { ProductCard } from "../../Components/Product";
import { Pagination } from "../../Components/Pagination";

function App() {

  const { state: { products }, dispatch } = useGlobalContext();

  const isMounted = useRef(true);

  const [page, setPage] = useState(products.page);
  const [perPage,] = useState(products.per_page);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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
            return <ProductCard key={p.id} product={p} />
          })}
        </tbody>
      </table>

      <ModalCreateProduct
        show={show}
        handleClose={handleClose}
      />

      <Pagination
        page={page}
        perPage={perPage}
        setPage={setPage}
      />

    </div>
  );
}

export default App;
