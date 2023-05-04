import { useRef, useState } from 'react';
import Nav from '../Components/Nav/Nav';
import Editor from '../Components/Editor/Editor';

function App() {
  const [fileselected, setFileselected] = useState(false);
  const [userfile, setUserfile] = useState('');
  const [fileValid, setFileValid] = useState(false);
  const [exceljson, setExceljson] = useState();

  const hiddenFileinput = useRef(null);

  const OninptChange = (e) => {
    setUserfile(e.target.files[0]);
    setFileselected(true);
  }


  const handleclick = (e) => {
    console.log(hiddenFileinput);
    hiddenFileinput.current.click();
  }


  const handlesubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("file", userfile);

    fetch("http://localhost:5000/exe", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.file_validation === 'true'){
          setExceljson(data.exceldata)
          setFileValid(true);
          console.log(data);
        }
        else {
          console.log(data);
        }
      })
      .catch((err) => console.error("Catch Error", err));

  }

  return (
    <div className='bg-emerald-100 min-h-screen p-5'>

      {fileValid ?  
      <>
      {/* <p> the file is in the storage </p> */}

      <Editor filename={userfile.name} data={exceljson}/>
      </>

      :  
      //  The file upload section  }
      <section className='mx-auto flex flex-col  py-36 text-center'>
        <h1 className='text-5xl font-extrabold my-10'>EasyExcel</h1>

          
        {fileselected
          ?
          // when file is selected 
          <div className=' flex gap-7 mx-auto '>
            <p> <span className='text-emerald-600 text-sm'>filename</span>  : {userfile.name}</p>
            <p> <span className='text-emerald-600 text-sm'>filesize</span> : {userfile.size / 1000}.kb</p>
          </div>
          :
          <label className='bg-emerald-600 px-4 py-2 mt-8 rounded-xl text-emerald-200 cursor-pointer'
            htmlFor="inputfile"
            onClick={handleclick}
          >
            <input type="file" onChange={OninptChange}
              accept='.xlsx'
              id='inputfile'
              ref={hiddenFileinput}
              className='text-transparent hidden'
            />

            Upload
          </label>

        }
          <button className=' bg-emerald-600 px-4 py-2 mt-4 rounded-xl text-emerald-200' 
          onClick={handlesubmit} >Import your File</button>
        
        <div>
          <Nav />
          {/* <main></main> */}
        </div>

      </section>
 }

    </div>
  );
}

export default App;
