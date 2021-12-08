import { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { ModalCreateProduct } from "../../../Components/Modal/ModalCreateProduct";
import { useGlobalContext } from "../../../Context/GlobalContext/context";
import { setLoading } from "../../../Context/GlobalContext/actions";

function App() {

  const { dispatch } = useGlobalContext();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ textAlign: "right" }}>
              <Button variant="danger" size="sm" className="mx-2">Delete</Button>
            </td>
          </tr>
        </tbody>
      </table>

      <ModalCreateProduct
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />


      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link">Previous</a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>

    </div>
  );
}

export default App;
