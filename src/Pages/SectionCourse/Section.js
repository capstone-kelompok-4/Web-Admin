import React from 'react'
import Button from '../../Components/Button/Button'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Navigation/Sidebar'
import EditSection from './EditSection'
import classes from "./Section.module.css"

const Section = () => {
  return (
    <>
      <Sidebar activeNow="Section Course"/>
      <div className={classes.container}>
        <Header data="Section Course"/>
        <div className={classes.containerContent}>
          <h3>Section Course</h3>
          <p>Setting the part section of the course to make easier uploading files.</p>
          <div className={classes.sectionCourse}>
            <form>
              <label htmlFor="sectionNumber">Section Number</label>
              <input type="number" placeholder='e.g  8' id='sectionNumber' style={{width: "15%"}}/>
              <label htmlFor="sectionName">Section Name</label>
              <input type="text" placeholder='e.g Materi Fundamental UI/UX' id='sectionName' />
              <label htmlFor="course">Course</label>
              <select name="course" id="course" style={{width: "45%"}}>
                <option>Choose Course Name</option>
                <option value="material">Material</option>
                <option value="quiz">Quiz</option>
              </select>
              <div className={classes.action}>
                <Button className={classes.btnSave} name="Save"/>
              </div>
            </form>
          </div>
          <EditSection />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Section