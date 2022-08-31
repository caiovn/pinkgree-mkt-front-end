import React from 'react'
import style from './RadioGroup.module.scss'

interface CheckboxProps {
  label: string
  register: any
}

const Checkbox = ({ label, register }: CheckboxProps) => {
  return (
    <div>
      <div>
        <input
          type="checkbox"
          id={`radio-btn`}
          {...register}
        />
        <label htmlFor={`radio-btn`}>{label}</label>
      </div>
    </div>
  )
}

export default Checkbox
