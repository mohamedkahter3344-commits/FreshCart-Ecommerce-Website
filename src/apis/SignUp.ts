import { toast } from "@/components/ui/toast";
import type { RegisterTypeSchema } from "@/schema/registerSchema";
import axios, { isAxiosError } from "axios";

export async function SignUp(values: RegisterTypeSchema) {
  try {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      values,
    );

    toast.add({
      type: "success",
      description: data.message,
    });

    return true;
  } catch (error) {
    const message = isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Something went wrong";

    toast.add({
      type: "error",
      description: message,
    });

    console.error(message);

    return false;
  }
}