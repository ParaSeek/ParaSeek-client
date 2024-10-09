"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "../../slices/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import Loader_dots from "@/components/Loader_dots";
import { useToast } from "@/hooks/use-toast";
interface UserData {
  username?: string;
  email?: string;
  role?: string;
  password?: string;
  activation_code?: number;
}

const Page = () => {
  const [formType, setFormType] = useState<
    "login" | "signup" | "forgotPassword" | "otp"
  >("login");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserData>();

  const toggleForm = (type: "login" | "signup" | "forgotPassword" | "otp") => {
    setFormType(type);
  };
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [otpError, setOtpError] = useState("")
  const userLog = useSelector((state: RootState) => state.user.isLoggedIn);
  const handleOTPVerify = async () => {
    if (otp[0] == "" || otp[1] == "" || otp[2] == "" || otp[3] == "" || otp[4] == "" || otp[5] == "") {
      setOtpError("Enter 6 digit numeric verification code")
    } else {
      setOtpError("");
      setLoading(true);
      const data = {
        activation_code: (otp[0] + otp[1] + otp[2] + otp[3] + otp[4] + otp[5])
      }
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/auth/activate-user",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const dataRes = await res.json();
        console.log(dataRes);
        if (dataRes.success) {
          setFormType("login");
          toast({ title: dataRes.message });
        } else {
          toast({ variant: "destructive", title: dataRes.message });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "Internal Server Error",
        });
      } finally {
        setLoading(false);
      }
    }
  }
  const onSubmit = async (data: UserData) => {
    if (formType === "login") {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/api/v1/auth/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const dataRes = await res.json();
        if (dataRes.success) {
          console.log(dataRes);

          dispatch(login(dataRes.data));
          toast({ title: "Logged in successfully!" });
        } else {
          toast({ variant: "destructive", title: dataRes.message });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "Internal Server Error",
        });
      } finally {
        setLoading(false);
      }
    } else if (formType === "signup") {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/api/v1/auth/register", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const dataRes = await res.json();
        console.log(dataRes);
        if (dataRes.success) {
          setFormType("otp");
          toast({ title: dataRes.message });
        } else {
          toast({ variant: "destructive", title: dataRes.message });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "Internal Server Error",
        });
      } finally {
        setLoading(false);
      }
    } else if (formType === "forgotPassword") {
      setLoading(true);
      console.log("Forgot Password data:", data);
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/auth/forgotPassword",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const dataRes = await res.json();
        console.log(dataRes);
        if (dataRes.success) {
          setFormType("login");
          toast({ title: dataRes.message });
        } else {
          toast({ variant: "destructive", title: dataRes.message });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "Internal Server Error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  if (userLog) {
    router.push("/account");
  }

  if (userLog) {
    return (
      <section className="justify-center">
        <Loader_dots text="Loading" />
      </section>
    );
  }
  return (
    <div
      style={{ minHeight: "calc(100vh - 64px)" }}
      className="flex flex-col items-center justify-center p-2 bg-secondary"
    >
      <AnimatePresence>
        <motion.div
          key={formType}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          layout="position"
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 bg-white dark:bg-gray-950 rounded-lg shadow-md"
        >
          <h2 className="mb-6 text-2xl font-bold text-center">
            {formType === "login"
              ? "Login"
              : formType === "signup"
                ? "Register"
                : formType === "otp"
                  ? "Verify OTP"
                  : "Forgot Password"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              {(formType === "signup") && (
                <Input
                  type="text"
                  placeholder="username"
                  className="w-full"
                  {...register("username", {
                    required: true,
                    pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/,
                  })}
                />
              )}
              {errors.username && (
                <span className="text-red-500 text-xs">
                  Username should start from a letter and can include numbers
                  and underscore
                </span>
              )}
            </div>

            {(formType === "signup" || formType === "login" || formType === "forgotPassword") && (
              <div className="mb-4">
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full"
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    Invalid email address
                  </span>
                )}
              </div>
            )}
            {formType === "signup" && (
              <div className="mb-4">
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="job_seeker">Job-seeker</SelectItem>
                        <SelectItem value="employer">Employer</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            )}
            {(formType === "login" || formType == "signup") && (
              <div className="mb-4">
                <Input
                  type="password"
                  placeholder="Password"
                  className="w-full"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            )}
            {formType === "otp" || (
              <div>
                <div className="mb-4 flex w-full gap-4">
                  <div className="w-1/6">
                    <Input
                      type="text"
                      id="otp-1"
                      pattern="[0-9]{1}"
                      inputMode="numeric"
                      className="w-full"
                      maxLength={1}
                      value={otp[0]}
                      onPaste={(e: any) => {
                        e.preventDefault();
                        const clipboardData = e.clipboardData;
                        const pastedText = clipboardData.getData('text');
                        setOtp((prev) => {
                          prev[0] = pastedText.substring(0, 1)
                          prev[1] = pastedText.substring(1, 2)
                          prev[2] = pastedText.substring(2, 3)
                          prev[3] = pastedText.substring(3, 4)
                          prev[4] = pastedText.substring(4, 5)
                          prev[5] = pastedText.substring(5, 6)
                          return [...prev]
                        })
                      }}
                      onKeyDown={(e: any) => {
                        if (/^\d+$/.test(e.key)) {
                          setOtp((prev) => { prev[0] = e.key; return [...prev] })
                          setTimeout(() => {
                            const nextInput = document.getElementById("otp-2")
                            nextInput?.focus();
                          }, 0)
                        } else if (e.key === "Backspace") {
                          setOtp((prev) => { prev[0] = ""; return [...prev] })
                          setTimeout(() => {
                            const prevInput = document.getElementById("otp-1")
                            prevInput?.focus();
                          }, 0)
                        } else if (e.key === "Enter") {
                          setOtp((prev) => { return [...prev] })
                          setTimeout(() => {
                            const submit = document.getElementById("otp-submit")
                            submit?.focus();
                          }, 0)
                        } else if (/^[a-zA-Z]+$/.test(e.key)) {
                          setOtp((prev) => { prev[0] = ""; return [...prev] })
                        }
                      }}
                    />
                  </div>
                  <div className="w-1/6">
                    <Input
                      type="text"
                      id="otp-2"
                      pattern="[0-9]{1}"
                      inputMode="numeric"
                      className="w-full"
                      maxLength={1}
                      value={otp[1]}
                      onPaste={(e: any) => {
                        e.preventDefault();
                        const clipboardData = e.clipboardData;
                        const pastedText = clipboardData.getData('text');
                        setOtp((prev) => {
                          prev[0] = pastedText.substring(0, 1)
                          prev[1] = pastedText.substring(1, 2)
                          prev[2] = pastedText.substring(2, 3)
                          prev[3] = pastedText.substring(3, 4)
                          prev[4] = pastedText.substring(4, 5)
                          prev[5] = pastedText.substring(5, 6)
                          return [...prev]
                        })
                      }
                      }
                      onKeyDown={(e: any) => {
                        if (/^\d+$/.test(e.key)) {
                          setOtp((prev) => { prev[1] = e.key; return [...prev] })
                          setTimeout(() => {
                            const nextInput = document.getElementById("otp-3")
                            nextInput?.focus();
                          }, 0)
                        } else if (e.key === "Backspace") {
                          setOtp((prev) => { prev[1] = ""; return [...prev] })
                          setTimeout(() => {
                            const prevInput = document.getElementById("otp-1")
                            prevInput?.focus();
                          }, 0)
                        } else if (e.key === "Enter") {
                          setOtp((prev) => { return [...prev] })
                          setTimeout(() => {
                            const submit = document.getElementById("otp-submit")
                            submit?.focus();
                          }, 0)
                        } else if (/^[a-zA-Z]+$/.test(e.key)) {
                          setOtp((prev) => { prev[1] = ""; return [...prev] })
                        }
                      }}
                    />
                  </div>
                  <div className="w-1/6">
                    <Input
                      type="text"
                      id="otp-3"
                      pattern="[0-9]{1}"
                      inputMode="numeric"
                      className="w-full"
                      maxLength={1}
                      value={otp[2]}
                      onPaste={(e: any) => {
                        e.preventDefault();
                        const clipboardData = e.clipboardData;
                        const pastedText = clipboardData.getData('text');
                        setOtp((prev) => {
                          prev[0] = pastedText.substring(0, 1)
                          prev[1] = pastedText.substring(1, 2)
                          prev[2] = pastedText.substring(2, 3)
                          prev[3] = pastedText.substring(3, 4)
                          prev[4] = pastedText.substring(4, 5)
                          prev[5] = pastedText.substring(5, 6)
                          return [...prev]
                        })
                      }
                      }
                      onKeyDown={(e: any) => {
                        if (/^\d+$/.test(e.key)) {
                          setOtp((prev) => { prev[2] = e.key; return [...prev] })
                          setTimeout(() => {
                            const nextInput = document.getElementById("otp-4")
                            nextInput?.focus();
                          }, 0)
                        } else if (e.key === "Backspace") {
                          setOtp((prev) => { prev[2] = ""; return [...prev] })
                          setTimeout(() => {
                            const prevInput = document.getElementById("otp-2")
                            prevInput?.focus();
                          }, 0)
                        } else if (e.key === "Enter") {
                          setOtp((prev) => { return [...prev] })
                          setTimeout(() => {
                            const submit = document.getElementById("otp-submit")
                            submit?.focus();
                          }, 0)
                        } else if (/^[a-zA-Z]+$/.test(e.key)) {
                          setOtp((prev) => { prev[2] = ""; return [...prev] })
                        }
                      }}
                    />
                  </div>
                  <div className="w-1/6">
                    <Input
                      type="text"
                      id="otp-4"
                      pattern="[0-9]{1}"
                      inputMode="numeric"
                      className="w-full"
                      maxLength={1}
                      value={otp[3]}
                      onPaste={(e: any) => {
                        e.preventDefault();
                        const clipboardData = e.clipboardData;
                        const pastedText = clipboardData.getData('text');
                        setOtp((prev) => {
                          prev[0] = pastedText.substring(0, 1)
                          prev[1] = pastedText.substring(1, 2)
                          prev[2] = pastedText.substring(2, 3)
                          prev[3] = pastedText.substring(3, 4)
                          prev[4] = pastedText.substring(4, 5)
                          prev[5] = pastedText.substring(5, 6)
                          return [...prev]
                        })
                      }
                      }
                      onKeyDown={(e: any) => {
                        if (/^\d+$/.test(e.key)) {
                          setOtp((prev) => { prev[3] = e.key; return [...prev] })
                          setTimeout(() => {
                            const nextInput = document.getElementById("otp-5")
                            nextInput?.focus();
                          }, 0)
                        } else if (e.key === "Backspace") {
                          setOtp((prev) => { prev[3] = ""; return [...prev] })
                          setTimeout(() => {
                            const prevInput = document.getElementById("otp-3")
                            prevInput?.focus();
                          }, 0)
                        } else if (e.key === "Enter") {
                          setOtp((prev) => { return [...prev] })
                          setTimeout(() => {
                            const submit = document.getElementById("otp-submit")
                            submit?.focus();
                          }, 0)
                        } else if (/^[a-zA-Z]+$/.test(e.key)) {
                          setOtp((prev) => { prev[3] = ""; return [...prev] })
                        }
                      }}
                    />
                  </div>
                  <div className="w-1/6">
                    <Input
                      type="text"
                      id="otp-5"
                      pattern="[0-9]{1}"
                      inputMode="numeric"
                      className="w-full"
                      maxLength={1}
                      value={otp[4]}
                      onPaste={(e: any) => {
                        e.preventDefault();
                        const clipboardData = e.clipboardData;
                        const pastedText = clipboardData.getData('text');
                        setOtp((prev) => {
                          prev[0] = pastedText.substring(0, 1)
                          prev[1] = pastedText.substring(1, 2)
                          prev[2] = pastedText.substring(2, 3)
                          prev[3] = pastedText.substring(3, 4)
                          prev[4] = pastedText.substring(4, 5)
                          prev[5] = pastedText.substring(5, 6)
                          return [...prev]
                        })
                      }
                      }
                      onKeyDown={(e: any) => {
                        if (/^\d+$/.test(e.key)) {
                          setOtp((prev) => { prev[4] = e.key; return [...prev] })
                          setTimeout(() => {
                            const nextInput = document.getElementById("otp-6")
                            nextInput?.focus();
                          }, 0)
                        } else if (e.key === "Backspace") {
                          setOtp((prev) => { prev[4] = ""; return [...prev] })
                          setTimeout(() => {
                            const prevInput = document.getElementById("otp-4")
                            prevInput?.focus();
                          }, 0)
                        } else if (e.key === "Enter") {
                          setOtp((prev) => { return [...prev] })
                          setTimeout(() => {
                            const submit = document.getElementById("otp-submit")
                            submit?.focus();
                          }, 0)
                        } else if (/^[a-zA-Z]+$/.test(e.key)) {
                          setOtp((prev) => { prev[4] = ""; return [...prev] })
                        }
                      }}
                    />
                  </div>
                  <div className="w-1/6">
                    <Input
                      type="text"
                      id="otp-6"
                      pattern="[0-9]{1}"
                      inputMode="numeric"
                      className="w-full"
                      maxLength={1}
                      value={otp[5]}
                      onPaste={(e: any) => {
                        e.preventDefault();
                        const clipboardData = e.clipboardData;
                        const pastedText = clipboardData.getData('text');
                        setOtp((prev) => {
                          prev[0] = pastedText.substring(0, 1)
                          prev[1] = pastedText.substring(1, 2)
                          prev[2] = pastedText.substring(2, 3)
                          prev[3] = pastedText.substring(3, 4)
                          prev[4] = pastedText.substring(4, 5)
                          prev[5] = pastedText.substring(5, 6)
                          return [...prev]
                        })
                      }
                      }
                      onKeyDown={(e: any) => {
                        if (/^\d+$/.test(e.key)) {
                          setOtp((prev) => { prev[5] = e.key; return [...prev] })
                          setTimeout(() => {
                            const nextInput = document.getElementById("otp-6")
                            nextInput?.focus();
                          }, 0)
                        } else if (e.key === "Backspace") {
                          setOtp((prev) => { prev[5] = ""; return [...prev] })
                          setTimeout(() => {
                            const prevInput = document.getElementById("otp-5")
                            prevInput?.focus();
                          }, 0)
                        } else if (e.key === "Enter") {
                          setOtp((prev) => { return [...prev] })
                          setTimeout(() => {
                            const submit = document.getElementById("otp-submit")
                            submit?.focus();
                          }, 0)
                        } else if (/^[a-zA-Z]+$/.test(e.key)) {
                          setOtp((prev) => { prev[5] = ""; return [...prev] })
                        }
                      }}
                    />
                  </div>
                </div>
                <span className="text-red-500 text-xs">
                  {otpError}
                </span>
              </div>
            )}
            {formType === "login" && (
              <span
                className="text-red-500 text-xs underline cursor-pointer"
                onClick={() => toggleForm("forgotPassword")}
              >
                Forgot Password?
              </span>
            )}
            {formType === "otp" ?
              <Button
                id="otp-submit"
                disabled={loading}
                className="w-full py-2 mt-4 text-lg font-medium text-white bg-primary rounded-md hover:bg-primary/90" onClick={handleOTPVerify}>
                {loading ? (
                  <Loader_dots text="Verifying" />
                ) : (
                  "Verify"
                )}
              </Button>
              :
              <Button
                disabled={loading}
                type="submit"
                className="w-full py-2 mt-4 text-lg font-medium text-white bg-primary rounded-md hover:bg-primary/90"
              >
                {formType === "login" ? (
                  loading ? (
                    <Loader_dots text="Logging in" />
                  ) : (
                    "Login"
                  )
                ) : formType === "signup" ? (
                  loading ? (
                    <Loader_dots text="Signing Up" />
                  ) : (
                    "Sign Up"
                  )
                ) : loading ? (
                  <Loader_dots text="Loading" />
                ) : (
                  "Reset Password"
                )}
              </Button>
            }
          </form>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-center"
          >
            <a
              href="#"
              onClick={() =>
                toggleForm(formType === "login" ? "signup" : formType === "signup" ? "login" : formType === "forgotPassword" ? "login" : "signup")

              }
              className="text-primary hover:underline"
            >
              {formType === "login"
                ? "Create an account"
                : formType === "signup"
                  ? "Already have an account? Login"
                  : formType === "otp"
                    ? "Back to signup"
                    : "Back to Login"}
            </a>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div >
  );
};

export default Page;
