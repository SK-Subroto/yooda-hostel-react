import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import ReactLoading from 'react-loading';

const UpdateStudent = (props) => {
    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://sk-yooda-hostel.herokuapp.com/students/${props.student_id}`)
            .then(res => setStudent(res.data))
            .then(() => setLoading(false))
            .catch(err => console.log(err))
    }, []);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...student };
        newInfo[field] = value;
        setStudent(newInfo);
    }

    const handleSubmitStudent = e => {
        e.preventDefault();
        const updateStudent = {
            ...student
        }
        // newStudent["status"] = true;
        console.log(updateStudent);
        axios.put(`https://sk-yooda-hostel.herokuapp.com/students/${props.student_id}`, updateStudent)
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
                    Update Student Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ?
                    <div className="d-flex align-items-center justify-content-center">
                        <ReactLoading type={"spinningBubbles"} color={"#A99577"} height={100} width={100} />
                    </div>
                    :
                    <Form onSubmit={handleSubmitStudent}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridModel">
                                <Form.Label>Fullname</Form.Label>
                                <Form.Control name="fullname" onChange={handleOnBlur} type="text" defaultValue={student?.fullname} placeholder="Enter Name" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMadeBy">
                                <Form.Label>Roll</Form.Label>
                                <Form.Control name="roll" onChange={handleOnBlur} type="text" defaultValue={student?.roll} placeholder="Roll Number" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Age</Form.Label>
                                <Form.Control name="age" onChange={handleOnBlur} type="text" defaultValue={student?.age} placeholder="Age" />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Class</Form.Label>
                                <Form.Control name="class" onChange={handleOnBlur} type="text" defaultValue={student?.class} placeholder="class" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Hall Name</Form.Label>
                                <Form.Control name="hall" onChange={handleOnBlur} type="text" defaultValue={student?.hall} placeholder="Hall Name" />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Status</Form.Label>
                                <select className="form-select" name="status" onChange={handleOnBlur}>
                                    {student?.status ?

                                        <>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </>

                                        :

                                        <>
                                            <option value="false">False</option>
                                            <option value="true">True</option>
                                        </>

                                    }
                                </select>
                            </Form.Group>
                        </Row>


                        <Button id="tutor-submit" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateStudent;