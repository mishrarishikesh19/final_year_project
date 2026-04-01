import axios from "axios";
import BASE_URL from '../../config';

const getMonthlyJoined = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/members/monthly-member`,{withCredentials:true});
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching monthly joined data:", error);
        throw error;
    }

};

const threeDaysExpire = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/members/within-3-days-expiring`, { withCredentials:true});
        return response.data;
    }catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const fourToSevenDaysExpire = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/members/within-4-7-expiring`, { withCredentials:true});
        return response.data;
    }catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const expired = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/members/expired-member`, { withCredentials:true});
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const inActiveMembers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/members/inactive-member`, { withCredentials:true});
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export {getMonthlyJoined, threeDaysExpire, fourToSevenDaysExpire, expired, inActiveMembers };