import { FC } from "react";
import { SearchResponse } from "./ObjectModel";

interface Props {
  objects?: SearchResponse
  onSelectObject: (id: number) => void
}

const ObjectList: FC<Props> = (props) => {
  const { objects } = props
  console.log("iajsdj");

  if (!objects) return <div className="flex-1"><p>Empty list</p></div> 

  // Trimming list
  let delCount, trimStart, trimEnd
  if (objects.total > 5) {
    delCount = objects.total > 5 ? 5 : 0
    trimStart = delCount
    trimEnd = objects.total - delCount
  } else {
    trimStart = 0
    trimEnd = 0
  }

  console.log('trimStart, trimEnd, objects.objectIDs.length :>> ', trimStart, trimEnd, objects.objectIDs.length);

  const list = (<ul className="flex-3 border-green-900 w-44 h-full m-2 overflow-scroll">
    {
      objects.objectIDs.map(objectId => {
        return (
          <li key={`ListItem:${objectId}`} className="bg-red-400 w-62 border-2 border-gray-500 ">
            <h6>{objectId}</h6>
            <button onClick={() => props.onSelectObject(objectId)}>Load</button>
          </li>
        )
      })
    }
  </ul>)

  return list
}

export default ObjectList