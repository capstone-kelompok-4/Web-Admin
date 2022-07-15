import React from 'react'

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
                    <td><img src={user.avatar} className="rounded-circle flex-column align-items-center" alt="profileImg" width="32px" height="32px"/></td>
                    <td className='flex-column align-items-center mx-2' style={{columnGap: "10px"}}>
                      <p className='m-0 fw-bold'>{user.name}</p>
                      <p className='m-0'>{user.activity}</p>
                    </td>
                    <td className='flex-column align-items-center'><p className='m-0'>{showFormattedDate(user.createdAt)}</p></td>
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