import { FC } from 'react'
import Card from '../Card'
import { ArtObject, TEMPLATE_ART_OBJECT } from './ObjectModel'

interface Props {
  focusedObject?: ArtObject
}

const ArtCard: FC<Props> = (props) => {
  const focusedObject = props.focusedObject ? props.focusedObject : TEMPLATE_ART_OBJECT
  const { title, objectName, constituents, additionalImages, primaryImage } = focusedObject

  return (<Card styles="flex-col">
    <div className="text-center border-600 border-2 m-2 flex flex-row p-3">
      <h2>{title}</h2>
      <h4>{objectName}</h4>
    </div>
    {/* Primary image */}
    <img className="w-2/4 h-2/4 object-contain m-2" src={primaryImage} alt="No primary image" />
    {/* Additional images */}
    <div className="flex">
      {additionalImages.map((url, i) => {
        return (<img key={`AdditionalImage${i}`} src={url} alt="No alt img" className="h-40 w-40 object-contain" />)
      })}
    </div>
    {/* Constituents */}
    {constituents && constituents.map((c, i) => {
      return (
        <div key={`card${i}`} className="bg-gray-700">
          <p>{c.constituentID}</p>
          <p>{c.name}</p>
          <p>{c.gender}</p>
          <p>{c.constituentULAN_URL}</p>
          <p>{c.constituentWikidata_URL}</p>
        </div>
      )
    })}
  </Card>)
}

export default ArtCard
