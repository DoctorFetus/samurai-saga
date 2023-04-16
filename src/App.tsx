import {useEffect, useState} from 'react'
import axios from "axios";
import './App.css'

export interface GetTodolistsResponse {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: TodolistType[]
}

export interface TodolistType {
    isImportant: boolean
    id: string
    title: string
    description: string
    addedDate: string
    order: number
    images: Images
}

export interface Images {
    main: ImageType[]
}

export interface ImageType {
    url: string
    width: number
    height: number
    fileSize: number
}

function App() {

    const [todolists, setTodolists] = useState<TodolistType[]>([])

    useEffect(() => {

        axios.get<GetTodolistsResponse>('https://todolists.samuraijs.com/api/1.0/todolists').then(response => {
            setTodolists(response.data.items)
        })

    }, [])

    return (
        <div className="App">
            {
                todolists.map((todolist) => {
                    const imgUrl = todolist.images.main.length > 1 ? todolist.images.main[1].url : "https://placehold.co/48"
                    return <div key={todolist.id.toString()}>
                        <img src={imgUrl} alt={"icon"}/>
                        <h3>
                            {todolist.isImportant && "😝"}
                            {todolist.title}
                        </h3>
                        <div>{todolist.description}</div>
                    </div>
                })
            }
        </div>
    )}


export default App