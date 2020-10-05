// axios es una libreria que nos permite hacer peticiones a una API
// Y nos devuelve sus datos en json
// Y está basado en las promesas para poder ejecutarse

import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Posts from './component/Posts';
import Pagination from './component/Pagination';

//useState se utiliza para manejar el estado de la app
//lo llamamos con import "React, { useState } from 'react';"
//y con "const [posts,setPosts] = useState([]);" creamos dos cosas
//posts que vendría siendo una variable, y setPosts que es una función, la cual va a actualizar a la variable
//También tenemos a "useState([])" que siempre tendrá un primer argumento, un estado inicial

const App = () => {
    const [posts,setPosts] = useState([]); // READY
    const [loading, setLoading] = useState(false); // READY
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);

    //useEffect es un efecto sencundario
    //que se aplica en componentes funcionales
    //useEffect equivale a componentDidMount, componentDidUpdate y componentWillUnmount combinados.

    useEffect(()=>{
        
        // async indica que dicha función tiene dentro
        // de sus declaraciones operaciones que son asíncronas
        // La palabra await resuelve la promesa y devuelve
        // el valor que podemos asignar a una variable
        // Y axios nos permite realizar el get

        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data); // con este método  mostramos la data
            setLoading(false);
        }
        fetchPosts();
    }, []); 
    
    //Para ejecutar un efecto y sanearlo solamente una vez (al montar y desmontar), se pasa un array vacío 
    //([]) como segundo argumento. Esto le indica a React que el efecto no depende de ningún valor proveniente
    //de las props o el estado, de modo que no necesita volver a ejecutarse. 
    //también podemos pasarle un argumento, en el cual el efecto solo ocurrirá cuando esa variable 
    //por ejemplo, sea DIFERENTE a la actualización emitida por el efecto, ya que los compara mediante un array,
    //esto quiere decir que si el argumento es igual a la variable el efecto no se ejecutará
    //por lo tanto se optimiza el renderizado.

    //El saneamiento es lo que evita la duplicidad de ejecuciones en el programa, cuando por ejemplo se debe ejecutar una sola vez el programa y cuando sea igual o diferente a un caso especifico.
    
    //Peticiones de datos, establecimiento de suscripciones y actualizaciones manuales del DOM en componentes de React son ejemplos de efectos secundarios.
    //en este caso estamos haciendo un request de datos (ejemplo perfecto)
    //En muchas ocasiones queremos llevar a cabo el mismo efecto secundario
    //sin importar si el componente acaba de montarse o si se ha actualizado. 
    //El efecto secundario vendría siendo la petición de datos
    //¿Qué hace useEffect? le indica a react que el componente tiene que hacer algo después de renderizarse. 
    //Poner useEffect dentro del componente nos permite acceder a la variable de estado "count" (o a cualquier prop) directamente desde el efecto.
    //En vez de pensar en términos de “montar” y “actualizar”, es más fácil pensar en efectos que ocurren “después del renderizado”
    //también podemos usar varios estados y varios efectos par apoder diferenciarlos


    // Current post
    const indexLastPost = currentPage * postPerPage; // la pagina x 10 posts, para obtener el último
    const indexFirstPosts = indexLastPost - postPerPage; // y para obtener el primero
    const currentPosts = posts.slice(indexFirstPosts, indexLastPost);
    // currentPosts me va a dar una sección entre el primero y el segundo
    // slice nos sirve para tomar un reflejo de dos array, siendo sus argumentos (inicio, final)

    // paginate
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <h1>Blog</h1>
            < Posts 
            posts = {currentPosts} 
            loading = {loading}
            />
            < Pagination 
            postPerPage = {postPerPage}
            totalPosts = {posts.length}
            paginate = {paginate}
            />
        </div>
    )
}
export default App;