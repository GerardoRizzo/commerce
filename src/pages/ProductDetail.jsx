import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterProductsCategoryThunk } from '../store/slices/products.slice';

const ProductDetail = () => {

    const { id } = useParams();
    const [products, setProducts] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productsSuggested = useSelector(state => state.products)

    useEffect(() => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(res => {
                setProducts(res.data)
                dispatch(filterProductsCategoryThunk(res.data.categoryId))
            });
    },[ id ])

    console.log(products)

    return (
        <div>
            <h1>{products.title}</h1>
            <p>{products.description}</p>
            {
                productsSuggested.map(productsItem => (
                    <li 
                    onClick={() => navigate(`/product/${productsItem.id}`)}
                    key={productsItem.id}
                    >
                        {productsItem.title}
                    </li>
                ))
            }
            <img src={products.images?.[1].url} alt="" />
        </div>
    );
};

export default ProductDetail;