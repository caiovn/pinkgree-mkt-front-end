const ProductCard = ({ name, price, mainImageUrl, categories }: IProducts) => {
  return (
    <fieldset style={{ margin: '8px 0' }}>
      <p>{name}</p>
      <p>{price}</p>
      <img src={mainImageUrl} style={{ width: '100%' }} />
      {categories.map(({ id: categoryId, name: categoryName }) => {
        return (
          <div key={categoryId}>
            <span>{categoryName}</span>
          </div>
        );
      })}
    </fieldset>
  )
}

export default ProductCard;
