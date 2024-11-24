import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../../../components/ui/scroll-area";
import PropTypes from "prop-types";
import Input from "@/components/Input";
import { useInput } from "@/hooks/useInput";
import { usePost } from "@/hooks/usePost";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useFetch } from "@/hooks/useFetch";
import SelectModal from "@/components/modals/SelectModal";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { useEffect } from "react";

export default function AddUserSheet({ trigger }) {
  const {
    value: userRole,
    handleInputChange: handleUserRoleChange,
    handleInputBlur: handleUserRoleBlur,
    handleResetState: handleUserRoleReset,
    hasError: userRoleHasError,
  } = useInput("", (value) => value !== "" && value !== "-");

  const {
    value: program,
    handleInputChange: handleProgramChange,
    handleInputBlur: handleProgramBlur,
    handleResetState: handleProgramReset,
    hasError: programHasError,
  } = useInput("", (value) => value !== "" && value !== "-");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      userId: "",
      fName: "",
      lName: "",
      email: "",
      password: "",
    },
  });
  const {
    data: postData,
    loading: postLoading,
    error: postError,
    postData: postUser,
  } = usePost("http://localhost:3000/api/users/post_user", {});

  useEffect(() => {
    if (postData?.data?.affectedRows > 0) {
      toast("User Added Successfully", {
        className: "m-5",
        description: `User Added Successfully`,
      });
    }
  }, [postData]);
  const {
    data: fetchData,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch("http://localhost:3000/api/users/fetch/user-roles", []);

  let roleOptions = [];
  let studentProrams = [];
  if (fetchData?.data?.length > 0) {
    studentProrams = fetchData?.data[0]?.map((role) => ({
      value: role.ProgramID,
      label: role.ProgramName,
    }));
    roleOptions = fetchData?.data[1]?.map((role) => ({
      value: role.UserRoleID,
      label: role.UserRoleName,
    }));
  }

  const handleOnFormSubmit = async (data) => {
    if (
      (userRole === "STDNT" && (program === "-" || program === "")) ||
      userRole === "-" ||
      userRole === ""
    ) {
      setError("root", {
        message: "Please fill all the fields",
      });
      return;
    }

    data.userRole = userRole;
    if (userRole === "STDNT") {
      const studentData = [
        { label: "Program", value: program },
        { label: "Contact Number", value: data.contactNumber },
      ];
      data.student = studentData;
    }
    await postUser(data);
  };

  const handleSheetClose = () => {
    handleUserRoleReset();
    handleProgramReset();
    reset();
  };

  return (
    <Sheet modal onOpenChange={handleSheetClose}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        className="flex flex-1 flex-col gap-2 outline"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Add User</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          Addint User
          {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        </SheetDescription>
        <form
          className="flex h-full flex-col"
          onSubmit={handleSubmit(handleOnFormSubmit)}
        >
          {postError && <p className="text-red-500">{postError.message}</p>}
          {fetchError && <p className="text-red-500">{fetchError.message}</p>}
          {postLoading || (fetchLoading && <CustomSkeleton times={1000} />)}
          {!postLoading && (
            <ScrollArea className="flex h-[35rem] flex-col gap-2 px-5">
              <Input
                type="text"
                placeholder="User ID"
                isError={errors.userId}
                register={{
                  ...register("userId", {
                    required: "User ID is required",
                    validate: (value) => {
                      if (value.length !== 11) {
                        return "User ID must be 11 digits long";
                      }
                      if (isNaN(value)) {
                        return "User ID must be a number";
                      }
                      return true;
                    },
                  }),
                }}
              />
              <Input
                type="text"
                placeholder="First Name"
                isError={errors.fName}
                register={{
                  ...register("fName", {
                    required: "First name is required",
                    validate: (value) => {
                      const nameRegex = /^[A-Za-zÀ-ÿ\s-'"]+$/;
                      return (
                        nameRegex.test(value) || "Please enter a valid name."
                      );
                    },
                  }),
                }}
              />
              <Input
                type="text"
                placeholder="Last Name"
                isError={errors.lName}
                register={{
                  ...register("lName", {
                    required: "Last name is required",
                    validate: (value) => {
                      const nameRegex = /^[A-Za-zÀ-ÿ\s-'"]+$/;
                      return (
                        nameRegex.test(value) || "Please enter a valid name."
                      );
                    },
                  }),
                }}
              />
              <Input
                type="text"
                placeholder="Email"
                isError={errors.email}
                register={{
                  ...register("email", {
                    required: "Email is required",
                    validate: (value) => {
                      const emailRegex =
                        /^[a-zA-Z]+[.]\d+@([a-zA-Z]+[.]){1,2}[a-zA-Z]+\.[a-z]{2,3}$/;
                      return (
                        emailRegex.test(value) || "Please enter a valid email."
                      );
                    },
                  }),
                }}
              />
              <Input
                type={"text"}
                placeholder="Password"
                isError={errors.password}
                register={{
                  ...register("password", {
                    required: "Password is required",
                  }),
                }}
              />

              <div className="mx-2 my-5">
                <SelectModal
                  labelStyle="text-white"
                  value={userRole}
                  handleInputChange={handleUserRoleChange}
                  handleInputBlur={handleUserRoleBlur}
                  hasError={userRoleHasError}
                  id={"user-role"}
                  className="text-black"
                  placeholder={"User Role"}
                  options={roleOptions}
                />
              </div>
              {userRole === "STDNT" && (
                <>
                  <Input
                    type="text"
                    placeholder={"Student Contact Number"}
                    isError={errors.contactNumber}
                    register={{
                      ...register("contactNumber", {
                        required: "Contact Number is required",
                        validate: (value) => {
                          if (value.length !== 11) {
                            return "Contact Number must be 11 digits long";
                          }
                          if (isNaN(value)) {
                            return "Contact Number must be a number";
                          }
                          return true;
                        },
                      }),
                    }}
                  />
                  <SelectModal
                    labelStyle="text-white"
                    value={program}
                    handleInputChange={handleProgramChange}
                    handleInputBlur={handleProgramBlur}
                    hasError={programHasError}
                    className="text-black"
                    placeholder={"Student Program"}
                    options={studentProrams}
                  />
                </>
              )}
            </ScrollArea>
          )}
          <Button className="justify-self-end" disabled={postLoading}>
            Submit
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
AddUserSheet.propTypes = {
  trigger: PropTypes.any,
};
