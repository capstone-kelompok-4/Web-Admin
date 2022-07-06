import React from 'react'
import Button from '../../Components/Button/Button';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Navigation/Sidebar'
import EditMaterial from './EditMaterial';
import classes from "./UploadFiles.module.css";

const UploadFiles = () => {
  return (
    <>
      <Sidebar activeNow="Upload Files"/>
      <div className={classes.container}>
        <Header data="Upload Files"/>
        <div className={classes.containerContent}>
          <h3>Files and Assets</h3>
          <p>Documents and attachments that have been uploaded as part of this courses.</p>
          <div className={classes.uploadFiles}>
            <form>
              <label htmlFor="files">File Name</label>
              <input type="text" placeholder='Materi Fundamental UI/UX' />
              <label htmlFor="type">Type File</label>
              <select name="type" id="type">
                <option value="video">Video</option>
                <option value="material">Material</option>
                <option value="quiz">Quiz</option>
              </select>
              <label htmlFor="attachment">Attachment</label>
              <p>Drop the attachment links below with permission access for public.</p>
              <textarea 
                name="attachment" 
                id="attachment" 
                rows="4"
                placeholder='https://docs.google.com/presentation/d/e/2PACX-1vSneupNyKmSiV9_7xSdfAL2lBQLTMm9bR0NWUDfycEUtjfx7AE0cwz2pTw_z8LkV1dYVr9o4rfoql1O/embed?frameborder=&slide=id.g1081a60370a_0_134'
              ></textarea>
              <label htmlFor="course">Course</label>
              <select name="course" id="course" style={{width: "45%"}}>
                <option>Choose Course Name</option>
                <option value="material">Material</option>
                <option value="quiz">Quiz</option>
              </select>
              <label htmlFor="section">Section</label>
              <select name="section" id="section" style={{width: "35%"}}>
                <option>Choose Section Name</option>
                <option value="material">Material</option>
                <option value="quiz">Quiz</option>
              </select>
              <div className={classes.action}>
                <Button className={classes.btnSave} name="Save"/>
              </div>
            </form>
          </div>
          <EditMaterial />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default UploadFiles