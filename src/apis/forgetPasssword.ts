
import { toast } from "@/components/ui/toast";
import axios, { isAxiosError } from "axios";


type ForgetPasswordProps = {
 email:string,
};

export async function forgetPasswordUser(values: ForgetPasswordProps) {
  try {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      values,
    );

    toast.add({
      type: "success",
      description: data.message,
    });

    return true;
  } catch (error) {
    let message = "Something went wrong";

    if (isAxiosError(error)) {
      message =
        error.response?.data?.errors?.msg ||
        error.response?.data?.message ||
        error.message;
    }

    toast.add({
      type: "error",
      description: message,
    });

    console.error(message);

    return false;
  }
}
