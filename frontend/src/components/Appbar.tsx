import { Avatar } from "./Avatar";
import logo from "../assets/logo.png";
import sm_logo from "../assets/sm-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { BlackButton } from "./Button";
import { useUserData } from "../hooks/useUserData";
import { useState } from "react";

export const Appbar = () => {
    const navigate = useNavigate();
    const { loading, user } = useUserData();
    const [hover, setHover] = useState(false);

    if (loading) {
        return <div></div>
    }

    return (
        <div className="border-b flex justify-between items-center py-2 pl-4 shadow-2xl">
            <Link to={`/`}>
                <img className="h-10 hidden sm:block" src={logo} alt="Logo" />
                <img className="h-10 block sm:hidden" src={sm_logo} alt="Small logo" />
            </Link>

            <div className="items-center flex">
                <div className="flex justify-center text-slate-700 text-xl mr-5 ml-16 cursor-pointer" onClick={() => { navigate("/blogs") }}>
                    Blogs
                </div>

                <div className="flex justify-center text-slate-700 text-xl mr-5 cursor-pointer" onClick={() => { localStorage.removeItem("token"); window.location.href = "/" }}>
                    Logout
                </div>

                <div className="">
                    <Link className="flex mr-5 justify-center" to={`/publish`}>
                        <BlackButton type={"Post"} />
                    </Link>
                </div>

                <div className="flex mr-5 justify-center relative" onMouseEnter={() => setHover(c => !c)} onMouseLeave={() => setHover(c => !c)}>
                    {user && <div>
                        <Avatar name={user.name} size="big" />
                    </div>
                    }
                </div>

                {hover && user && (
                    <div className="absolute top-16 p-3 bg-white border rounded shadow-lg" onMouseEnter={() => setHover(c => !c)}>
                        <div className="flex">
                            <div className="font-bold pr-1">Name:</div>
                            <div className="text-slate-500">{user.name}</div>
                        </div>
                        <div className="flex">
                            <div className="font-bold pr-1">Email: </div>
                            <div className="text-slate-500">{user.email}</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold">AccountID</div>
                            <div className="text-slate-500">{user.id}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}