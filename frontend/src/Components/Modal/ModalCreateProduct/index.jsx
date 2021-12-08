import { useEffect, useState } from "react"
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap"
import { env } from "../../../Environment";
import { useGlobalContext } from "../../../Context/GlobalContext/context";
import { setLoading, setToast } from "../../../Context/GlobalContext/actions";

export const ModalCreateProduct = ({ show, handleClose, getProducts }) => {

  const { state: {toast}, dispatch } = useGlobalContext();

  const [inputName, setInputName] = useState('name');
  const [inputPrice, setInputPrice] = useState(100);
  const [inputCategoryId, setInputCategoryId] = useState(1);
  const [inputPurchaseTime, setInputPurchaseTime] = useState('2021-10-10 12:03');
  const [inputPerishable, setInputPerishable] = useState(1);

  const [categories, setCategories] = useState([]);

  const disableButtonSave = (!inputName || !inputPrice || !inputCategoryId ||
    !inputPurchaseTime || !inputPerishable);

  const clearInputs = () => {
    setInputName(null);
    setInputPrice(null);
    setInputPerishable(null);
    setInputPurchaseTime(null);
    setInputCategoryId(null);
  }
  const handleSubmitForm = async () => {

    handleClose();

    setLoading(dispatch);

    const body = new FormData();
    body.append('name', inputName);
    body.append('price', inputPrice);
    body.append('category_id', inputCategoryId);
    body.append('purchase_time', inputPurchaseTime);
    body.append('is_perishable', inputPerishable);

    const res = await fetch(env.api.url.dev + '?page=products&method=create',
      {
        method: 'post',
        body
      })

    const json = await res.json();

    setLoading(dispatch);

    if (json.status) setToast(dispatch, {...toast, status: true, type: 'primary', msg: json.message})
    else  setToast(dispatch, {...toast, status: true, type: 'danger', msg: json.message})

    getProducts();
    clearInputs()

  }

  useEffect(() => {

    async function getCategories() {
      const res = await fetch(env.api.url.dev + '?page=categories&method=list',
        {
          method: 'post'
        })
      const resJson = await res.json();
      setCategories(resJson);
    }
    getCategories();
  }, [])

  return (
    <>
      <Modal
        show={show}
        onHide={() => handleClose()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-uppercase">Novo Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <Form.Group className="pb-2">
                  <FloatingLabel
                    controlId="name"
                    label="Nome"
                  >
                    <Form.Control placeholder="nome" onChange={e => setInputName(e.target.value)} />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <Form.Group className="pb-2">
                  <FloatingLabel controlId="category_id" label="Categoria">
                    <Form.Select onChange={e => setInputCategoryId(e.target.value)}>
                      <option>Selecione uma cetegoria</option>
                      {!!categories && categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <Form.Group className="pb-2">
                  <FloatingLabel
                    controlId="price"
                    label="Preço"
                  >
                    <Form.Control type="number" onChange={e => setInputPrice(e.target.value)} placeholder="preço" />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <Form.Group className="pb-2">
                  <FloatingLabel
                    controlId="purchase_time"
                    label="Data Compra"
                  >
                    <Form.Control type="datetime-local" onChange={e => setInputPurchaseTime(e.target.value)} />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <Form.Group className="pb-2">
                  <Form.Label>Perecível: </Form.Label>
                  <Form.Check onClick={() => setInputPerishable(1)} type="radio" id="perishable-s" name="perishable" label="Sim" defaultChecked />
                  <Form.Check onClick={() => setInputPerishable(2)} type="radio" id="perishable-n" name="perishable" label="Não" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => handleClose()}>
            Fechar
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={disableButtonSave}
            onClick={() => handleSubmitForm()}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}