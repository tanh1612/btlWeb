export const apiUrl = "http://localhost:8000/api";

export const adminToken = () => {
    const json = localStorage.getItem("adminInfo");
    const data = json ? JSON.parse(json) : null;
    return data?.token; // Trả về token hoặc undefined, KHÔNG báo lỗi crash
};

export const userToken = () => {
    const json = localStorage.getItem("userInfo");
    const data = json ? JSON.parse(json) : null;
    return data?.token; // Trả về token hoặc undefined, KHÔNG báo lỗi crash
};