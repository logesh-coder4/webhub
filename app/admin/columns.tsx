"use client"

import { ArrowUpDown, MoreHorizontal, Verified } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { Blog, Message, Notification, OtherProjects, Testimonials, User, WebProjects } from "@/lib/generated/prisma/client"
import { IconCancel } from "@tabler/icons-react"
import { Dispatch, SetStateAction } from "react"

interface ColumnProps{
    setId:Dispatch<SetStateAction<number|null>>
    setOperation:Dispatch<SetStateAction<"delete"|"update"|null>>
}

export const userColumns=({setId,setOperation}:ColumnProps):ColumnDef<User>[]=>{
    return(
    [
        {
            id: "select",
            header: ({ table }) => (
            <Checkbox
                checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
            ),
            cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey:"id"
        },
        {
            accessorKey: "username",
            header: "Username",
            cell: ({ row }) => (
            <div className="capitalize">{row.getValue("username")}</div>
            ),
        },
        {
            accessorKey:"isActive",
            cell({row}) {
                const value=row.getValue("isActive")
                return(
                    <div className="">
                        {value===true?<Verified className="text-green-500"/>:<IconCancel/>}
                    </div>
                )
            },
        },
        {
            accessorKey:"isAdmin",
            cell({row}) {
                const value=row.getValue("isAdmin")
                return(
                    <div className="">
                        {value===true?<Verified className="text-green-500"/>:<IconCancel/>}
                    </div>
                )
            },
        },
        {
            accessorKey:"isSuperUser",
            cell({row}) {
                const value=row.getValue("isSuperUser")
                return(
                    <div className="">
                        {value===true?<Verified className="text-green-500"/>:<IconCancel/>}
                    </div>
                )
            },
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Email
                <ArrowUpDown />
                </Button>
            )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
        },
        {
            accessorKey:"joinedAt",
            cell:({row})=>{
            const date=new Date(row.getValue("joinedAt"))
            return <div>{date.toDateString()}</div>
        }
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
            const data = row.original

            return (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(data.username)}
                    >
                    Copy payment ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>{
                        setOperation("delete")
                        setId(data.id)
                    }}>Delete</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>{
                        setOperation("update")
                        setId(data.id)
                    }}>Update</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            )
            },
        },
    ]   
    )    
}

export const webProjectColumns= ({setId,setOperation}:ColumnProps):ColumnDef<WebProjects>[]=>{
    return(
    [
        {
            id: "select",
            header: ({ table }) => (
            <Checkbox
                checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
            ),
            cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey:"id"
        },
        {
            accessorKey: "name",
            header: "name",
            cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey:"isVerified",
            cell({row}) {
                const value=row.getValue("isActive")
                return(
                    <div className="">
                        {value===true?<Verified className="text-green-500"/>:<IconCancel/>}
                    </div>
                )
            },
        },
        {
            accessorKey: "projectType",
            header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Email
                <ArrowUpDown />
                </Button>
            )
            },
        },
        {
            accessorKey:"createdAt",
            cell:({row})=>{
            const date=new Date(row.getValue("createdAt"))
            return <div>{date.toDateString()}</div>
        }
        },
        {
            accessorKey:"frontendTech"
        },
        {
            accessorKey:"backendTech"
        },
        {
            accessorKey:"database"
        },
        {
            accessorKey:"model"
        },
        {
            accessorKey:"language"
        },
        {
            accessorKey:"description"
        },
        {
            accessorKey: "price",
            header: () => <div className="text-right">price</div>,
            cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))

            // Format the price as a dollar price
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)

            return <div className="text-right font-medium">{formatted}</div>
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
            const data = row.original

            return (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(data.name)}
                    >
                    Copy payment ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>{
                        setOperation("delete")
                        setId(data.id)
                    }}>Delete</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>{
                        setOperation("update")
                        setId(data.id)
                    }}>Update</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            )
            },
        },
    ]   
    )    
}

export const otherProjectColumns=({setId,setOperation}:ColumnProps):ColumnDef<OtherProjects>[]=>{
    return(
    [
        {
            id: "select",
            header: ({ table }) => (
            <Checkbox
                checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
            ),
            cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey:"id"
        },
        {
            accessorKey: "projectName",
            header: "ProjectName",
            cell: ({ row }) => (
            <div className="capitalize">{row.getValue("projectName")}</div>
            ),
        },
        {
            accessorKey:"isVerified",
            cell({row}) {
                const value=row.getValue("isActive")
                return(
                    <div className="">
                        {value===true?<Verified className="text-green-500"/>:<IconCancel/>}
                    </div>
                )
            },
        },
        {
            accessorKey: "projectType",
            header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Email
                <ArrowUpDown />
                </Button>
            )
            },
        },
        {
            accessorKey:"createdAt",
            cell:({row})=>{
            const date=new Date(row.getValue("createdAt"))
            return <div>{date.toDateString()}</div>
        }
        },
        {
            accessorKey:"TaskType"
        },
        {
            accessorKey:"domain"
        },
        {
            accessorKey:"model"
        },
        {
            accessorKey:"service"
        },
        {
            accessorKey:"description"
        },
        {
            accessorKey: "price",
            header: () => <div className="text-right">price</div>,
            cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))

            // Format the price as a dollar price
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)

            return <div className="text-right font-medium">{formatted}</div>
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
            const data = row.original

            return (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(data.projectName!)}
                    >
                    Copy payment ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>{
                        setOperation("delete")
                        setId(data.id)
                    }}>Delete</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>{
                        setOperation("update")
                        setId(data.id)
                    }}>Update</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            )
            },
        },
    ]   
    )    
}

