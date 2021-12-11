import { useState } from "react";
import { Button } from "react-bootstrap"
import { ModalDeleteProduct } from "../Modal/ModalDeleteProduct";
import { ModalUpdateProduct } from "../Modal/ModalUpdateProduct";

export const ProductCard = ({ product }) => {

    const [showFormDelete, setShowFormDelete] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);

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
                        onClick={() => setShowFormEdit(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        className="mx-2"
                        onClick={() => setShowFormDelete(true)}
                    >
                        Delete
                    </Button>
                </td>
            </tr>

            <ModalDeleteProduct
                product={product}
                show={(showFormDelete)}
                handleClose={() => setShowFormDelete(false)}
            />

            <ModalUpdateProduct
                product={product}
                show={(showFormEdit)}
                handleClose={() => setShowFormEdit(false)}
            />
        </>
    )
}