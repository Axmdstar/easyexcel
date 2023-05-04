
// https://www.npmjs.com/package/react-grid-layout/v/1.3.4
const Column = ({ children, rows }) => {
    const arr_rows = Object.keys(rows)

    
    return (
        <div>
            <p>{children}</p>
            {arr_rows.map((keys, i) => {
                return (

                    <input id={i}  type="text" defaultValue={rows[keys]}
                        className="m-1 p-5 " name={i} />

                );
            })}

        </div>
    );
}
// export default Columns;




const Generate = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    
    // form.append("data", e.target)

    // console.log('form :>> ', form);
    // for (const pair of form.entries()) {
    //     console.log('pair[0] :>> ', pair[0], "  " , pair[1]);
    // }

    fetch("http://localhost:5000/generate", {
        method: "POST",
        body: form
    })
    .then((res) => {
        console.log('res :>> ', res);
        return res.json()
    })
    .then((data) => {
        console.log('data :>> ', data);
    })
    .catch((err) => {
        console.log(err);
    })
}



const Editor = ({ filename, data }) => {
    // arrange 
    // We are working with a 2d array or object figure this out 
    // if the db has a Id colunm use that instead else index
    console.log(data);

    console.log("DATA >>>>", data);
    return (
        <>
            <form onSubmit={Generate}>
            <div className="flex flex-row overflow-x-scroll">
                {Object.keys(data).map((cols, index) => {
                    return (
                        <Column key={index} rows={data[cols]}>
                            {cols}
                        </Column>
                    );
                })}

            </div>
            <button type="submit"
                className="bg-emerald-600 px-4 py-2 mt-4 m-auto rounded-xl"
                // onClick={Generate}
            >Generate</button>
            </form>
        </>
    );
}

export default Editor;