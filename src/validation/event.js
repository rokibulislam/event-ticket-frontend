import { object, string, number, date, InferType, mixed, array } from 'yup'; 

export const eventvalidationSchema = object({
    name: string().required('name is required').label("name"),
    tickets: array().of(
      object().shape({
        ticketName: string().required('Ticket Name is required'),
        ticketPrice: number().required('Ticket Price is required'),
        ticketQty: number().required('Ticket Price is required'),
      })
    ),
    // venuetickets: array().of(
    //   object().shape({
    //     name: string().required('Category Name is required'),
    //     price: string().required('Price is required'),
    //     fee: string().required('Price is required'),
    //     qty: string().required('Price is required'),
    //   })
    // ),
    type: number().required("type is required").label("type"),
    category: number().required("category is requried").label("category"),
    venue: number().required("venue is required").label("venue"),
    description: string().required("description is required").label('description'),
    image: mixed().required("Image Required").label('image'),
    startdate: mixed().required("Start Date Required").label('startdate'),
    enddate: mixed().required("Start Date Required").label('enddate'),
    starttime: mixed().required("Start Date Required").label('starttime'),
    endtime: mixed().required("Start Date Required").label('endtime'),
});