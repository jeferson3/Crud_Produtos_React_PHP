import { useState } from "react"
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap"
import { useGlobalContext } from "../../../Context/GlobalContext/context";
import { getProducts, updateProducts } from "../../../Context/GlobalContext/actions";

export const ModalUpdateProduct = ({ product, show, handleClose }) => {

  const { state: { products, categories }, dispatch } = useGlobalContext();

  const [inputName, setInputName] = useState(product.name);
  const [inputPrice, setInputPrice] = useState(product.price[0]);
  const [inputCategoryId, setInputCategoryId] = useState(product.category_id[0]);
  const [inputPurchaseTime, setInputPurchaseTime] = useState(product.purchase_time[0]);
  const [inputPerishable, setInputPerishable] = useState(product.is_perishable ? 1 : 2);

  const disableButtonSave = (!inputName || !inputPrice || !inputCategoryId ||
    !inputPurchaseTime || !inputPerishable);

  const handleSubmitForm = async () => {

    handleClose();

    updateProducts(dispatch, {
      id: product.id,
      inputName,
      inputPrice,
      inputCategoryId,
      inputPurchaseTime,
      inputPerishable

    }, products)

  }

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
          <Modal.Title className="text-uppercase">Editar Produto #{product.id}</Modal.Title>
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
                    <Form.Control placeholder="nome" value={inputName} onChange={e => setInputName(e.target.value)} />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <Form.Group className="pb-2">
                  <FloatingLabel controlId="category_id" label="Categoria">
                    <Form.Select onChange={e => setInputCategoryId(e.target.value)} defaultValue={inputCategoryId}>
                      <option>{"Selecione uma categoria"}</option>
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
                    <Form.Control type="number" value={inputPrice} onChange={e => setInputPrice(e.target.value)} placeholder="preço" />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <Form.Group className="pb-2">
                  <FloatingLabel
                    controlId="purchase_time"
                    label="Data Compra"
                  >
                    <Form.Control type="datetime-local" value={inputPurchaseTime} onChange={e => setInputPurchaseTime(e.target.value)} />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <Form.Group className="pb-2">
                  <Form.Label>Perecível: </Form.Label>
                  <Form.Check onClick={() => setInputPerishable(1)} type="radio" id="perishable-s" name="perishable" label="Sim" defaultChecked={inputPerishable === 1} />
                  <Form.Check onClick={() => setInputPerishable(2)} type="radio" id="perishable-n" name="perishable" label="Não" defaultChecked={inputPerishable === 2} />
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