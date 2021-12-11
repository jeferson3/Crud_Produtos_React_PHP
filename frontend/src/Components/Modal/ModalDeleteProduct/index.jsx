import { Modal, Button } from "react-bootstrap"
import { deleteProducts, getProducts } from "../../../Context/GlobalContext/actions";
import { useGlobalContext } from "../../../Context/GlobalContext/context";

export const ModalDeleteProduct = ({ product, show, handleClose }) => {

    const { state: { products }, dispatch } = useGlobalContext();

    const handleDeleteProduct = () => {

        handleClose();

        deleteProducts(dispatch, {
            id: product.id
        })
        
        getProducts(products.page, products.per_page, dispatch);

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
                    <Modal.Title className="text-uppercase">Deletar Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Confirme a exclusão do produto #{product.name}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleClose()}
                    >
                        Fechar
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleDeleteProduct()}
                    >
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
