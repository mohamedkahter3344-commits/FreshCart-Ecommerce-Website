
import { toast } from "@/components/ui/toast";
import axios, { isAxiosError } from "axios";
import { getMyToken } from "@/utilities/mytoken";

type ChangePasswordProps = {
  currentPassword: string;
  password: string;
  rePassword: string;
};

export async function changePassword(values: ChangePasswordProps) {
  try {
    const token = await getMyToken();

    if (!token) {
      toast.add({
        type: "error",
        description: "Please log in first",
      });

      return false;
    }

    const { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      values,
      {
        headers: {
          token: token as string,
        },
      }
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
