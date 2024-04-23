const API_URL = 'http://localhost:3000/api/atelier';

export const atelierService = {
    async createAtelier(atelierData) {
        console.log("Sending data to create atelier:", atelierData);  // Log the original data

        const jsonString = JSON.stringify(atelierData);
        console.log("JSON stringified data:", jsonString);  // Log the JSON stringified data

        try {
            const response = await fetch(`${API_URL}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonString,
                credentials: 'include',
            });

            console.log("HTTP Response Status:", response.status);  // Log the HTTP status

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonResponse = await response.json();
            console.log("Response received from the server:", jsonResponse);  // Log the response from the server
            return jsonResponse;
        } catch (error) {
            console.error('Failed to create atelier:', error);
            throw error;  // Re-throw to handle it in another way if needed.
        }
    },



    async getAllAteliers() {
        return (await fetch(`${API_URL}/`, { method: 'GET', credentials: 'include' })).json();
    },

    async getOneAtelier(id: string) {
        return (await fetch(`${API_URL}/${id}`, { method: 'GET', credentials: 'include' })).json();
    },

    async deleteAtelier(id: string) {
        return (await fetch(`${API_URL}/${id}`, { method: 'DELETE', credentials: 'include' })).json();
    },

    async finishAtelier(id: string) {
        return (await fetch(`${API_URL}/${id}/finish`, { method: 'POST', credentials: 'include' })).json();
    },

    async addFileToAtelier(id: string, fileData: FormData) {
        return (await fetch(`${API_URL}/${id}/files`, { method: 'POST', body: fileData, credentials: 'include' })).json();
    },

    async removeFileFromAtelier(idAtelier: string, fileId: string) {
        return (await fetch(`${API_URL}/${idAtelier}/files/${fileId}`, { method: 'DELETE', credentials: 'include' })).json();
    },

    async addVinToAtelier(id: string, vinData: any) {
        return (await fetch(`${API_URL}/${id}/vins`, { method: 'POST', body: JSON.stringify(vinData), credentials: 'include', headers: { 'Content-Type': 'application/json' } })).json();
    },

    async updateVinInAtelier(idAtelier: string, vinId: string, vinData: any) {
        return (await fetch(`${API_URL}/${idAtelier}/vins/${vinId}`, { method: 'PATCH', body: JSON.stringify(vinData), credentials: 'include', headers: { 'Content-Type': 'application/json' } })).json();
    },

    async removeVinFromAtelier(idAtelier: string, vinId: string) {
        return (await fetch(`${API_URL}/${idAtelier}/vins/${vinId}`, { method: 'DELETE', credentials: 'include' })).json();
    },

    async addParticipantToAtelier(id: string, participantData: any) {
        return (await fetch(`${API_URL}/${id}/participants`, { method: 'POST', body: JSON.stringify(participantData), credentials: 'include', headers: { 'Content-Type': 'application/json' } })).json();
    },

    async removeParticipantFromAtelier(idAtelier: string, participantId: string) {
        return (await fetch(`${API_URL}/${idAtelier}/participants/${participantId}`, { method: 'DELETE', credentials: 'include' })).json();
    },

    async confirmPaymentForParticipant(idAtelier: string, participantId: string) {
        return (await fetch(`${API_URL}/${idAtelier}/participants/${participantId}/confirm-payment`, { method: 'PATCH', credentials: 'include' })).json();
    }
};
