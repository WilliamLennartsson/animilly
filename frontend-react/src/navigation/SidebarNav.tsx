import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom';
import { createPath, ROUTE } from './routes';

interface JoinFormProps {
  onSubmit: (input: string) => void
}

const JoinForm: FC<JoinFormProps> = (props) => {
  const [textInput, setTextInput] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.onSubmit) props.onSubmit(textInput)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        className="font-sans text-green-700"
        type="text"
        value={textInput}
        name="GalleryName"
        onChange={(e) => {
          console.log(e.target.value);
          setTextInput(e.target.value)
        }}
      />
      <button type="submit">Join</button>
    </form>)
}

interface SidebarNavProps {
  onJoinGalleryPressed?: (galleryName: string) => void
}

const SidebarNav: FC<SidebarNavProps> = (props) => {

  return (
    <nav>
      <li className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
        <Link to="/">Home</Link>
      </li>
      <li className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
        <Link to={createPath({path: ROUTE.ART_VIEWER})}>Art viewer</Link>
      </li>
      <li className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
        <Link to={createPath({path: ROUTE.DESIGN})}>Design</Link>
      </li>
      <li className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
        <Link to={createPath({path: ROUTE.DASHBOARD})}>Dashboard</Link>
      </li>
      <li className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white -inset-full">
        <Link to={createPath({path: ROUTE.DASHBOARD})}>Dashboard</Link>
      </li>
      <li className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white -inset-full">
        <JoinForm onSubmit={(input) => props.onJoinGalleryPressed && props.onJoinGalleryPressed(input)} />
      </li>
    </nav>
  )
}

export default SidebarNav
