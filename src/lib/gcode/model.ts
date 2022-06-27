/*
 * Tokens
 *  -
 */

// TODO: All readonly

export interface Line {
  number: number
  text: string
}

export interface ModalState {}

export interface Position {}

export interface State {
  line: Line
  modal: ModalState
  position: Position
}
