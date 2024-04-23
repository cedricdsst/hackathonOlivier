const API_URL = 'http://localhost:3000/api/ecole';  // Adjust the API path as needed

export const ecoleService = {
    async getAllEcoles() {
        const response = await fetch(`${API_URL}/`, {
            method: 'GET',
            credentials: 'include',
        });
        return response.json();
    },

    async getOneEcole(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            credentials: 'include',
        });
        return response.json();
    },

    async createEcole(ecoleData) {
        const response = await fetch(`${API_URL}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ecoleData),
            credentials: 'include',
        });
        return response.json();
    },

    async updateEcole(id, ecoleData) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ecoleData),
            credentials: 'include',
        });
        return response.json();
    },

    async deleteEcole(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        return response.json();
    },
};
