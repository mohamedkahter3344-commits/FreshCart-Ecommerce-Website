"use server"
import { getMyToken } from '@/utilities/mytoken';
import axios from 'axios';
export async function deleteProductCartAction(id:string) {

    const token = await getMyToken();

    if (!token) {
      return {
        status: "error",
        message: "Please log in first",
      };
    }
    
    const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v2/cart/${id}`,{
      headers:{
        token:token as string
      }
    })


    return data;

}
