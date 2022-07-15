import React from 'react'
import classes from "./Activity.module.css";

function Activity({ data }) {
  const showFormattedDate = (date) => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }
    return new Date(date).toLocaleString("en-US", options)
  }
  return (
    <>
      <div className='my-3'>
        <table>
          <tbody>
            {data.map((user) => (
              <div className='mb-2'>
                <tr className='d-flex align-items-center w-100'>
                    <td><img src={user.avatar} className="rounded-circle flex-column align-items-center" alt="profileImg" width="40px" height="40px"/></td>
                    <td className='flex-column align-items-center mx-2' style={{columnGap: "10px"}}>
                      <p className={`m-0 fw-bold ${classes.infoname}`}>{user.name}</p>
                      <p className={`m-0 ${classes.infoactivity}`}>{user.activity}</p>
                    </td>
                </tr>
              </div>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Activity