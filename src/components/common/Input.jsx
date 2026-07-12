export default function Input({ label, id, className = '', ...props }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="label-text text-slate-700">
          {label}
        </label>
      )}
      <input id={id} className={`input-field ${className}`} {...props} />
    </div>
  )
}
