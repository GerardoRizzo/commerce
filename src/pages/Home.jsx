import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { filterProductsCategoryThunk, filterProductsTitleThunk, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {

    const dispatch = useDispatch();
    const productsList = useSelector(state => state.products);

    const [categories, setCategories] = useState([]);
    const [productsSearch,setProductsSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
            .then(res => setCategories(res.data));
    }, [])

    console.log(categories)

    return (
        <div>
            <h1>Home</h1>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={productsSearch}
                    onChange={e => setProductsSearch(e.target.value)}
                />
                <Button variant="outline-secondary"
                 id="button-addon2"
                 onClick={() => dispatch(filterProductsTitleThunk(productsSearch))}
                 >
                    Button
                </Button>
            </InputGroup>
            {
                categories.map((category) => (
                    <button key={category.id} onClick={() => dispatch(filterProductsCategoryThunk(category.id))}>
                        {category.name}
                    </button>
                ))
            }
            <ul>
                {
                    productsList.map((product) => (
                        <li key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                            {product.brand} ${product.price}
                            <br />
                            {product.title}---{product.category.name}
                            <br />
                            <img src={product.images[0].url} alt="" />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Home;