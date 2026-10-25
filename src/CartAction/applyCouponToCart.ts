"use server"
import { getMyToken } from '@/utilities/mytoken';
import axios from 'axios';
export async function applyCouponToCartAction(couponTitle:string) {

    const token = await getMyToken();

    if (!token) {
      return {
        status: "error",
        message: "Please log in first",
      };
    }
    
    const {data} = await axios.put("https://ecommerce.routemisr.com/api/v2/cart/applyCoupon",{
  couponName: couponTitle
},{
      headers:{
        token:token as string,
        "Content-Type":"application/json",
      }
    })


    return data;
}