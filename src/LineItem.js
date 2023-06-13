
import { FaTrashAlt } from 'react-icons/fa'

// Li key={item.id} is mentioned in addItem( lineItem tag) 

const LineItem = ({ item,handleDelete,handlecheck }) => {
  return (
    <li className="item">   
    <input 
        type="checkbox" 
        onChange={() => handlecheck(item.id)}
        checked={item.checked}
    />
    <label 
        style={(item.checked) ? {textDecoration:'line-through'} : null} 
        onDoubleClick={() => handlecheck(item.id)}
    >{item.item}</label>
    <FaTrashAlt
        onClick={() => handleDelete(item.id)}
        role= "button"
        tabIndex="0"
        aria-label={'Delete $(item.item} '}
    />
</li>
  )
}

export default LineItem