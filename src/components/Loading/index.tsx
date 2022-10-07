import style from './Loading.module.scss'

export default function Loading() {
  return (
    <div className={style['lds-ring']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
