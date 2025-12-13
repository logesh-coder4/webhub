import { backend, frontend, languages } from "./constants"

export const getTechnologies=(domain:string)=>{ 
    switch (domain){
        case "Frontend":{
            return frontend
        }
        case "Backend":{
            return backend
        }
        case "FullStack":{
            return frontend
        }case "Other":{
            return languages
        }default:{
            return ['1','2']
        }
    }
}