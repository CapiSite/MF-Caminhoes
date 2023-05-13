export default function findId(value: string, list: { id: number, name: string }[], setValue: any, presentValues: any) {
  let found = -1
  list.forEach((e, index) => {
    if (e.name == value) {
      found = index
    }
  })
  setValue({ ...presentValues, uf: list[found].id -1 })
}