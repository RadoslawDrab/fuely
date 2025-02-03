import { getUserData, setValue, updateValue } from '@api/data/database.ts'
import { Vehicle } from '@api/data/types/index.modal.ts'
import { uuidv4 } from '@firebase/util'
import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from 'firebase/auth'

import { parseBody, returnError } from '@api/data'

const auth = getAuth()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { currentUser } = auth
    // Returns error if user is not logged in
    if (!currentUser) {
        return returnError(res, 'auth/not-logged-in')
    }
    const userObject = await getUserData(currentUser)

    switch (req.method) {
        case 'PATCH': {
            try {
                const { vehicle } = parseBody(req)

                if (!vehicle.id || !userObject.settings.vehicles.some((v) => v.id === vehicle.id)) {
                    return returnError(res, 'vehicle-not-found')
                }
                const newVehicle = {...userObject.settings.vehicles.find((v) => v.id === vehicle.id), ...vehicle}
                await updateValue({vehicles: userObject.settings.vehicles.map((v) => {
                    if (v.id !== vehicle.id) return v

                    return newVehicle
                })}, 'users')

                res.status(200).json({ code: 'updated', data: newVehicle })
            } catch (error: any) {
                return returnError(res, error.code)
            }
            break
        }
        case 'POST': {
            const body = parseBody(req)
            const vehicle: Vehicle = body.vehicle

            if (!vehicle.name || vehicle.name.length === 0) {
                return returnError(res, 'no-vehicle-name')
            }

            if (userObject.settings.vehicles.some((v) => v.name === vehicle.name)) {
                return returnError(res, 'vehicle-name-exists')
            }
            const id = uuidv4()
            await setValue([...userObject.settings.vehicles, {
                ...vehicle,
                id
            }], 'users', 'vehicles')

            res.status(200).json({ vehicleId: id, code: 'vehicle-added' })
            break

        }
        case 'DELETE': {
            const vehicleId = req.query.vehicleId

            if (!vehicleId || vehicleId.length === 0) {
                return returnError(res, 'user/not-enough-data')
            }

            const ids = (Array.isArray(vehicleId) ? vehicleId : [vehicleId]).filter(v => v.length > 0)
            if (ids.length === 0) {
                return returnError(res, 'no-vehicle-id')
            }
            try {
                await updateValue({
                    vehicles: userObject.settings.vehicles.filter((v) => !ids.includes(v.id))
                }, 'users')
            } catch (error: any) {
                return returnError(res, error.code)
            }

            res.status(200).json({ code: 'user/vehicle-deleted' })
            break
        }
    }
}