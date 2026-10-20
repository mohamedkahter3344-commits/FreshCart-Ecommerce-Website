import { toast } from "@/components/ui/toast";
import { LoginTypeSchema } from "@/schema/loginSchema";
import axios, { isAxiosError } from "axios";

export async function signIn(values: LoginTypeSchema) {
  try {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
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