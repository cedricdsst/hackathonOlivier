const API_URL = 'http://localhost:3000/api/vin';

export const vinService = {
    async createVin(vinData, file) {
        const formData = new FormData();
        // Stringify the vinData and append it under 'vin' key
        formData.append('vin', JSON.stringify(vinData));
        if (file) {
            formData.append('file', file);
        }

        const response = await fetch(`${API_URL}/`, {
            method: 'POST',
            body: formData, // sending FormData
            credentials: 'include',
        });
        return response.json();
    },

    async getAllVins() {
        const response = await fetch(`${API_URL}/`, {
            method: 'GET',
            credentials: 'include',
        });
        return response.json();
    },

    async getOneVin(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            credentials: 'include',
        });
        return response.json();
    },

    async updateVin(id, vinData, file) {
        const formData = new FormData();
        for (const key in vinData) {
            formData.append(key, vinData[key]);
        }
        if (file) {
            formData.append('file', file);
        }

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            body: formData,
            credentials: 'include',
        });
        return response.json();
    },

    async deleteVin(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        return response.json();
    },
};
