import style from './Loading.module.scss';

export default function Loading() {
  return (
    <div className={style.spinnerContainer}>
      <div className={style.loadingSpinner}/>
    </div>
  )
}
