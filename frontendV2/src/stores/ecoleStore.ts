import { defineStore } from 'pinia';
import { ecoleService } from '../services/ecoleService';

export const useEcoleStore = defineStore('ecole', {
    state: () => ({
        ecoles: [],
        currentEcole: null,
    }),
    actions: {
        async fetchAllEcoles() {
            this.ecoles = await ecoleService.getAllEcoles();
        },

        async fetchEcole(id) {
            this.currentEcole = await ecoleService.getOneEcole(id);
        },

        async createEcole(ecoleData) {
            const newEcole = await ecoleService.createEcole(ecoleData);
            this.ecoles.push(newEcole);
        },

        async updateEcole(id, ecoleData) {
            const updatedEcole = await ecoleService.updateEcole(id, ecoleData);
            const index = this.ecoles.findIndex(e => e._id === id);
            if (index !== -1) {
                this.ecoles[index] = updatedEcole;
            }
        },

        async deleteEcole(id) {
            try {
                await ecoleService.deleteEcole(id);
                this.ecoles = this.ecoles.filter(e => e._id !== id);
            } catch (error) {
                throw error; // Re-throw the error to be caught by the component
            }
        },
    },
});
