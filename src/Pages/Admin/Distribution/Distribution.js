import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import swal from 'sweetalert';
import ReactLoading from 'react-loading';

const Distribution = () => {

    const rollRef = useRef('');
    const [distribute, setDistribute] = useState({});
    const [student, setStudent] = useState({});
    const [allFoods, setAllFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSearched, setIsSearched] = useState(false);


    useEffect(() => {
        setIsSearched(false)
        axios.get('https://sk-yooda-hostel.herokuapp.com/foods')
            .then(res => setAllFoods(res.data.foods))
            .then(() => setLoading(false))
            .catch(err => console.log(err))
    }, [])

    const handleSearchStudent = e => {
        e.preventDefault();
        const roll = rollRef.current.value;
        axios.get(`https://sk-yooda-hostel.herokuapp.com/students-roll/${roll}`)
            .then(res => setStudent(res.data))
            .then(() => setLoading(false))
            .then(() => setIsSearched(true))
            .catch(err => console.log(err))
            .finally(e.target.reset())
    }

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...distribute };
        newInfo[field] = value;
        setDistribute(newInfo);
    }

    const checkAlreadyTaken = (data, event) => {
        const { roll, date, shift } = data
        const url = `https://sk-yooda-hostel.herokuapp.com/distributions?roll=${roll}&date=${date}&shift=${shift}`
        axios.get(url)
            .then(res => {
                if (res.data.length) {
                    saveData(true, data, event);
                }
                else {
                    saveData(false, data, event);
                }
            })
            .catch()

    }

    const saveData = (isTaken, distribute, event) => {
        if (!isTaken) {
            axios.post('https://sk-yooda-hostel.herokuapp.com/distributions', distribute)
                .then(res => {
                    if (res.data.insertedId) {
                        swal({
                            title: "Sucessful!",
                            text: "Successfully added!",
                            icon: "success",
                            button: "OK",
                        });
                        event.target.reset();
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            swal({
                title: "Failed!",
                text: "Already served!",
                icon: "warning",
                button: "OK",
            });
            event.target.reset();
        }
    }
    const handleSubmitDistribution = event => {
        event.preventDefault();
        const newDistribute = {
            ...distribute,
            fullname: student.fullname,
            roll: student.roll
        }
        checkAlreadyTaken(newDistribute, event)
    }

    return (
        <Container>
            <div className="mx-auto shadow px-5 py-3 mb-3" style={{ maxWidth: '700px' }}>
                <h3 className="text-center fw-bold">Search Student</h3>
                <Form onSubmit={handleSearchStudent}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control ref={rollRef} type="text" placeholder="Enter Roll no." />
                    </Form.Group>

                    <Button className="" variant="success" type="submit">
                        Search
                    </Button>
                </Form>
            </div>

            <div className="mx-auto shadow-lg p-5" style={{ maxWidth: '700px' }}>
                <h6 className='text-danger'>{(!Object.keys(student).length && isSearched) ? "No Student Found With that roll no.!!" : ""}</h6>
                <h3 className="text-center fw-bold mb-2">Meal Distribution</h3>
                {loading ?
                    <div className="d-flex align-items-center justify-content-center mt-5 pt-5">
                        <ReactLoading type={"bars"} color={"#A99577"} height={80} width={80} />
                    </div>
                    :
                    <Form onSubmit={handleSubmitDistribution}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridModel">
                                <Form.Label>Fullname</Form.Label>
                                <Form.Control name="fullname" type="text" defaultValue={student?.fullname} disabled />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMadeBy">
                                <Form.Label>Roll</Form.Label>
                                <Form.Control name="roll" type="text" defaultValue={student?.roll} disabled />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Date</Form.Label>
                                <Form.Control name="date" onBlur={handleOnBlur} type="date" placeholder="mm/dd/yyyy" required />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Shift</Form.Label>
                                {/* <Form.Control name="status" onBlur={handleOnBlur} type="text" placeholder="status" /> */}
                                <select className="form-select" name="shift" onBlur={handleOnBlur} required>
                                    <option >----</option>
                                    <option value="day">Day</option>
                                    <option value="night">Night</option>
                                </select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Fooditem</Form.Label>
                                {/* <Form.Control name="status" onBlur={handleOnBlur} type="text" placeholder="status" /> */}
                                <select className="form-select" name="food" onBlur={handleOnBlur} required>
                                    <option >----</option>
                                    {
                                        allFoods.map((food) => {
                                            return (
                                                <option key={food._id} value={food.name}>{food.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Status</Form.Label>
                                <select className="form-select" name="status" onBlur={handleOnBlur} required>
                                    <option >----</option>
                                    <option value="false">NotServed</option>
                                    <option value="true">Served</option>
                                </select>
                            </Form.Group>
                        </Row>


                        <Button id="tutor-submit" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                }
            </div>
        </Container>
    );
};

export default Distribution;