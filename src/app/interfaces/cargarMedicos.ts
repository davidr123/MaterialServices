import { Medico } from "../models/medico.models";

export interface CargarMedicos{
    ok:boolean;
    medicosDB:Medico[];
}