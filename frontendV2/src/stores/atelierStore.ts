import { defineStore } from 'pinia';
import { atelierService } from '../services/atelierService';

export const useAtelierStore = defineStore('atelier', {
    state: () => ({
        ateliers: [],
        currentAtelier: null,
    }),
    actions: {
        // In your atelierStore
        async fetchAllAteliers() {
            try {
                const ateliers = await atelierService.getAllAteliers();
                this.ateliers = ateliers;
                console.log("Ateliers fetched:", ateliers);  // Add this line to check what you are getting from the backend
            } catch (error) {
                console.error('Failed to fetch ateliers:', error);
            }
        }
        ,

        async fetchAtelier(id: string) {
            try {
                const atelier = await atelierService.getOneAtelier(id);
                this.currentAtelier = atelier;
            } catch (error) {
                console.error('Failed to fetch atelier:', error);
            }
        },

        async createAtelier(atelierData: FormData) {
            try {
                const response = await atelierService.createAtelier(atelierData);
                this.ateliers.push(response);
            } catch (error) {
                console.error('Failed to create atelier:', error);
                throw error;
            }
        },

        // In atelierStore.js
        async updateAtelier(id, atelierData) {
            try {
                const updatedAtelier = await atelierService.updateAtelier(id, atelierData);
                // Optionally update local state if needed
            } catch (error) {
                console.error('Failed to update Atelier:', error);
                throw error;
            }
        },


        async deleteAtelier(id: string) {
            try {
                await atelierService.deleteAtelier(id);
                this.ateliers = this.ateliers.filter(atelier => atelier._id !== id);
            } catch (error) {
                console.error('Failed to delete atelier:', error);
                throw error;
            }
        },

        async finishAtelier(id: string) {
            try {
                await atelierService.finishAtelier(id);
                const atelier = this.ateliers.find(a => a._id === id);
                if (atelier) {
                    atelier.finished = true;
                }
            } catch (error) {
                console.error('Failed to finish atelier:', error);
                throw error;
            }
        },

        async addFileToAtelier(id: string, fileData: FormData) {
            try {
                const response = await atelierService.addFileToAtelier(id, fileData);
                const atelier = this.ateliers.find(a => a._id === id);
                if (atelier) {
                    atelier.files.push(response.file);
                }
            } catch (error) {
                console.error('Failed to add file:', error);
                throw error;
            }
        },

        async removeFileFromAtelier(idAtelier: string, fileId: string) {
            try {
                await atelierService.removeFileFromAtelier(idAtelier, fileId);
                const atelier = this.ateliers.find(a => a._id === idAtelier);
                if (atelier) {
                    atelier.files = atelier.files.filter(file => file._id !== fileId);
                }
            } catch (error) {
                console.error('Failed to remove file:', error);
                throw error;
            }
        },

        async addVinToAtelier(id: string, vinData: any) {
            try {
                const response = await atelierService.addVinToAtelier(id, vinData);
                const atelier = this.ateliers.find(a => a._id === id);
                if (atelier) {
                    atelier.vins.push(response.vin);
                }
            } catch (error) {
                console.error('Failed to add vin:', error);
                throw error;
            }
        },

        async updateVinInAtelier(idAtelier: string, vinId: string, vinData: any) {
            try {
                const response = await atelierService.updateVinInAtelier(idAtelier, vinId, vinData);
                const atelier = this.ateliers.find(a => a._id === idAtelier);
                if (atelier) {
                    const index = atelier.vins.findIndex(v => v._id === vinId);
                    if (index !== -1) {
                        atelier.vins[index] = { ...atelier.vins[index], ...response.vin };
                    }
                }
            } catch (error) {
                console.error('Failed to update vin:', error);
                throw error;
            }
        },

        async removeVinFromAtelier(idAtelier: string, vinId: string) {
            try {
                await atelierService.removeVinFromAtelier(idAtelier, vinId);
                const atelier = this.ateliers.find(a => a._id === idAtelier);
                if (atelier) {
                    atelier.vins = atelier.vins.filter(vin => vin._id !== vinId);
                }
            } catch (error) {
                console.error('Failed to remove vin:', error);
                throw error;
            }
        },

        async addParticipantToAtelier(id: string, participantData: any) {
            try {
                const response = await atelierService.addParticipantToAtelier(id, participantData);
                const atelier = this.ateliers.find(a => a._id === id);
                if (atelier) {
                    atelier.participants.push(response.participant);
                }
            } catch (error) {
                console.error('Failed to add participant:', error);
                throw error;
            }
        },

        async removeParticipantFromAtelier(idAtelier: string, participantId: string) {
            try {
                await atelierService.removeParticipantFromAtelier(idAtelier, participantId);
                const atelier = this.ateliers.find(a => a._id === idAtelier);
                if (atelier) {
                    atelier.participants = atelier.participants.filter(participant => participant._id !== participantId);
                }
            } catch (error) {
                console.error('Failed to remove participant:', error);
                throw error;
            }
        },

        async confirmPaymentForParticipant(idAtelier: string, participantId: string) {
            try {
                await atelierService.confirmPaymentForParticipant(idAtelier, participantId);
                const atelier = this.ateliers.find(a => a._id === idAtelier);
                if (atelier) {
                    const participant = atelier.participants.find(p => p._id === participantId);
                    if (participant) {
                        participant.payed = true;
                    }
                }
            } catch (error) {
                console.error('Failed to confirm payment:', error);
                throw error;
            }
        }
    },
});
