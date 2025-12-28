import { BackendTech, Database, Domain, FrontendTech, Language, ProjectStatus, ProjectType, UserProfession } from "./generated/prisma/enums"
import { NavItemsType } from "./types"

export const webServices=["frontend","backend","fullstack","mobileapp","api","utils","testcase"]
export const otherServices=["mentorship","learner","supporter","worker","collab"]
export const projectTypes=["web","others"]
export const languages=Object.values(Language)
export const frontend=Object.values(FrontendTech)
export const backend=Object.values(BackendTech)
export const databasees=Object.values(Database)
export const ptypes=Object.values(ProjectType)
export const domains=Object.values(Domain)
export const projectStatus=Object.values(ProjectStatus)
export const userProfessions=Object.values(UserProfession)

export const navItems:NavItemsType[]=[
    {
        name:'Home',
        link:"/"
    },
    {
        name:'Services',
        link:'/services'
    },
    {
        name:'Blog',
        link:'/blog/articles'
    },
]