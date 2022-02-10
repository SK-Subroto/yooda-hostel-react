import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import swal from 'sweetalert';

const AddStudent = () => {
    const [student, setStudent] = useState({});

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...student };
        newInfo[field] = value;
        setStudent(newInfo);
    }

    const handleSubmitStudent = e => {
        e.preventDefault();
        const newStudent = {
            ...student
        }
        // newStudent["status"] = true;
        console.log(newStudent);
        axios.post('https://sk-yooda-hostel.herokuapp.com/students', newStudent)
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
                <h3 className="text-center fw-bold mb-2">Add Student</h3>
                <Form onSubmit={handleSubmitStudent}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridModel">
                            <Form.Label>Fullname</Form.Label>
                            <Form.Control name="fullname" onBlur={handleOnBlur} type="text" placeholder="Enter Name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridMadeBy">
                            <Form.Label>Roll</Form.Label>
                            <Form.Control name="roll" onBlur={handleOnBlur} type="text" placeholder="Roll Number" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Age</Form.Label>
                            <Form.Control name="age" onBlur={handleOnBlur} type="text" placeholder="Age" />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Class</Form.Label>
                            <Form.Control name="class" onBlur={handleOnBlur} type="text" placeholder="class" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Hall Name</Form.Label>
                            <Form.Control name="hall" onBlur={handleOnBlur} type="text" placeholder="Hall Name" />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                            <Form.Label>Status</Form.Label>
                            {/* <Form.Control name="status" onBlur={handleOnBlur} type="text" placeholder="status" /> */}
                            <select className="form-select" name="status" onBlur={handleOnBlur}>
                                <option value="false">False</option>
                                <option value="true">True</option>
                            </select>
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

export default AddStudent;