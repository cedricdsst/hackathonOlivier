import { defineStore } from 'pinia';
import { vinService } from '../services/vinService';

export const useVinStore = defineStore('vin', {
    state: () => ({
        vins: [],
        currentVin: null,
    }),
    getters: {
        totalQuantity: (state) => {
            return state.vins.reduce((total, vin) => total + vin.quantite, 0);
        }
    },
    actions: {
        async fetchAllVins() {
            this.vins = await vinService.getAllVins();
        },

        async fetchVin(id) {
            this.currentVin = await vinService.getOneVin(id);
        },

        async createVin(vinData, file) {
            const newVin = await vinService.createVin(vinData, file);
            this.vins.push(newVin);
        },

        async updateVin(id, vinData, file) {
            const updatedVin = await vinService.updateVin(id, vinData, file);
            const index = this.vins.findIndex(v => v._id === id);
            if (index !== -1) {
                this.vins[index] = updatedVin;
            }
        },

        async deleteVin(id) {
            await vinService.deleteVin(id);
            this.vins = this.vins.filter(v => v._id !== id);
        },
    },
});
