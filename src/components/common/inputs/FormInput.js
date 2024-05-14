const FormInput = ({ htmlFor, label, children, colSpan, required }) => {
  return (
    <div className={`sm:col-span-${colSpan || 3}`}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700"
      >
        {required ? '*' : ''}
        {label || ''}
      </label>
      <div>{children}</div>
    </div>
  );
};

export default FormInput;

/**
 * PurgeCSS:
 * sm:col-span-1
 * sm:col-span-2
 * sm:col-span-3
 * sm:col-span-4
 * sm:col-span-5
 * sm:col-span-6
 * sm:col-span-7
 * sm:col-span-8
 * sm:col-span-9
 * sm:col-span-10
 * sm:col-span-11
 * sm:col-span-12
 */
