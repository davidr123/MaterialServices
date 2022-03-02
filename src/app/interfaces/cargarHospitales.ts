import { Hospital } from "../models/hospital.models";

export interface CargarHospitales{

    ok:boolean,
    hospitalDB:Hospital[];

}