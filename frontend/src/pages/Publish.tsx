import axios from "axios";
import { GreenButton } from "../components/Button";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateBlogInput } from "@priyanshudevsingh/medium-common";
import { Loader } from "../components/Loader";

export const Publish = () => {
    const [postInputs, setPostInputs] = useState<CreateBlogInput>({
        title: "",
        content: ""
    })
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function sendRequest() {
        try {
            setLoading(true);
            const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title: postInputs.title,
                content: postInputs.content
            }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            });
            setLoading(false);
            navigate(`/blog/${res.data.id}`)
        } catch (e) {
            setLoading(false);
            alert("Error while posting")
            console.log(e);
        }
    }

    if (loading) {
        return (<Loader />)
    }

    return (
        <div className="flex items-center flex-col">
            <div className="max-w-screen-lg w-full mt-16 mx-5">
                <input type="text" className="bg-gray-50 border border-gray-500 text-gray-900 text-md rounded-lg w-full p-2.5" placeholder="Title" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        title: e.target.value
                    })

                }} />
            </div>

            <div className="max-w-screen-lg w-full mx-5 my-5">
                <textarea className="block p-2.5 w-full h-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500" placeholder="Tell your story ..." onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        content: e.target.value
                    })

                }}></textarea>
            </div>

            <div className="mx-5">
                <GreenButton reqFunction={sendRequest} />
            </div>
        </div>
    );
};