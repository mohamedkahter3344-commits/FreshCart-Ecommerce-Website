import { toast } from "@/components/ui/toast";
import { LoginTypeSchema } from "@/schema/loginSchema";
import axios, { isAxiosError } from "axios";
import {signIn as signInNextAuth} from "next-auth/react"

export async function signIn(values: LoginTypeSchema):Promise<boolean> {

 const res = await signInNextAuth("credentials",{
  email : values.email,
  password: values.password,
  redirect:false,
  callbackUrl:"/",
 })

 console.log(res)

 if (res?.ok) {
   toast.add({
      type: "success",
      description: "Login Succssefuly",
    });

    window.location.href = res?.url || "/";
        return true;

 } else {
    toast.add({
      type: "error",
      description: res?.error,
    });
    return false;
 }


  // try {
  //   const { data } = await axios.post(
  //     "https://ecommerce.routemisr.com/api/v1/auth/signin",
  //     values,
  //   );

  //   toast.add({
  //     type: "success",
  //     description: data.message,
  //   });

  //   return true;
  // } catch (error) {
  //   const message = isAxiosError(error)
  //     ? error.response?.data?.message || error.message
  //     : "Something went wrong";

  //   toast.add({
  //     type: "error",
  //     description: message,
  //   });

  //   console.error(message);

  //   return false;
  // }
}