"use server"
import { getMyToken } from '@/utilities/mytoken';
import axios from 'axios';
export async function deleteProductWishListAction(id:string) {

    const token = await getMyToken();

    if (!token) {
      return {
        status: "error",
        message: "Please log in first",
      };
    }
    
    const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
      headers:{
        token:token as string
      }
    })


    return data;

}
