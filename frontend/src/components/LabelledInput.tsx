interface LabelledInputType {
    label: string
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
}

export const LabelledInput = ({ label, placeholder, onChange, type }: LabelledInputType) => {
    return <div className="pt-2.5">
        <label className="block mb-2 text-md font-bold text-gray-900">
            {label}
        </label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" type={type || "text"} placeholder={placeholder} onChange={onChange} required />
    </div>
}