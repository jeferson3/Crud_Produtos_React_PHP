import { useEffect, useState } from "react"
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap"
import { env } from "../../../Environment";


export const ModalCreateProduct = ({ show, handleClose, handleShow }) => {

    const [inputName, setInputName] = useState(null);
    const [inputPrice, setInputPrice] = useState(null);
    const [inputCategoryId, setInputCategoryId] = useState(null);
    const [inputPurchaseTime, setInputPurchaseTime] = useState(null);
    const [inputPerishable, setInputPerishable] = useState(true);
    
    const [categories, setCategories] = useState([]);

    const disableButtonSave = (!inputName || !inputPrice || !inputCategoryId ||
        !inputPurchaseTime || !inputPerishable);

    useEffect(() => {
        
        async function getCategories() {
            const res = await fetch(env.api.url.dev, { method: 'post' })
            const resJson = await res.json();
            setCategories(resJson);
        }
console.log(env.api.url.dev);
        // getCategories();

    }, [])

    return (
        <Modal
        show={show}
        onHide={() => handleClose() }
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
                    <Form.Select  onChange={e => setInputCategoryId(e.target.value)}>
                      <option>Selecione uma cetegoria</option>
                      <option>Alimentação</option>
                      <option>Vestimenta</option>
                      <option>Outra</option>
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
                  <Form.Check onClick={() => setInputPerishable(true)} type="radio" id="perishable-s" name="perishable" label="Sim" defaultChecked />
                  <Form.Check onClick={() => setInputPerishable(false)} type="radio" id="perishable-n" name="perishable" label="Não" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => handleClose()}>
            Fechar
          </Button>
          <Button variant="primary" size="sm" disabled={disableButtonSave} onClick={() => handleClose()}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    )
}