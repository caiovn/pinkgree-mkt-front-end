import React from 'react'
import style from './RadioGroup.module.scss'

interface RadioGroupProps {
  options: Array<{
    label: string
    value: any
  }>
  register?: any
  errorMessage?: string
}

const RadioGroup = ({ options, register, errorMessage }: RadioGroupProps) => {
  return (
    <div>
      {options.map((option, index) => {
        return (
          <div key={index} className={style.radioButtonWrapper}>
            <input id={`radio-btn-${option.value}`} type="radio" value={option.value} {...register} />
            {option.label && (
              <label className={style.label} htmlFor={`radio-btn-${option.value}`}>
                {option.label}
              </label>
            )}
          </div>
        )
      })}
      {errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}
    </div>
  )
}

export default RadioGroup
