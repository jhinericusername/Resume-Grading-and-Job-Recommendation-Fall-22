import React, {useState} from "react";
import '../../App.css';
//import PDFViewer from '../pdf_components/PDFViewer';
import "./resumeChecker.css"
import JobCards from "../jobSearch_components/JobCards"
import CategoryCards from '../jobSearch_components/CategoryCards';
import GradeCards from "../jobSearch_components/GradeCards";
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import VisibilitySensor from "react-visibility-sensor";
import { Link } from "react-router-dom";



function ResumeChecker() {
  
 const [option, setOption]=useState(true);
 const [input, setInput]=useState(false)
 const [pdfFile,setPdfFile]=useState(false);
 const [pdfError, setPdfError]=useState('');
 const [setViewPdf]=useState(false);
 const allowedFIles = ['application/pdf'];
 

  const handleSwitchChange = () => {
      return setOption(!option);
      
    
  }

  const handleInputChange = () => {
    return setInput(!input)
  }

  const handleFileChange = (e) =>{
    let selectedFile = e.target.files[0];
    localStorage.setItem("backup", selectedFile);
    if(selectedFile){
        if(selectedFile && allowedFIles.includes(selectedFile.type)){
            let reader = new FileReader();
            console.log(selectedFile);
            reader.readAsDataURL(selectedFile);


            reader.onloadend=(e)=>{
                setPdfError('');
                setPdfFile(e.target.result);
            }
            

            
        } else{
            setPdfFile(null);
            setPdfError('Not a vaild pdf: Please select a PDF');
        }
    } else {
        console.log('select a PDF');
    }
}




const handleFileSubmit=(e)=>{
    e.preventDefault();
    if(pdfFile!==null){
        setViewPdf(pdfFile);
    } else {
        setViewPdf(null);
    }
}
  
  
  return (
   
    <>
      {!input ?
        <div className="pdf_container">
          <div id="input_wrapper">
            <div class="input_card">
              <h5 className="input_title">Upload your resume to continue.</h5>
              <form className='form-group' onSubmit={handleFileSubmit} form="nameform">

                <div className='input_div'>
                <input type='file' className='input_submit' onChange={handleFileChange}></input>
                </div>
                <Link to='/' >
                  <button type="button" form="nameform" id="back_input_button" onClick="Home()">Back</button>     
                </Link>        
                <button type="button" form="nameform" id="input_button" onClick={()=> handleInputChange() } >Continue</button>
                {pdfError && <span className='text-danger'>{pdfError}</span>}
              </form>
            </div>
            

            
          </div>
        </div>
      :
        <div className="pdf_container">
          {option ?
            <div id="mydivon" class="split left">
              <h2 class="headingText">Overall Score:</h2>
              <div id="overallScore" style={{ width: 250, height: 250 }}>
                <VisibilitySensor>
                  {({ isVisible }) => {
                  const percentage = isVisible ? 90 : 0;
                    return (
                      <CircularProgressbar value={percentage} 
                        text={`${percentage}%`} 
                        styles={buildStyles({
                          textColor: "#e0e2db",
                          pathColor: "#e6af2e",
                          trailColor: "#e0e2db"
                        })}/>
                    );
                  }}
                </VisibilitySensor>
              </div>
              <h2 class="headingText">Sub Scores:</h2>
              <GradeCards/>
            </div>
            : 
            <div id="mydivoff" class="split left">
              <h2 class="headingText">Top 3 Job Categories:</h2>
              <CategoryCards/>
              <h2 class="headingText">Reccomended Jobs:</h2>
              <JobCards/>
            </div>
          }
            
            
              
            <div class="split right ">
                <div>
                    <button type="button" form="nameform" id="switchButton" onClick={()=> handleSwitchChange() } >Switch Mode</button>
                    
                    <button type="button" form="nameform" id="newResuButton" onClick={()=> handleInputChange()}>New Resume</button>
                    
                    <button type="button" form="nameform" id="backButton"  onChange="">Back</button>
                    
            
                    
                    <div className = "pdf_viewer">
                        {pdfFile && ( <iframe title="frameDisplay" src= {pdfFile}   width="100%" height="100%" > </iframe>)}
                        {!pdfFile && <>No file is selected yet</>}
                           
                    </div> 
                     

                </div>
            </div>
        </div>
      }
    </>
    
  );
}

export default ResumeChecker;
 //<PDFViewerReact document={{ url: pdfFile}} hideNavbar={true} scale={1.5}/>