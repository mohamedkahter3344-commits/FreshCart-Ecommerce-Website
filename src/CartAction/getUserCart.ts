"use server"
import { getMyToken } from '@/utilities/mytoken';
import axios from 'axios';
export async function getUserCartAction() {

    const token = await getMyToken();

    if (!token) {
      return {
        status: "error",
        message: "Please log in first",
      };
    }
    
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v2/cart",{
      headers:{
        token:token as string
      }
    })


    return data;
}