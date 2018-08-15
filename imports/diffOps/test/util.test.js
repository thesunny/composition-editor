import { getDiffOffsets } from "../util"

describe("getDiffStart", () => {
  it("should return null if they are the same", () => {
    const offset = getDiffOffsets("hello", "hello")
    expect(offset).toEqual(null)
  })

  it("should find offsets for changing 1 char", () => {
    const offset = getDiffOffsets("hello", "helpo")
    expect(offset).toMatchObject({ start: 3, end: 1 })
  })

  it("should find offsets for inserting chars in th emiddle", () => {
    const offset = getDiffOffsets("the cat", "the bigcat")
    expect(offset).toMatchObject({ start: 4, end: 3 })
  })

  it("should find offset for removing chars in the middle", () => {
    const offset = getDiffOffsets("the bigcat", "the cat")
    expect(offset).toMatchObject({ start: 4, end: 3 })
  })

  it("should find offset for inserting a word without double-counting the spaces", () => {
    const offset = getDiffOffsets("hello world", "hello big world")
    expect(offset).toMatchObject({ start: 6, end: 5 })
  })

  it("should find offset for removing a word without double-counting the spaces", () => {
    const offset = getDiffOffsets("hello big world", "hello world")
    expect(offset).toMatchObject({ start: 6, end: 5 })
  })
})