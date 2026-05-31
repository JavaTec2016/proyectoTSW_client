import type { ErrorOption } from "react-hook-form";

export function printErrors(error: ErrorOption) {
    return (
        <div>
            {Object.keys(error.types!).map(type => (
                <p key={type} className="text-danger">{error.types![type]}</p>
            ))}
        </div>
    );
}

export function printCustomErrors(errors:string[]){
    return (
        <div>
            {errors.map((text, idx) => (
                <p key={idx} className="text-danger">{text}</p>
            ))}
        </div>
    )
}