import applyOps, { applyOp } from "../applyOps"

describe("apply operations", () => {
  it("should apply insert op", () => {
    const text = applyOp("ab", { type: "insert_text", offset: 1, text: "x" })
    expect(text).toEqual("axb")
  })

  it("should apply remove op", () => {
    const text = applyOp("abc", { type: "remove_text", offset: 1, text: "b" })
    expect(text).toEqual("ac")
  })

  it("should apply multiple ops", () => {
    const text = applyOps("hello big world", [
      {
        type: "remove_text",
        offset: 6,
        text: "big",
      },
      {
        type: "insert_text",
        offset: 6,
        text: "great",
      },
    ])
    expect(text).toEqual("hello great world")
  })
})
