
import { toast } from "@/components/ui/toast";
import axios, { isAxiosError } from "axios";


type updatePasswordProps = {
email:string,
    newPassword: string
};

export async function updateForgetPasswordUser(values: updatePasswordProps) {
  try {
    const { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      values,
    );

    toast.add({
      type: "success",
      description: data.message || "Update Password Successfully",
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
