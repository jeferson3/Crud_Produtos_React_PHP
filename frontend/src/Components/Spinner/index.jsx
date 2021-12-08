import { Spinner } from "react-bootstrap"
import { useGlobalContext } from "../../Context/GlobalContext/context"
import { Container } from "../Container"

export function SpinnerContainer() {

    const { state: { loading }, } = useGlobalContext();

    return (
        <>
            {!!loading && <Container centered={true} overlay={true} height={100}>
                <Spinner animation="grow" />
            </Container>}
        </>
    )
}