// import { SignUpType } from "@/dto/registerDto.dto";
// import { useForm} from "react-hook-form";

// export interface SignUpProps{
//     name:string;
//     label:string,
//     errors:Record<string,{message?:string}>,
//     register:ReturnType<typeof useForm<SignUpType>>['register'],
//     type?:string;
//     maxLength?:number;
// }

export type NavItemsType={
    name:string
    link:string
}
export type ServiceType={
    name:string
    description:string
    icon:React.ReactNode
    query?:string
}

export type OurWorkType={
    name:string;
    description:string;
    icon:any
}

export type ProjectsType={
    id:number
    name:string
    description:string
    logo:string
    link:string
}

export interface ProjectType{
    title:string
    description:string
    query:string
    icon:React.ComponentType<{className?:string}>
}

enum OtherServicesEnum{
    "mentorship",
    "learner",
    "supporter",
    "worker",
    "utils"
}

export type OtherProjectProps={
    service:OtherServicesEnum
}

export interface ChatProps{
    userId?:string,
    key:string
}