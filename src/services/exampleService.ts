import axios from '../config/axiosConfig';

export const fetchExampleData = async () => {
    try {
        const response = await axios.get('/example-data');
        return response.data;
    } catch (error) {
        console.error('Error fetching example data:', error);
        throw error;
    }
};