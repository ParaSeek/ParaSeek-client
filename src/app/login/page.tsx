"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import Loader_dots from "@/components/Loader_dots";
import { useToast } from "@/hooks/use-toast";
import useLogin from "@/hooks/useLogin"
import useSignup from "@/hooks/useSignup";
import useResetPwd from "@/hooks/useResetPwd";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import LoadUserData from "@/components/LoadUserData";
import { signInWithGoogle } from "../firebase.config";
import { FaGoogle } from "react-icons/fa6";
import { login } from "@/slices/userSlice";

interface UserData {
  username?: string;
  email?: string;
  role?: string;
  password?: string;
  activation_code?: number;
}

const Page = () => {
  const [formType, setFormType] = useState<"login" | "signup" | "forgotPassword" | "otp">("login");
  const { register, handleSubmit, control, formState: { errors }, } = useForm<UserData>();

  const toggleForm = (type: "login" | "signup" | "forgotPassword" | "otp") => {
    setFormType(type);
  };

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  var token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('accessToken') || ''
  }


  //custom hooks for login, signup, forgetPass,email verification api calls
  const { performLogin, isLoggingIn } = useLogin();
  const { performSignup, isSigningUp } = useSignup();
  const { performResetPwd, isResettingPwd } = useResetPwd();
  const { verifyEmail, isVerifying } = useVerifyEmail();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [otpError, setOtpError] = useState("")

  const userLog = useSelector((state: RootState) => state.user.isLoggedIn);

  const [revalidateData, setRevalidateData] = useState(false)

  //Loading States update from hooks
  useEffect(() => {
    setLoading(isSigningUp);
  }, [isSigningUp])
  useEffect(() => {
    setLoading(isVerifying);
  }, [isVerifying])
  useEffect(() => {
    setLoading(isResettingPwd);
  }, [isResettingPwd])
  useEffect(() => {
    setLoading(isLoggingIn)
  }, [isLoggingIn])

  const handleOTPVerify = async () => {
    if (otp[0] == "" || otp[1] == "" || otp[2] == "" || otp[3] == "" || otp[4] == "" || otp[5] == "") {
      setOtpError("Enter 6 digit numeric verification code")
    } else {
      setOtpError("");
      setLoading(true);
      const data = {
        otp: (otp[0] + otp[1] + otp[2] + otp[3] + otp[4] + otp[5])
      }
      const result = await verifyEmail({ activation_code: data.otp || "" });
      if (result.success) {
        setFormType("login");
        toast({ title: result.message });
      } else {
        toast({ variant: 'destructive', title: result.message });
      }
    }
  }
  const onSubmit = async (data: UserData) => {
    if (formType === "login") {
      const result = await performLogin({ email: data.email || "", password: data.password || "" });
      if (result.success) {
        toast({ title: result.message });
        setRevalidateData(true);
      } else {
        toast({ variant: 'destructive', title: result.message });
      }
    } else if (formType === "signup") {
      const result = await performSignup({ username: data.username || "", email: data.email || "", role: data.role || "", password: data.password || "" });
      if (result.success) {
        setFormType("otp");
        toast({ title: result.message });
      } else {
        toast({ variant: 'destructive', title: result.message });
      }
    } else if (formType === "forgotPassword") {
      const result = await performResetPwd({ email: data.email || "" });
      if (result.success) {
        setFormType("login");
        toast({ title: result.message });
      } else {
        toast({ variant: 'destructive', title: result.message });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();

    // Send this token to server
    if (user) {

      const response = await fetch(`${process.env.SERVER_URL}/api/v1/auth/social-auth`, {
        method: 'POST',
        credentials: "include" as const,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: user.displayName, email: user.email, profilePic: user.photoURL }),
      });

      const res = await response.json();
      if (res.success) {
        toast({ title: "Logged in via Google" })
        localStorage.setItem("accessToken", "loggedIn")
        dispatch(login(res.data));
      } else {
        localStorage.removeItem("accessToken")
      }
    } else {
      console.log('Error signing in with Google');
    }

  };


  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        if (token) {
          router.push('/');
        }
      }
    };

    checkAuth();
  }, [token, router]);
  if (userLog) {
    return (
      <section className="justify-center bg-background">
        <Loader_dots text="Loading" />
        {revalidateData && <LoadUserData />}
      </section>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center p-2 bg-background/70 min-h-screen">
      <AnimatePresence>
        <motion.div
          key={formType}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          layout="position"
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 bg-card rounded-lg shadow-md"
        >
          <h2 className="mb-6 text-2xl font-bold text-center">{formType === "login" ? "Login" : formType === "signup" ? "Register" : formType === "otp" ? "Verify OTP" : "Forgot Password"}</h2>
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
            {formType === "otp" && (
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
                className="text-sm hover:underline cursor-pointer"
                onClick={() => toggleForm("forgotPassword")}
              >
                Forgot Password?
              </span>
            )}
            <div>

              {formType === "otp" ?
                <Button
                  id="otp-submit"
                  disabled={loading}
                  type="submit"
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
              {
                formType === "login" && (
                  <button type="button" className="bg-black text-white dark:text-black flex items-center gap-2 font-semibold px-3 py-2 rounded-lg w-full justify-center mt-2 dark:bg-white hover:bg-black/90 hover:dark:bg-white/90" onClick={handleGoogleSignIn}>
                    <FaGoogle />Continue with Google
                  </button>
                )
              }
            </div>
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
