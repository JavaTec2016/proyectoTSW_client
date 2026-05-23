export function EventoCard({ imgSource, alt, title, body, badges, style = {} }: { imgSource: string, alt: string, title: string, body: string, badges: string[], width?: string, height?: string, style: React.CSSProperties }) {
    return (
        <div className='card' style={style}>
            <img src={imgSource} className='card-image-top' alt={alt} />
            <div className="badges pb-3">
                {badges.map(text => (
                    <span key={text} className="badge bg-info">{text}</span>
                ))}
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                    {body}
                </p>
            </div>
        </div>
    )
}