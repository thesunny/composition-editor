import diff from "../diff"

describe("build operations from last and next text", () => {
  it("should return no operations for matching text", () => {
    const ops = diff("hello", "hello")
    expect(ops).toMatchObject([])
  })

  it("should return a remove op", () => {
    const ops = diff("hello happy world", "hello world")
    expect(ops).toMatchObject([
      {
        type: "remove_text",
        offset: 6,
        text: "happy ",
      },
    ])
  })

  it("should return an insert op", () => {
    const ops = diff("hello world", "hello happy world")
    expect(ops).toMatchObject([
      {
        type: "insert_text",
        offset: 6,
        text: "happy ",
      },
    ])
  })

  it("should remove and insert", () => {
    const ops = diff("There was a cat", "There be a cat")
    expect(ops).toMatchObject([
      { type: "remove_text", offset: 6, text: "was" },
      { type: "insert_text", offset: 6, text: "be" },
    ])
  })
})
