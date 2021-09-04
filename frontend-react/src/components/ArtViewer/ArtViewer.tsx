
import { useEffect, useState } from 'react'
import Card from '../Card'
import { createAPI } from './api'
import ArtCard from './ArtCard'
import ObjectList from './ObjectList'
import { ArtObject, SearchResponse } from './ObjectModel'

const ArtViewer = () => {
  const [api] = useState(createAPI())
  const [objects, setObjects] = useState<SearchResponse | undefined>()
  const [focusedObject, setFocusedObject] = useState<ArtObject | undefined>()

  useEffect(() => {
    loadObjects()
    // if (!objects) {
    // }
    // handleOnNextClicked()
  }, [])

  useEffect(() => {
    console.log('objects :>> ', objects);
  }, [objects])

  const loadObjects = () => {
    api.getObjectsWithImages()
      .then(res => {
        console.log('res :>> ', res);
        setObjects(res)
      })
      .catch(err => {
        console.log('err :>> ', err);
      })
  }

  const loadFocusedObject = (id: number) => {
    api.getObjectById(id)
      .then(res => {
        console.log('Loaded object :>> ', res);
        setFocusedObject(res)
      })
  }

  const handleOnNextClicked = () => {
    const rand = Math.floor(Math.random() * 100)
    if (!focusedObject) {
      loadFocusedObject(rand)
    } else {
      loadFocusedObject(focusedObject.objectID ? focusedObject.objectID + 1 : rand)
    }
  }
  const handleOnReloadListClicked = () => {
    loadObjects()
  }

  console.log('objects :>> ', objects);
  return (
    <div className="bg-gray-100 h-full flex-1 flex">
      {/* <div className="border-2 border-gray-800 flex">
        <button className="w32 m-auto p-1" onClick={handleOnNextClicked}>Next</button>
        <button className="w32 m-auto p-1" onClick={handleOnReloadListClicked}>Reload</button>
      </div> */}
      <ObjectList objects={objects} onSelectObject={(objectId) => loadFocusedObject(objectId)}/>
      <ArtCard focusedObject={focusedObject} />
    </div>
  )
}




export default ArtViewer
