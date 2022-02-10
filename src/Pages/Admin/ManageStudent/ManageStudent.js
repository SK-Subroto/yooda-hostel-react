import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { BsCheckSquare, BsFillTrashFill, BsCheckSquareFill, BsPencilSquare } from 'react-icons/bs';
import swal from 'sweetalert';
import ReactLoading from 'react-loading';
import UpdateStudent from '../UpdateStudent/UpdateStudent';
import './ManageStudent.css';

const ManageStudent = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modalShow, setModalShow] = useState(false);
    const [studentId, setStudentId] = useState("");

    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const size = 10;

    let findStudent = {};

    useEffect(() => {
        axios.get(`https://sk-yooda-hostel.herokuapp.com/students?page=${page}&&size=${size}`)
            .then(res => {
                setStudents(res.data.students)
                const count = res.data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber);
            })
            .then(() => setLoading(false))
            .catch(err => console.log(err))
    }, [findStudent, modalShow, page]);

    const handleUpdateStatus = (id) => {
        findStudent = students.find(student => student._id === id)
        swal({
            title: "Are you sure?",
            text: `You want to make status ${!findStudent.status ? "Active" : "Inactive"}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    findStudent.status = !findStudent.status;
                    // update approve or pending 
                    axios.put(`https://sk-yooda-hostel.herokuapp.com/students-status/${id}`, findStudent)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                            }
                        })
                        .catch(err => console.log(err))
                    swal("Status updated!", {
                        icon: "success",
                    });
                } else {
                    // swal("Your imaginary file is safe!");
                }
            });
    }

    const handleDeleteOrder = (id) => {
        swal({
            title: "Are you sure?",
            text: "You want to cancel you order",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // delete reservation 
                    axios.delete(`https://sk-yooda-hostel.herokuapp.com/students/${id}`)
                        .then(res => {
                            if (res.data.deletedCount) {
                                const remainingStudents = students.filter(student => student._id !== id);
                                setStudents(remainingStudents);
                            }
                        }).catch(err => console.log(err))
                    swal("Your reservation is sucessfully cancelled", {
                        icon: "success",
                    });
                } else {
                    // swal("Your imaginary file is safe!");
                }
            });
    }

    const handleMultipleUpdateStatus = () => {
        swal({
            title: "Are you sure?",
            text: `You want to make all status active?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // update approve or pending 
                    axios.put(`https://sk-yooda-hostel.herokuapp.com/students-mutiple-status`)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                            }
                        })
                        .catch(err => console.log(err))
                    swal("Status updated!", {
                        icon: "success",
                    });
                } else {
                    // swal("Your imaginary file is safe!");
                }
            });
    }
    return (
        <>
            {loading ?
                <div className="d-flex align-items-center justify-content-center mt-5 pt-5">
                    <ReactLoading type={"bars"} color={"#A99577"} height={80} width={80} />
                </div>
                :
                <Container>
                    <div className="px-5 py-3 shadow" style={{ height: '85vh' }}>
                        <h3 className="text-center fw-bold mb-2">Manage All Student</h3>
                        <Table hover responsive className="product-table overflow-scroll">
                            <thead className="border-top">
                                <tr>
                                    <th>#</th>
                                    <th>Fullname</th>
                                    <th>Roll</th>
                                    <th>Age</th>
                                    <th>Class</th>
                                    <th>Hall</th>
                                    <th>Status</th>
                                    <th colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students.map((student, index) => {
                                        return (
                                            <tr key={student._id}>
                                                <td>{(page * 10) + (index + 1)}</td>
                                                <td>{student.fullname}</td>
                                                <td>{student.roll}</td>
                                                <td>{student.age}</td>
                                                <td>{student.class}</td>
                                                <td>{student.hall}</td>
                                                {/* <td><span className={!product.status ? "text-warning fw-bold" : "text-success fw-bold"}>{!product.status ? "Pending" : "Approved"}</span></td> */}
                                                <td
                                                    onClick={() => handleUpdateStatus(student._id)}
                                                    style={{ cursor: 'pointer' }}
                                                ><span >{!student.status ?
                                                    <div>
                                                        <BsCheckSquare className="text-success" /> <span>Inactive</span>
                                                    </div>
                                                    :
                                                    <div>
                                                        <BsCheckSquareFill className="text-success" /> <span>Active</span>
                                                    </div>}
                                                    </span>
                                                </td>
                                                <td
                                                    onClick={() => {
                                                        setModalShow(true)
                                                        setStudentId(student._id)
                                                    }}
                                                    style={{ cursor: 'pointer' }}
                                                ><BsPencilSquare className="text-success" /></td>
                                                <td
                                                    onClick={() => handleDeleteOrder(student._id)}
                                                    style={{ cursor: 'pointer' }}
                                                ><BsFillTrashFill className="text-danger" /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </Table>
                        <Button onClick={handleMultipleUpdateStatus} className='float-end' id="tutor-submit" variant="primary" type="submit">
                            Make All Active
                        </Button>
                        <div className="pagination">
                            {
                                [...Array(pageCount).keys()]
                                    .map(number => <button
                                        className={number === page ? 'selected' : ''}
                                        key={number}
                                        onClick={() => setPage(number)}
                                    >{number + 1}</button>)
                            }
                        </div>
                    </div>
                </Container>
            }

            {modalShow ?
                <UpdateStudent
                    show={modalShow}
                    student_id={studentId}
                    onHide={() => setModalShow(false)}
                />
                :
                ""

            }
        </>
    );
};

export default ManageStudent;