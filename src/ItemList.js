
import LineItem from './LineItem'

const ItemList = ({items,handleDelete,handlecheck}) => {
  return (
      <ul>
        {items.map((item) => (
           <LineItem
                item={item}
                key={item.id}
                handleDelete={handleDelete}
                handlecheck={handlecheck}
           />
        ))}
    </ul>
  )
}

export default ItemList 