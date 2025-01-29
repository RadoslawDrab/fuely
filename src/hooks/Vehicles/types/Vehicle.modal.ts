import { Vehicle } from '@api/data/types/index.modal.ts'

export interface VehicleData {
    currentVehicle: Vehicle | null;
    vehicles: Vehicle[];
    hasVehicles: boolean;

    add: (vehicle: Vehicle) => void;
    update: (vehicle: Vehicle) => void;
    remove: (vehicleId: string) => void;
    changeVehicle: (id: string) => void;
}