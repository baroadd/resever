import React, { Component } from 'react';
import {
    Card,
    Button,
    CardText,
    Col,
    CardTitle,
    UncontrolledCollapse,
    CardDeck,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
const items = [
    {
        name: 'A101',
        status: 'Avaliable',
        cleaning: 'ทำความสะอาดเรียบร้อยแล้ว',
        payment: ''
    },
    {
        name: 'A102',
        status: 'Busy',
        cleaning: '',
        payment: 'จ่ายเงินค่าเช่าเรียบร้อยแล้ว'
    },
    {
        name: 'A201',
        status: 'Busy',
        cleaning: '',
        payment: 'ยังไม่ได้จ่ายค่าเช่า'
    },
    {
        name: 'A202',
        status: 'Avaliable',
        cleaning: 'ยังไม่ได้ทำความสะอาด',
        payment: ''
    },
    {
        name: 'A301',
        status: 'Avaliable',
        cleaning: 'ยังไม่ได้ทำความสะอาด',
        payment: ''
    }
]
class AppCardsInCard extends Component {
    state = {
        isOpen: false,
        nestedModal: false,
        closeAll: false
    }

    collapse = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    toggleNested() {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: true
        });
    }

    render() {
        const cleaning = (item) => {
            if (item !== '') {
                return <div>ความสะอาดของห้อง: {item}</div>
            }
            return null;
        }
        const payment = (item) => {
            if (item !== '') {
                if (item === 'ยังไม่ได้จ่ายค่าเช่า') {
                    return <div>การจ่ายเงิน: {item}</div>;
                }
                return <div>การจ่ายเงิน: {item}</div>;
            }
            return null;
        }
        const color = (item) => {
            if (item.status === 'Avaliable' && item.cleaning === 'ยังไม่ได้ทำความสะอาด') {
                return 'warning';
            } else if (item.status === 'Busy') {
                return 'danger';
            } else if (item.status === 'Avaliable') {
                return 'success';
            }
        }
        const colorListPayment = (item) => {
            if (item === 'ยังไม่ได้จ่ายค่าเช่า') {
                return 'warning';
            }
            return 'success';

        }
        const colorListCleaning = (item) => {
            if (item === 'ยังไม่ได้ทำความสะอาด') {
                return 'warning';
            }
            return 'success';
        }
        const statusLabel = (item) => {
            if (color(item) === 'success') {
                return 'ว่าง';
            } else if (color(item) === 'danger') {
                return 'ไม่ว่าง';
            } else if (color(item) === 'warning') {
                return 'ว่าง แต่ยังไม่ได้ทำความสะอาด';
            }
        }

        const listGroup = (item, mode) => {
            if (item) {
                if (mode === 'payment') {
                    return <ListGroupItem color={colorListPayment(item)}>{payment(item)}</ListGroupItem>;
                } else if (mode === 'cleaning') {
                    return <ListGroupItem color={colorListCleaning(item)}>{cleaning(item)}</ListGroupItem>;
                }

                return null;

            }
        }
        const cards = items.map((item) => {
            return (
                <Col sm="6" className="mb-2">
                    <Card body onClick={this.collapse} inverse color={color(item)} id={item.name}>
                        <CardTitle>
                            <h1>{item.name}</h1>
                        </CardTitle>
                        <CardText>สถานะ: {statusLabel(item)}</CardText>
                    </Card>
                    <UncontrolledCollapse toggler={item.name}>
                        <Card body className="text-center" >
                            <CardText>
                                <ListGroup>
                                    {listGroup(item.payment, 'payment')}
                                    {listGroup(item.cleaning, 'cleaning')}
                                </ListGroup>
                            </CardText>
                            <Button onClick={this.toggleNested}>แก้ไข</Button>
                            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                                <ModalHeader>แก้ไข</ModalHeader>
                                <ModalBody>ABCD</ModalBody>
                                <ModalFooter>
                                    <Button>ตกลง</Button>
                                    <Button>ยกเลิก</Button>
                                </ModalFooter>
                            </Modal>
                        </Card>
                    </UncontrolledCollapse >
                </Col>
            );
        });

        return (
            <CardDeck>
                {cards}
            </CardDeck>

        );
    }
}

export default AppCardsInCard;