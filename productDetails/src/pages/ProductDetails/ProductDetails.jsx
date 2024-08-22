import React, { useState, useEffect } from 'react';
import { Table, Button, Spin } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styles } from './ProductDetailsStyle';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [compareProducts, setCompareProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchProducts = async () => {
        setIsLoading(true);
        setError('')
        try {
            const result = await axios.get('https://dummyjson.com/products')
            setProducts(result.data.products)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, []);

    const isItemCompare = (id) => {
        const data = JSON.parse(localStorage.getItem('products'));
        if (data) {
            return data.some((item) => item.id === id);
        }
        return false;

    }


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Image',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (thumbnail) => <img src={thumbnail} alt="Product" style={{ width: 40, height: 40 }} />,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: price => `$${price}`,
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
            sorter: (a, b) => a.weight - b.weight,
        },
        {
            title: 'Warranty',
            dataIndex: 'warrantyInformation',
            key: 'warrantyInformation',
        },
        {
            title: 'Compare',
            key: 'compare',
            render: (_, record) => (
                <Button style={isItemCompare(record.id) ? styles.voilet : {}} type="primary" onClick={() => handleCompare(record)}>
                    Compare
                </Button>
            ),
        },
    ];

    const handleCompare = (product) => {
        if (compareProducts.length < 4 && !compareProducts.find(p => p.id === product.id)) {
            setCompareProducts([...compareProducts, product]);
        }

        navigate('/compare-product', {
            state: { compareProducts: [...compareProducts, product] }
        });
    };

    return (
        isLoading ? <div style={styles.notDataScreen}>
            <Spin />
        </div>
            :
            !!error ? <div style={styles.notDataScreen}>
                <h2>Error Found <span><Button onClick={fetchProducts}>Try Again</Button></span></h2>
            </div> : <Table
                columns={columns}
                dataSource={products}
                loading={isLoading}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: '100%' }}
            />

    );
};

export default ProductTable;
