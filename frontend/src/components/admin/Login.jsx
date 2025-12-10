import { useForm } from "react-hook-form";
import Layout from "../common/Layout";
import { apiUrl } from "../../config/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AdminAuthContext } from "../../context";

const Login = () => {
  const { login } = useContext(AdminAuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/admin/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status == 200) {
        const adminInfo = {
          token: result.token,
          id: result.id,
          name: result.name,
        };
        localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
        login(adminInfo);
        navigate("/admin/dashboard");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to connect to server!");
    }
  };

  return (
    <>
      <Layout>
        <div className="container-md d-flex justify-content-center py-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card shadow border-0 login">
              <div className="card-body p-4">
                <h3>Admin Login</h3>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "The email field is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="text"
                    className={`form-control ${errors.email && "is-invalid"}`}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="invalid-feedback">{errors.email?.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: "The password field is required.",
                    })}
                    type="password"
                    className={`form-control ${
                      errors.password && "is-invalid"
                    }`}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="invalid-feedback">
                      {errors.password?.message}
                    </p>
                  )}
                </div>
                <button className="btn btn-secondary">Login</button>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
