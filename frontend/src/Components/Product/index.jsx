import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap"
import { setLoading, setToast } from "../../Context/GlobalContext/actions";
import { useGlobalContext } from "../../Context/GlobalContext/context";
import { env } from "../../Environment";

export const ProductCard = ({ product, getProducts }) => {

    const { state: { toast }, dispatch } = useGlobalContext();

    const [showFormDelete, setShowFormDelete] = useState(false);
    const handleCloseFormDelete = () => setShowFormDelete(false);
    const handleshowFormDeleteFormDelete = () => setShowFormDelete(true);

    const [showFormEdit, setShowFormEdit] = useState(false);
    const handleCloseFormEdit = () => setShowFormEdit(false);
    const handleshowFormEditFormEdit = () => setShowFormEdit(true);

    const [inputName, setInputName] = useState(product.name);
    const [inputPrice, setInputPrice] = useState(product.price[0]);
    const [inputCategoryId, setInputCategoryId] = useState(product.category_id[0]);
    const [inputPurchaseTime, setInputPurchaseTime] = useState(product.purchase_time[0]);
    const [inputPerishable, setInputPerishable] = useState(product.is_perishable ? 1 : 2);


    const [categories, setCategories] = useState([]);

    const disableButtonSave = (!inputName || !inputPrice || !inputCategoryId ||
        !inputPurchaseTime || (inputPerishable == null || inputPerishable == undefined));

    const handleSubmitFormDelete = async () => {

        handleCloseFormDelete();
        setLoading(dispatch);

        const body = new FormData();
        body.append('id', product.id);

        const res = await fetch(env.api.url.dev + '?page=products&method=delete',
            {
                method: 'post',
                body
            })

        const json = await res.json();
        setLoading(dispatch);

        if (json.status) setToast(dispatch, { ...toast, status: true, type: 'primary', msg: json.message })
        else setToast(dispatch, { ...toast, status: true, type: 'danger', msg: json.message })

        getProducts();
    }

    const handleSubmitFormUpdate = async () => {

        console.log(inputCategoryId);

        handleCloseFormEdit();

        setLoading(dispatch);

        const body = new FormData();
        body.append('id', product.id);
        body.append('name', inputName);
        body.append('price', inputPrice);
        body.append('category_id', inputCategoryId);
        body.append('purchase_time', inputPurchaseTime);
        body.append('is_perishable', inputPerishable);

        const res = await fetch(env.api.url.dev + '?page=products&method=update',
            {
                method: 'post',
                body
            })

        const json = await res.json();

        setLoading(dispatch);

        if (json.status) setToast(dispatch, { ...toast, status: true, type: 'primary', msg: json.message })
        else setToast(dispatch, { ...toast, status: true, type: 'danger', msg: json.message })

        getProducts();
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
            <tr>
                <td>{product.name}</td>
                <td>{product.category_id[1]}</td>
                <td>R$ {product.price[1]}</td>
                <td>{product.is_perishable ? 'Sim' : 'Não'}</td>
                <td>{product.purchase_time[1]}</td>
                <td style={{ textAlign: "right" }}>
                    <Button
                        variant="success"
                        size="sm"
                        className="mx-2"
                        onClick={handleshowFormEditFormEdit}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        className="mx-2"
                        onClick={handleshowFormDeleteFormDelete}
                    >
                        Delete
                    </Button>
                </td>
            </tr>
            <Modal
                show={showFormDelete}
                onHide={() => handleCloseFormDelete()}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-uppercase">Deletar Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Confirme a exclusão do produto #{product.name}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={() => handleCloseFormDelete()}>
                        Fechar
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSubmitFormDelete()}>
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showFormEdit}
                onHide={() => handleCloseFormEdit()}
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
                                            <option>{"Selecione uma cetegoria"}</option>
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
                                    <Form.Check onClick={() => setInputPerishable(1)} type="radio" id="perishable-s" name="perishable" label="Sim" defaultChecked={inputPerishable} />
                                    <Form.Check onClick={() => setInputPerishable(2)} type="radio" id="perishable-n" name="perishable" label="Não" defaultChecked={!inputPerishable} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={() => handleCloseFormEdit()}>
                        Fechar
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        disabled={disableButtonSave}
                        onClick={() => handleSubmitFormUpdate()}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}