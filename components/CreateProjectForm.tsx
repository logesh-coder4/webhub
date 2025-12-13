'use client'
import { createOtherProjectAction, createWebProjectAction } from "@/actions/projectActions"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MentorProjectSchema,SupportedProjectSchema, WebProjectSchema } from "@/dto/project.dto"
import { backend, databasees, domains, frontend, languages, ptypes } from "@/lib/constants"
import { BackendTech, Database, Domain, FrontendTech, Language, OtherServices, ProjectType, WebServices } from "@/lib/generated/prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props={
    service:WebServices|OtherServices|"other"|null
}

export function CreateWebProjectForm({service}:Props) {
    const router=useRouter()
    const {watch,setValue,formState:{errors},register,handleSubmit}=useForm({
        resolver:zodResolver(WebProjectSchema),
        mode:"onChange"
    })
    const projectType=watch("ztype")
    useEffect(()=>{
        if (service==="api"||service==="utils") {
            setValue("ztype","other")
        }else{
            setValue("ztype",service as "frontend" | "backend" | "fullstack" | "mobileapp" | "other")
        }
        
    },[service])
    
    const onSubmit=async(data:any)=>{
        data.service=service
        const project=await createWebProjectAction(data)
        if (project?.isSuccess) {
            toast.success("Project Created....")
            router.push('/')
        }
    }
  
    return (
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                <FieldSet>
                    <FieldLegend>Create Web Project</FieldLegend>
                    <FieldDescription>All transactions are secure and encrypted</FieldDescription>
                    <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                        placeholder="Project Name"
                        required
                        {...register("name")}
                        />
                        <FieldError>{errors["ztype"]?.message}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Textarea
                        placeholder="Add any additional comments"
                        className="resize-none"
                        {...register("description")}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="projectType">Project Type</FieldLabel>
                        <Select defaultValue="" {...register("projectType")} onValueChange={(data)=>setValue("projectType",data as ProjectType)}>
                            <SelectTrigger id="projectType">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                            {ptypes.map((ptype,idx)=>(
                                <SelectItem key={idx} value={ptype}>{ptype}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    </Field>
                    </FieldGroup><FieldSeparator />
                    {
                        projectType==="frontend"?(
                        <FieldGroup>
                            <Field>
                            <FieldLabel htmlFor="frontendTech">Frontend</FieldLabel>
                                <Select defaultValue="" {...register("frontendTech")} onValueChange={(data)=>setValue("frontendTech",data as FrontendTech)}>
                                    <SelectTrigger id="frontendTech">
                                    <SelectValue placeholder="Frontend" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {frontend.map((frontend,idx)=>(
                                        <SelectItem key={idx} value={frontend}>{frontend}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                        </FieldGroup>
                        ):projectType==="backend"?(
                            <FieldGroup>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="backendTech">Backend</FieldLabel>
                                        <Select defaultValue="" {...register("backendTech")} onValueChange={(data)=>setValue("backendTech",data as BackendTech)}>
                                            <SelectTrigger id="backendTech">
                                            <SelectValue placeholder="MM" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            {backend.map((backend,idx)=>(
                                                <SelectItem key={idx} value={backend}>{backend}</SelectItem>
                                            ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="database">Database</FieldLabel>
                                        <Select defaultValue="" {...register("database")} onValueChange={(data)=>setValue("database",data as Database)}>
                                            <SelectTrigger id="database">
                                            <SelectValue placeholder="MM" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            {databasees.map((database,idx)=>(
                                                <SelectItem key={idx} value={database}>{database}</SelectItem>
                                            ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </div>
                            </FieldGroup>
                        ):projectType==="fullstack"?(
                            <FieldGroup>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="frontendTech">Frontend</FieldLabel>
                                        <Select defaultValue="" {...register("frontendTech")} onValueChange={(data)=>setValue("frontendTech",data as FrontendTech)}>
                                            <SelectTrigger id="frontendTech">
                                            <SelectValue placeholder="MM" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            {frontend.map((frontend,idx)=>(
                                                <SelectItem key={idx} value={frontend}>{frontend}</SelectItem>
                                            ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="backendTech">Backend</FieldLabel>
                                        <Select defaultValue="" {...register("backendTech")} onValueChange={(data)=>setValue("backendTech",data as BackendTech)}>
                                            <SelectTrigger id="backendTech">
                                            <SelectValue placeholder="Backend" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            {backend.map((backend,idx)=>(
                                                <SelectItem key={idx} value={backend}>{backend}</SelectItem>
                                            ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </div>
                                <Field>
                                    <FieldLabel htmlFor="database">Database</FieldLabel>
                                    <Select defaultValue="" {...register("database")} onValueChange={(data)=>setValue("database",data as Database)}>
                                        <SelectTrigger id="database">
                                        <SelectValue placeholder="Database" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {databasees.map((database,idx)=>(
                                            <SelectItem key={idx} value={database}>{database}</SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </FieldGroup>
                        ):projectType==="mobileapp"?(                    
                            <FieldGroup>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="frontendTech">Frontend</FieldLabel>
                                        <Select defaultValue="" {...register("frontendTech")} onValueChange={(data)=>setValue("frontendTech",data as FrontendTech)}>
                                            <SelectTrigger id="frontendTech">
                                            <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="React">React Native</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="backendTech">Backend</FieldLabel>
                                        <Select defaultValue="" {...register("backendTech")} onValueChange={(data)=>setValue("backendTech",data as BackendTech)}>
                                            <SelectTrigger id="backendTech">
                                            <SelectValue placeholder="Backend" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            {backend.map((backend,idx)=>(
                                                <SelectItem key={idx} value={backend}>{backend}</SelectItem>
                                            ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </div>
                                <Field>
                                    <FieldLabel htmlFor="database">Database</FieldLabel>
                                    <Select defaultValue="" {...register("database")} onValueChange={(data)=>setValue("database",data as Database)}>
                                        <SelectTrigger id="database">
                                        <SelectValue placeholder="Database" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {databasees.map((database,idx)=>(
                                            <SelectItem key={idx} value={database}>{database}</SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </FieldGroup>):(
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="language">Language</FieldLabel>
                                    <Select defaultValue="" {...register("language")} onValueChange={(data)=>setValue("language",data as Language)}>
                                        <SelectTrigger id="language">
                                        <SelectValue placeholder="Language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {languages.map((language,idx)=>(
                                            <SelectItem key={idx} value={language}>{language}</SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </FieldGroup>
                        )
                    }
                </FieldSet>
                <Field orientation="horizontal">
                    <Button type="submit">Submit</Button>
                    <Button variant="outline" type="button">
                    Cancel
                    </Button>
                </Field>
                </FieldGroup>
            </form>
        </div>
    )
}

export function CreateMentorProjectForm({service}:Props){
    const router=useRouter()
    const {setValue,formState:{errors},register,handleSubmit}=useForm({
        resolver:zodResolver(MentorProjectSchema),
        mode:"onChange"
    })
    
    const onSubmit=async(data:any)=>{
        data.service=service
        const project=await createOtherProjectAction(data)
        if (project?.isSuccess) {
            toast.success("Project Created....")
            router.push('/')
        }
    }
    return(
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                <FieldSet>
                    <FieldLegend>Create Web Project</FieldLegend>
                    <FieldDescription>All transactions are secure and encrypted</FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="technology">Technology</FieldLabel>
                            <Select defaultValue="" {...register("technology")} onValueChange={(data)=>setValue("technology",data as string)}>
                                <SelectTrigger id="technology">
                                <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                {ptypes.map((frontend,idx)=>(
                                    <SelectItem key={idx} value={frontend}>{frontend}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="domain">Domain</FieldLabel>
                            <Select defaultValue="" {...register("domain")} onValueChange={(data)=>setValue("domain",data as Domain)}>
                                <SelectTrigger id="domain">
                                <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                {domains.map((domain,idx)=>(
                                    <SelectItem key={idx} value={domain}>{domain}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                    <FieldSeparator />
                </FieldSet>
                <Field orientation="horizontal">
                    <Button type="submit">Submit</Button>
                    <Button variant="outline" type="button">
                    Cancel
                    </Button>
                </Field>
                </FieldGroup>
            </form>
        </div>
    )
}

export function CreateOtherProjectForm({service}:Props){
    const router=useRouter()
    const {setValue,formState:{errors},register,handleSubmit}=useForm({
        resolver:zodResolver(SupportedProjectSchema),
        mode:"onChange"
    })
    
    const onSubmit=async(data:any)=>{
        data.service=service
        const project=await createOtherProjectAction(data)
        if (project?.isSuccess) {
            toast.success("Project Created....")
            router.push('/')
        }
    }
    return(
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                <FieldSet>
                    <FieldLegend>Create Web Project</FieldLegend>
                    <FieldDescription>All transactions are secure and encrypted</FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="projectName">Project Name</FieldLabel>
                            <Input type="text" {...register("projectName")} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="projectType">Project Type</FieldLabel>
                            <Select defaultValue="" {...register("projectType")} onValueChange={(data)=>setValue("projectType",data as ProjectType)}>
                                <SelectTrigger id="projectType">
                                <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                {ptypes.map((ptype,idx)=>(
                                    <SelectItem key={idx} value={ptype}>{ptype}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                    <FieldSeparator/>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Textarea {...register("description")}/>
                        </Field>
                    </FieldGroup>
                    <FieldSeparator />
                </FieldSet>
                <Field orientation="horizontal">
                    <Button type="submit">Submit</Button>
                    <Button variant="outline" type="button">
                    Cancel
                    </Button>
                </Field>
                </FieldGroup>
            </form>
        </div>
    )
}

