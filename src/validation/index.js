import { object, string, number, date, InferType } from 'yup'; 

export const typevalidationSchema = object({
    name: string().required('Type is Required').label("name"),
});

export const tickettypevalidationSchema = object({
    name: string().required('Ticket Type is Required').label("name"),
});


export const categoryvalidationSchema = object({
    name: string().required('Category Name is Required').label("Name")
});


export const permissionvalidationSchema = object({
    name: string().required('Permission name is required').label("Name")
});

export const rolevalidationSchema = object({
    name: string().required('Role Name is required').label("Name"),
    permissions: array().of(number()).required('permission is requried').label("Permissions"),
});


export const subcategoryvalidationSchema = object({
    name: string().required('name is requried').label("Name"),
    category: number().required('category is required').label("category"),
});

export const coupopnvalidationSchema = object({
    code: string().required().label("Code"),
    amount: number().required().label("Amount"),
    discount_type: string().required().label('discount_type'),
    description: string().required().label('description'),
});