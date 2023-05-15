import { object, string, number, date, InferType, array,ref as yupref } from 'yup'; 

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
    // permissions: array().of(number()).required('permission is requried').label("Permissions"),
});


export const subcategoryvalidationSchema = object({
    name: string().required('name is requried').label("Name"),
    category: number().required('category is required').label("category"),
});

export const coupopnvalidationSchema = object({
    code: string().required().label("Code"),
    amount: number().required().label("Amount"),
    // discount_type: string().required().label('discount_type'),
    // description: string().required().label('description'),
});


export const VenuevalidationSchema = object({
    name: string().required().label("name"),
    nickname: string().required().label("nickname"),
    postcode: string().required().label("postcode"),
    country: string().required().label("country"),
    city: string().required().label("city"),
});


export const checkoutvalitionSchema = object({
    firstname: string().required().label('firstname'),
    lastname: string().required().label('lastname'),
    email: string().required().email().label("email"),
    phonenumber: string().required().label("phonenumber"),
    postalcode: string().required().label("postalcode"),
    cardNumber: string().required().label("cardNumber"),
    expirationDate: string().required().label("expirationDate"),
    cvv: string().required().label("cvv"),
})


export const loginvalidationSchema = object({
    email: string().required().email().label("email"),
    password: string().required().min(4).label("password")
});

export const registervalidationSchema = object({
    username: string().required().min(3).label("username"),
    email: string().required().email().label("email"),
    password: string().min(4).required().label("Password"),
    confirmPassword: string()
      .oneOf([yupref('password'), null], 'Passwords must match') // added password confirmation validation
      .required('Please confirm your password')
});