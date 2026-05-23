import type { ErrorOption } from "react-hook-form";

export function printErrors(error: ErrorOption) {
    console.log(error)
    return (
        <div>
            {Object.keys(error.types!).map(type => (
                <p key={type} className="text-danger">{error.types![type]}</p>
            ))}
        </div>
    );
}
