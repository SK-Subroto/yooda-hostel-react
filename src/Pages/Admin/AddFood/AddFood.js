import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import swal from 'sweetalert';

const AddFood = () => {
    const [food, setFood] = useState({});

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...food };
        newInfo[field] = value;
        setFood(newInfo);
    }

    const handleSubmitFood = e => {
        e.preventDefault();
        const newFood = {
            ...food
        }
        // newFood["status"] = true;
        console.log(newFood);
        axios.post('https://sk-yooda-hostel.herokuapp.com/foods', newFood)
            .then(res => {
                if (res.data.insertedId) {
                    swal({
                        title: "Sucessful!",
                        text: "Successfully added!",
                        icon: "success",
                        button: "OK",
                    });
                    e.target.reset();
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <Container>
            <div className="mx-auto shadow-lg p-5" style={{ maxWidth: '700px' }}>
                <h3 className="text-center fw-bold mb-2">Add New Food Item</h3>
                <Form onSubmit={handleSubmitFood}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridModel">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" onBlur={handleOnBlur} type="text" placeholder="Enter Name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridMadeBy">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" onBlur={handleOnBlur} type="number" placeholder="Enter Price" />
                        </Form.Group>
                    </Row>

                    <Button id="tutor-submit" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default AddFood;