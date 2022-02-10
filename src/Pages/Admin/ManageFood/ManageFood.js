import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import swal from 'sweetalert';
import ReactLoading from 'react-loading';
import UpdateFood from '../UpdateFood/UpdateFood';
import './ManageFood.css';


const ManageFood = () => {
    const [allFoods, setAllFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modalShow, setModalShow] = useState(false);
    const [foodId, setFoodId] = useState("");

    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const size = 10;


    useEffect(() => {
        axios.get(`https://sk-yooda-hostel.herokuapp.com/foods?page=${page}&&size=${size}`)
            .then(res => {
                setAllFoods(res.data.foods)
                const count = res.data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber);
            })
            .then(() => setLoading(false))
            .catch(err => console.log(err))
    }, [modalShow, page]);

    const handleDeleteFood = (id) => {
        swal({
            title: "Are you sure?",
            text: "You want to Delete Teacher Post",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // delete reservation 
                    axios.delete(`https://sk-yooda-hostel.herokuapp.com/foods/${id}`)
                        .then(res => {
                            if (res.data.deletedCount) {
                                const remainingFoods = allFoods.filter(food => food._id !== id);
                                setAllFoods(remainingFoods);
                            }
                        }).catch(err => console.log(err))
                    swal("Teacher Post is sucessfully deleted", {
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
                    <div className="px-5 py-3 shadow" style={{ minHeight: '85vh' }}>
                        <h3 className="text-center fw-bold mb-2">Manage Food Items</h3>
                        <Table hover responsive className="product-table overflow-scroll">
                            <thead className="border-top">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allFoods.map((food, index) => {
                                        return (
                                            <tr key={food._id}>
                                                <td>{(page * 10) + (index + 1)}</td>
                                                <td>{food.name}</td>
                                                <td>{food.price}</td>
                                                <td
                                                    onClick={() => {
                                                        setModalShow(true)
                                                        setFoodId(food._id)
                                                    }}
                                                    style={{ cursor: 'pointer' }}
                                                ><BsPencilSquare className="text-success" /></td>
                                                <td
                                                    onClick={() => handleDeleteFood(food._id)}
                                                    style={{ cursor: 'pointer' }}
                                                ><BsFillTrashFill className="text-danger" /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
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
                <UpdateFood
                    show={modalShow}
                    food_id={foodId}
                    onHide={() => setModalShow(false)}
                />
                :
                ""

            }
        </>
    );
};

export default ManageFood;