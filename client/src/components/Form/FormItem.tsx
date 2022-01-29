
interface FormItemProps {
    value: string;
    name: string;
    type?: string;
    corner: string;

    register: any;
}

export const FormItem = ({
    name,
    type,
    value,
    corner,
    register
}: FormItemProps) => {
    return (
        <div>
            <input
                {...register(name)}
                id={name}
                name={name}
                type={type ? type : name}
                required
                className={`${(corner == "t") ? "rounded-t-md" : "" || (corner == "b") ? "rounded-b-md" : ""} appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder={value}
            />
        </div>
    )
}