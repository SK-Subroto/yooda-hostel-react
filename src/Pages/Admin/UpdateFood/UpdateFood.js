import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import swal from 'sweetalert';

const UpdateFood = (props) => {
    // console.log(props);
    const [food, setFood] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://sk-yooda-hostel.herokuapp.com/foods/${props.food_id}`)
            .then(res => setFood(res.data))
            .then(() => setLoading(false))
            .catch(err => console.log(err))
    }, []);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...food };
        newInfo[field] = value;
        setFood(newInfo);
    }

    const handleSubmitFood = e => {
        e.preventDefault();
        const updateFood = {
            ...food
        }
        // newFood["status"] = true;
        console.log(updateFood);
        axios.put(`https://sk-yooda-hostel.herokuapp.com/foods/${props.food_id}`, updateFood)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    swal({
                        title: "Sucessful!",
                        text: "Successfully updated!",
                        icon: "success",
                        button: "OK",
                    });
                    e.target.reset();
                }
            })
            .catch(err => console.log(err))
            .finally(props.onHide)

    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update New Food Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ?
                    <div className="d-flex align-items-center justify-content-center">
                        <ReactLoading type={"spinningBubbles"} color={"#A99577"} height={100} width={100} />
                    </div>
                    :
                    <Form onSubmit={handleSubmitFood}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridModel">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" onChange={handleOnBlur} defaultValue={food?.name} type="text" placeholder="Enter Name" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMadeBy">
                                <Form.Label>Price</Form.Label>
                                <Form.Control name="price" onChange={handleOnBlur} defaultValue={food?.price} type="number" placeholder="Enter Price" />
                            </Form.Group>
                        </Row>
                        <Button id="tutor-submit" variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                }
            </Modal.Body>
        </Modal>
    );
};

export default UpdateFood;