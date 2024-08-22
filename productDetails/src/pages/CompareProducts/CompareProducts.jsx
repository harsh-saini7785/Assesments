import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, List, Tooltip, Spin } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

import { styles } from './CompareProductsStyle';

const ProductCompare = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [compareProducts, setCompareProducts] = useState(getinitailData());
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

    function getinitailData() {
        let newData = [];
        const localData = JSON.parse(localStorage.getItem('products'));
        const navigationStateData = location.state?.compareProducts || [];
        console.log(localData, navigationStateData);
        
        if (localData && navigationStateData) {
            const isItemAlreadyPresent = localData?.some((item) => item.id === navigationStateData[0]?.id)
            newData = isItemAlreadyPresent ? [...localData] : [...localData, ...navigationStateData]
        } else if (localData && !navigationStateData) {
            newData = [...localData]
        } else if (!localData && navigationStateData) {
            newData = [...navigationStateData]
        }
        if (newData?.length) {
            return newData
        } else {
            return []
        }
    }

    const handleRemove = (id) => {
        setCompareProducts(compareProducts.filter(product => product.id !== id));
    };

    useEffect(() => {
        if (compareProducts?.length)
            localStorage.setItem('products', JSON.stringify(compareProducts))
    }, [compareProducts])

    const fetchProducts = async () => {
        setError('')
        setIsLoading(true)
        try {
            const result = await axios.get('https://dummyjson.com/products')
            if (result) {
                setProducts(result?.data?.products);
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false);
        }
    }
    const handleAddMore = () => {
        setIsModalVisible(true);
        // Fetch products if not already fetched
        if (products?.length === 0) {
            fetchProducts()
        }
    };

    const handleAddProduct = (product) => {
        if (compareProducts.length < 4 && !compareProducts.find(p => p.id === product.id)) {
            setCompareProducts([...compareProducts, product]);
        }
    };

    const columns = [
        {
            title: 'Feature',
            dataIndex: 'feature',
            key: 'feature',

        },
        ...compareProducts?.map(product => ({
            title: (_, record) => (
                <div style={styles.columnHeading}>
                    <div> {product.title}</div>
                    <Tooltip title="Delete All">
                        <Button
                            type="primary"
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                            style={{ marginLeft: 8 }}
                            onClick={() => handleRemove(product.id)}
                        />
                    </Tooltip>
                </div>
            ),
            dataIndex: product.id,
            key: product.id,
            render: (text, record) => record[product.id],
        })),
    ];

    const data = [
        { feature: 'Brand', ...compareProducts.reduce((acc, product) => ({ ...acc, [product.id]: product.brand }), {}) },
        { feature: 'Price', ...compareProducts.reduce((acc, product) => ({ ...acc, [product.id]: `$${product.price}` }), {}) },
        { feature: 'Category', ...compareProducts.reduce((acc, product) => ({ ...acc, [product.id]: product.category }), {}) },
        { feature: 'Description', ...compareProducts.reduce((acc, product) => ({ ...acc, [product.id]: product.description }), {}) },
        { feature: 'Rating', ...compareProducts.reduce((acc, product) => ({ ...acc, [product.id]: product.rating }), {}) },
        { feature: 'Weight', ...compareProducts.reduce((acc, product) => ({ ...acc, [product.id]: product.weight }), {}) },
        { feature: 'Warranty', ...compareProducts.reduce((acc, product) => ({ ...acc, [product.id]: product.warrantyInformation }), {}) },

        // Add more features as needed
    ];

    return (
        <div>
            <Button style={styles.backProductButton} onClick={() => navigate('/')}>Back to Products</Button>
            {!!compareProducts?.length && <Table columns={columns} dataSource={data} pagination={false} rowKey="feature" />}
            <Button style={styles.addMoreButton} type="primary" onClick={handleAddMore} disabled={compareProducts.length >= 4}>Add More</Button>
            <Modal
                style={styles.modalContainer}
                title="Add More Products"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                {isLoading ?
                    <div style={styles.notDataScreen}>
                        <Spin />
                    </div>
                    : !!error ?
                        <div style={styles.notDataScreen}>
                            Data not found
                        </div> : <List
                            itemLayout="horizontal"
                            dataSource={products}
                            renderItem={product => (
                                <List.Item
                                    actions={[
                                        <Button
                                            type="primary"
                                            onClick={() => handleAddProduct(product)}
                                            disabled={compareProducts.find(p => p.id === product.id)}
                                        >
                                            Add
                                        </Button>
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={product.title}
                                        description={`$${product.price}`}
                                    />
                                </List.Item>
                            )}
                        />
                }
            </Modal>
        </div >
    );
};

export default ProductCompare;
