import React from 'react'

const GenderCheckBox = () => {
  return (
    <div className='flex'>
        <div className='form-control'>
        <label className={`label gap-2 cursor-pointer`}>
            <span className='text-base label-text text-white'>Male</span>
            <input type='checkbox' className='checkbox border-gray-500' />
        </label>
        </div>
        <div className='form-control'>
        <label className={`label gap-2 cursor-pointer`}>
            <span className='text-base label-text text-white'>Female</span>
            <input type='checkbox' className='checkbox border-slate-950' />
        </label>

        </div>

    </div>
  )
}

export default GenderCheckBox