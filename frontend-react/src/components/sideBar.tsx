import { FC } from "react"

const SideBar: FC = () => {
  return (
    <div className="sideMenuContainer bg-gray-600 flex max-">
        <ul className="sideMenuList p-3">
          <li className="sideMenuItem border-b-2 border-gray-700 pb-3">Generate</li>
          <li className="sideMenuItem border-b-2 border-gray-700 pb-3">New</li>
          <li className="sideMenuItem border-b-2 border-gray-700 pb-3">Dogs n bones</li>
        </ul>
    </div>
  )
}
export default SideBar