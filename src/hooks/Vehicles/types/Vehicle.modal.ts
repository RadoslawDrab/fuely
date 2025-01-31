import { Vehicle } from '@api/data/types/index.modal.ts'

export interface VehicleData {
    currentVehicle: Vehicle | null;
    vehicles: Vehicle[];
    hasVehicles: boolean;

    add: (vehicle: Omit<Vehicle, 'id'>) => Promise<string>;
    update: (vehicle: Partial<Vehicle>) => Promise<string>;
    remove: (vehicleId: string) => Promise<string>;
    changeVehicle: (id: string | null) => void;
}