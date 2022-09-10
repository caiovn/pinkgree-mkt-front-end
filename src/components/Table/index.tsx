import { ISku } from 'src/types'
import styles from './Table.module.scss'

export const Table = ({ skuAttributes }: Pick<ISku, 'skuAttributes'>) => (
  <table className={styles.table}>
    <tbody>
      {skuAttributes.map((skuAttribute, index) => {
        return (
          <tr key={`tr-${index}`}>
            <th>
              <p>{skuAttribute.label}</p>
            </th>
            <td>
              <p>{skuAttribute.value}</p>
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
)
