import { useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { setLoading, setToast } from "../../Context/GlobalContext/actions";
import { useGlobalContext } from "../../Context/GlobalContext/context";
import { env } from "../../Environment";

export const ProductCard = ({ product, getProducts }) => {

    const { state: { toast }, dispatch } = useGlobalContext();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmitForm = async () => {

        handleClose();
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
                        variant="danger"
                        size="sm"
                        className="mx-2"
                        onClick={handleShow}
                    >Delete</Button>
                </td>
            </tr>
            <Modal
                show={show}
                onHide={() => handleClose()}
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
                    <Button variant="secondary" size="sm" onClick={() => handleClose()}>
                        Fechar
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSubmitForm()}>
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}