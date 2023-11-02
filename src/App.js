import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import { useState , useEffect} from 'react';
import apiRequest from './apiRequest';




function App() {
  const API_URL = 'https://raw.githubusercontent.com/Rohitjaiswar123/groceries-app-react/main/data/db.json'

    const [items, setItems] = useState([]);

    const[search, setSearch] = useState('');

    const [newItem, setNewItem] = useState('');

    const [fetchError, setFetchError] = useState(null);

    const[isLoading,setIsLoading] = useState(true);


    useEffect (() => {
      const fetchItems = async () => {
        try{
          const response = await fetch(API_URL);
          if (!response.ok)  throw Error('Did not receive any data');
          const listItems = await response.json();
          // console.log(listItems)
          setItems(listItems);
          setFetchError(null);
      } catch(err){
        setFetchError(err.message);
      }finally{
        setIsLoading(false);
      }
    }
       setTimeout(() => {
         (async () => await fetchItems())();
       }, 2000);
    },[])

    const addItem = async (item)  => {
      const id = items.length ? items[items.length - 1].id + 1 : 1;//Length begins at 1 and array starts at 0 , -1 is used
      const myNewItem = {id, checked:  false, item }; //Object is written
      const listItems = [...items, myNewItem] //spread operator is used
      setItems(listItems)

      const postOptions = {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(myNewItem)
      }
      const result = await apiRequest(API_URL, postOptions); 
      if (result) setFetchError(result)
  }
      
    const handlecheck = async (id) => {
      const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item)
      setItems(listItems)

      const myItem = listItems.filter((item) => item.id === id);
      const updateOptions = {
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({ checked: myItem[0].checked })
      };

      const reqUrl = `${API_URL}/${id}`;
      const result = await apiRequest(reqUrl,updateOptions);
      if (result) setFetchError( result);
    } 

    const handleDelete = async (id) => {
      const listItems = items.filter((item) => item.id !== id);
      setItems(listItems)

      const deleteOptions = { method: 'DELETE'};
      const reqUrl = `${API_URL}/${id}`;
      const result = await apiRequest(reqUrl,deleteOptions);
      if (result) setFetchError (result);
    }

    const handleSubmit = (e) => {
      e.preventDefault(); // no reloading
      if(!newItem) return; // none
      addItem(newItem)
      setNewItem('')
    }

  return(
  <div className="App">
    <Header />
    <AddItem 
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
    />
    <SearchItem
      search={search}
      setSearch={setSearch}
    />
    <main>
      {isLoading && <p>Loading Items...</p>}
      {fetchError && <p style={{color:'red'}}>{`${fetchError}`}</p>}
       {!fetchError && !isLoading  && <Content 
        items={items.filter(item =>(item.item).toLowerCase().includes(search.toLowerCase()))}
        setItems={setItems}
        handleDelete={handleDelete}
        handlecheck={handlecheck}
      />}
    </main>
    <Footer 
      length ={items.length} />
  </div>
  );
}


export default App;
