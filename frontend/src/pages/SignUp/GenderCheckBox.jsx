const GenderCheckBox = ({onCheckboxChange,selectedGender}) => {
  return (
    <div className='flex'>
        <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${selectedGender==="male"?"selected":""}`}>
            <span className='text-base label-text text-white'>Male</span>
            <input type='checkbox' className='checkbox border-gray-500' 
            checked={selectedGender==='male'}
            onChange={()=>onCheckboxChange('male')}
            />
        </label>
        </div>
        <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${selectedGender==="male"?"selected":""}`}>
            <span className='text-base label-text text-white'>Female</span>
            <input type='checkbox' className='checkbox border-slate-950' 
            checked={selectedGender==='female'}
            onChange={()=>onCheckboxChange('female')}
            />
        </label>

        </div>

    </div>
  )
}

export default GenderCheckBox