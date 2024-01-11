interface EditableFieldProps {
    placeholder: string;
    value: string;
    setValue: (value: string) => void;
    editMode: boolean;
}

export const EditableField: React.FC<EditableFieldProps> = ({
    placeholder,
    value,
    setValue,
    editMode,
    }) => {
    return (
        <>
        {editMode ? (
            <input
            className="text-md font-bold text-gray-700 dark:text-slate-300"
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
            placeholder={placeholder}
            />
        ) : (
            <p className="text-md font-bold text-gray-700 dark:text-slate-300">
            {value}
            </p>
        )}
        </>
    );
};
