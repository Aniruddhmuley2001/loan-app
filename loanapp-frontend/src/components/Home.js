import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from "react-bootstrap/Card";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Welcome to our Home Page</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <Card border="light">
                                <Card.Body>
                                    <Card.Title>Already a user?</Card.Title>
                                    <Button onClick={() => navigate("/user/login")}>Login</Button>
                                </Card.Body>
                            </Card>

                            <Card border="light">
                                <Card.Body>
                                    <Card.Title>Register to apply for loan..</Card.Title>
                                    <Button onClick={() => navigate("/user/register")}>Register</Button>
                                </Card.Body>
                            </Card>

                            <Card border="light">
                                <Card.Body>
                                    <Card.Title>Login as Admin</Card.Title>
                                    <Button onClick={() => navigate("/admin/login")}>Login as Admin</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </Modal.Body>
                </Modal.Dialog>
            </div>
        </>
    )
}

export default Home;