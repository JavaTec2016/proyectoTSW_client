function Breadcrumb({ path }: { path: string }) {
    const pages = path.split('/');
    if (pages[0].length == 0) pages.shift();
    let built = '';
    return (
        <div className='breadcrumb-bar'>
            <ol>
                {pages.map(name => {
                    built += '/' + name;
                    return (
                        <li key={name}>
                            <a className='breadcrumb-sep' href={built}>{' › ' + name}</a>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}
export default Breadcrumb