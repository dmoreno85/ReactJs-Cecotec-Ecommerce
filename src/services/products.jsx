import axios from 'axios';

export const getProducts = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get('http://localhost:3001/products', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
       
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addProducts = async (product) => {
    try {
        const token = localStorage.getItem('authToken');
        await axios.post('http://localhost:3001/products', product, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return getProducts();
    } catch (error) {

    }
};

export const updateProducts = async (product,id) => {
    try {
        const ID = id;
        const token = localStorage.getItem('authToken');
        await axios.patch(`http://localhost:3001/products/${ID}`, product, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return getProducts();
    } catch (error) {

    }
};

export const deleteProducts = async (id) => {
    try {
        const ID = id;
        const token = localStorage.getItem('authToken');
        await axios.delete(`http://localhost:3001/products/${ID}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return getProducts();
    } catch (error) {

    }
};
