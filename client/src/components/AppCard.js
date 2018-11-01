import React, { Component } from 'react';
import AppCardsInCard from './AppCardsInCard';
import {
    Card,
    Button,
    CardText,
    Row,
    Col,
    CardTitle,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    Collapse,
    CardDeck
} from 'reactstrap';

class AppCard extends Component {

    state = {
        isOpen: false
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    collapse = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }
    render() {
        return (
            <div>
                <Container>
                    <CardDeck>
                        <Card body>
                            <CardTitle>
                                <h1>A1</h1>
                            </CardTitle>
                            <CardText>มีห้องว่าง</CardText>
                            <Button onClick={this.toggle}>ดูรายละเอียด</Button>
                            <Modal isOpen={this.state.modal} className="modal-lg">
                                <ModalHeader toggle={this.toggle}>ห้องของตึก A1</ModalHeader>
                                <ModalBody>
                                    <AppCardsInCard />
                                </ModalBody>
                            </Modal>
                        </Card>
                    </CardDeck>

                </Container>
            </div>
        );
    }
}

export default AppCard;