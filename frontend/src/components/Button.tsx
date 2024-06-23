interface ButtonProps {
    type: "Sign In" | "Sign Up" | "Post";
    reqFunction?: () => Promise<void>;
}

export const BlackButton = ({ type, reqFunction }: ButtonProps) => {
    return <div>
        <button onClick={reqFunction} type="button" className={`${type === "Post" ? "py-2 px-4 rounded-3xl text-lg" : "mt-4 w-full py-2.5 rounded-lg"} text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-md`}>{type}</button>
    </div>
}

export const GreenButton = ({ reqFunction }: { reqFunction: () => Promise<void> }) => {
    return <button onClick={reqFunction} type="button" className="focus:outline-none text-slate-100 bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 rounded-3xl text-lg px-4 py-1">Publish</button>
}