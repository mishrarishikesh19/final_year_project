import axios from "axios";
import BASE_URL from '../../config';

const getDashboardStats = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/members/get-dashboard-stats`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard statistics:", error);
        throw error;
    }
};

export { getDashboardStats };
