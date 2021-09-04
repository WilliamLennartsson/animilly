
export interface User {
  id: string
  token: string
  displayName: string
  accountName: string
  email?: string
}

export interface Player {
  id: string
  userId: string
  displayName: string
  position: [number, number, number]
  rotation: [number, number, number]
  model: {
    type: "BASIC_MESH",
    color: string,
  },
};