export const testimonialsColumns=({setId,setOperation}:ColumnProps):ColumnDef<Testimonials>[]=>{
    return(
    [
        {
            id: "select",
            header: ({ table }) => (
            <Checkbox
                checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
            ),
            cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey:"id"
        },
        {
            accessorKey: "message",
            header: "Message",
            cell: ({ row }) => (
            <div className="capitalize">{row.getValue("message")}</div>
            ),
        },
        {
            accessorKey:"isApproved",
            cell({row}) {
                const value=row.getValue("isApproved")
                return(
                    <div className="">
                        {value===true?<Verified className="text-green-500"/>:<IconCancel/>}
                    </div>
                )
            },
        },
        {
            accessorKey:"createdAt",
            cell:({row})=>{
            const date=new Date(row.getValue("createdAt"))
            return <div>{date.toDateString()}</div>
        }
        },
        {
            accessorKey:"userId"
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
            const data = row.original

            return (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(data.message)}
                    >
                    Copy payment ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>{
                        setOperation("delete")
                        setId(data.id)
                    }}>Delete</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>{
                        setOperation("update")
                        setId(data.id)
                    }}>Update</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            )
            },
        },
    ]   
    )    
}

export const notificationsColumns=({setId,setOperation}:ColumnProps):ColumnDef<Notification>[]=>{
    return(
    [
        {
            id: "select",
            header: ({ table }) => (
            <Checkbox
                checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
            ),
            cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey:"id"
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
            <div className="capitalize">{row.getValue("title")}</div>
            ),
        },
        {
            accessorKey:"isRead",
            cell({row}) {
                const value=row.getValue("isRead")
                return(
                    <div className="">
                        {value===true?<Verified className="text-green-500"/>:<IconCancel/>}
                    </div>
                )
            },
        },
        {
            accessorKey: "type",
            header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Email
                <ArrowUpDown />
                </Button>
            )
            },
        },
        {
            accessorKey:"createdAt",
            cell:({row})=>{
            const date=new Date(row.getValue("createdAt"))
            return <div>{date.toDateString()}</div>
        }
        },
        {
            accessorKey:"message"
        },
        {
            accessorKey:"userId"
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
            const data = row.original

            return (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(data.title!)}
                    >
                    Copy payment ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>{
                        setOperation("delete")
                        setId(data.id)
                    }}>Delete</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>{
                        setOperation("update")
                        setId(data.id)
                    }}>Update</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            )
            },
        },
    ]   
    )    
}
export const blogColumns=({setId,setOperation}:ColumnProps):ColumnDef<Blog>[]=>{
    return(
    [
        {
            id: "select",
            header: ({ table }) => (
            <Checkbox
                checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
            ),
            cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey:"id"
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
            <div className="capitalize">{row.getValue("title")}</div>
            ),
        },
        {
            accessorKey:"isPublished",
            cell({row}) {
                const value=row.getValue("isPublished")
                return(
                    <div className="">
                        {value===true?<Verified className="text-green-500"/>:<IconCancel/>}
                    </div>
                )
            },
        },
        {
            accessorKey:"createdAt",
            cell:({row})=>{
            const date=new Date(row.getValue("createdAt"))
            return <div>{date.toDateString()}</div>
        }
        },
        {
            accessorKey:"description"
        },
        {
            accessorKey:"userId"
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
            const data = row.original

            return (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(data.title!)}
                    >
                    Copy payment ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>{
                        setOperation("delete")
                        setId(data.id)
                    }}>Delete</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>{
                        setOperation("update")
                        setId(data.id)
                    }}>Update</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            )
            },
        },
    ]   
    )    
}

export const messagesColumns=({setId,setOperation}:ColumnProps):ColumnDef<Message>[]=>{
    return(
    [
        {
            id: "select",
            header: ({ table }) => (
            <Checkbox
                checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
            ),
            cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey:"id"
        },
        {
            accessorKey: "text",
            header: "Text",
            cell: ({ row }) => (
            <div className="capitalize">{row.getValue("text")}</div>
            ),
        },
        {
            accessorKey: "senderId",
            header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Email
                <ArrowUpDown />
                </Button>
            )
            },
        },
        {
            accessorKey:"createdAt",
            cell:({row})=>{
            const date=new Date(row.getValue("createdAt"))
            return <div>{date.toDateString()}</div>
        }
        },
        {
            accessorKey:"webProjectKey"
        },
        {
            accessorKey:"otherProjectKey"
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
            const data = row.original

            return (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(data.text)}
                    >
                    Copy payment ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>{
                        setOperation("delete")
                        setId(data.id)
                    }}>Delete</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>{
                        setOperation("update")
                        setId(data.id)
                    }}>Update</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            )
            },
        },
    ]   
    )    
}